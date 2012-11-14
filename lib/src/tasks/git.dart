part of hop_tasks;

Future<bool> branchForDir(TaskContext ctx, String sourceBranch, String sourceDir,
    String targetBranch) {

  return io.Process.run('git', ['ls-tree', '-d', sourceBranch, sourceDir])
      .transform(_getTreeFromLsTree)
      .chain((String tree) =>
          _fromSourceDirTree(ctx, tree, targetBranch, sourceDir, sourceBranch));
}

String _getTreeFromLsTree(io.ProcessResult pr) {
  require(pr.stdout.length > 0, 'Output was empty. Does the provided dir exist?');
  return pr.stdout;
}

Future<bool> _fromSourceDirTree(TaskContext ctx, String tree,
    String targetBranch, String sourceDir, String sourceBranch) {
  final split = tree.split(_whiteSpaceExp);
  final sha = split[2];

  final gitArgs = new List<String>.from(['commit-tree', sha]);
  final branchNameRef = 'refs/heads/$targetBranch';

  return io.Process.run('git', ['rev-parse', '--verify', '-p', branchNameRef])
      .chain((io.ProcessResult rppr) {
        if(rppr.exitCode == 0) {
          // existing branch
          final parent = rppr.stdout.trim();
          return _withExistingBranch(ctx, parent, sha, sourceDir, gitArgs,
              sourceBranch, branchNameRef, targetBranch);
        } else {
          // new branch
          return _getMasterCommit(ctx, 'created', gitArgs, sourceBranch,
              sourceDir, branchNameRef, targetBranch);
        }
      });
}

Future<bool> _withExistingBranch(TaskContext ctx, String parent, String dirSha,
    String sourceDir, List<String> gitArgs, String sourceBranch,
    String branchNameRef, String targetBranch) {
  return io.Process.run('git', ['cat-file', '-p', parent])
      .transform(_getParentTree)
      .chain((String parentTree) =>
          _continueWithExistingBranch(ctx, parent, parentTree, dirSha, sourceDir,
              gitArgs, sourceBranch, branchNameRef, targetBranch));
}

String _getParentTree(io.ProcessResult pr) {
  require(pr.exitCode == 0, 'cat-file returned an error');
  final split = pr.stdout.split(_whiteSpaceExp);
  require(split[0] == 'tree', "Should be a tree");
  return split[1].trim();
}

Future<bool> _continueWithExistingBranch(TaskContext ctx,
    String parent, String parentTree, String dirSha, String sourceDir,
    List<String> gitArgs, String sourceBranch, String branchNameRef,
    String targetBranch) {
  if(parentTree == dirSha) {
    ctx.fine('There have been no changes to "$sourceDir" since the last commit');
    return new Future.immediate(true);
  } else {
    gitArgs.addAll(['-p', parent]);
    return _getMasterCommit(ctx, 'updated', gitArgs, sourceBranch, sourceDir,
        branchNameRef, targetBranch);
  }
}

Future<bool> _getMasterCommit(TaskContext ctx, String verb, List<String> gitArgs,
    String sourceBranch, String sourceDir, String branchNameRef, String targetBranch) {

  return io.Process.run('git', ['rev-parse', sourceBranch])
      .transform(_transformRevParse)
      .chain((masterCommit) => _doCommit(ctx, verb, gitArgs, sourceDir,
          masterCommit, branchNameRef, targetBranch));
}

String _transformRevParse(io.ProcessResult pr) {
  require(pr.exitCode == 0);
  return pr.stdout.trim();
}

Future<bool> _doCommit(TaskContext ctx, String verb, List<String> gitArgs,
    String sourceDir, String masterCommit, String branchNameRef,
    String targetBranch) {

  masterCommit = masterCommit.substring(0, 8);

  gitArgs.addAll(['-m', 'Contents of $sourceDir from commit $masterCommit']);

  return io.Process.run('git', gitArgs)
      .chain((io.ProcessResult pr) {
        require(pr.exitCode == 0, pr.stderr);

        final newCommitSha = pr.stdout.trim();
        ctx.success('Create new commit: $newCommitSha');

        return io.Process.run('git', ['update-ref', branchNameRef, newCommitSha])
            .transform((io.ProcessResult updateRefPr) {
              require(updateRefPr.exitCode == 0);
              ctx.success("Branch '$targetBranch' $verb");
              return true;
              });
      });
}

final _whiteSpaceExp = new RegExp(r'\s+', multiLine: true);
