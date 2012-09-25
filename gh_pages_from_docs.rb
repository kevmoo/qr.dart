#!/usr/bin/env ruby

#
# A *very* rough ruby shell script to turn a checked-in `docs` directory
# into it's own branch named `gh-pages`. Perfect for github.
#
# Note: This only works content that's already checked-in to git.
#       You must create and commit `docs` before running.
#
# Note: When you run dartdoc, you might want to use
#
#   --omit-generation-time
#
# to minimize non-subsubstative churn to the output files.
#

TMP_MESSAGE_PATH = '/tmp/message'

def git(command, swallow_errors = false)
  if(swallow_errors)
    # 2>&1 is magic and confused me forever
    # Read this: http://www.xaprb.com/blog/2006/06/06/what-does-devnull-21-mean/
    # 2 is STDERR, 1 is STDOUT
    # pipes STDERR to STDOUT. That's it.
    # Keeps ruby from displaying error text when a shell command errors
    command = command + ' 2>&1'
  end
  return `git #{command}`
end

def branch_from_dir(dir_path, branch_name, master = 'master')
  # get the tree for dir_path
  output = git("ls-tree -d #{master} #{dir_path}")
  if output.length == 0
    puts "Could not find tree for dir_path: #{dir_path}"
    return
  end
  dir_sha = output.split(' ')[2]

  command = "commit-tree #{dir_sha}"

  #
  # See if there is an existing branch
  #
  branch_name_ref = "refs/heads/#{branch_name}"
  parent = git("rev-parse --verify #{branch_name_ref}", true).strip

  if $?.to_i == 0
    #
    # There is an existing branch
    #
    commit_items = git("cat-file -p #{parent}").split(' ')
    raise 'should be tree' if commit_items[0] != 'tree'
    parent_tree = commit_items[1]

    #
    # If its tree matches, nothing has changed
    #  - noop
    #
    if parent_tree == dir_sha
      puts "There have been no changes to '#{dir_path}' since the last commit"
      return
    end
    command << " -p #{parent}"
    verb = 'updated'
  else
    verb = 'created'
  end

  master_commit = git("rev-parse #{master}")[0..7]
  File.open(TMP_MESSAGE_PATH, 'w') do |f|
    f.puts "Contents of #{dir_path} from commit #{master_commit}"
  end

  command << " < #{TMP_MESSAGE_PATH}"

  output = git(command)
  puts "Created new commit: #{output}"
  git("update-ref #{branch_name_ref} #{output}")
  puts "Branch '#{branch_name}' #{verb}"
end

branch_from_dir('doc','gh-pages')
