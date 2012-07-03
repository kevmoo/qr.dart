class TestTarjanCycleDetect {
  static void run() {
    group('Tarjan', (){
      test('single item', _testSingle);
      test('5 isolated items', _test5Isolated);
      test('5 in a line', _test5Line);
      test('5 in a loop', _test5Loop);
      test('5 random', _test5Random);
      test('implied key', _testImpliedKey);
    });
  }

  static void _testImpliedKey() {
    // single node, no loop
    var graph = new HashMap<int, HashSet<int>>();
    graph[1] = new HashSet<int>.from([2]);

    var result = TarjanCycleDetect.getStronglyConnectedComponents(graph);
    expect(result.length, equals(2));
    expect(result[0], unorderedEquals([2]));
    expect(result[1], unorderedEquals([1]));
  }

  static void _testSingle() {
    // single node, no loop
    var graph = new HashMap<int, HashSet<int>>();
    graph[1] = null;

    var result = TarjanCycleDetect.getStronglyConnectedComponents(graph);
    expect(result.length, equals(1));
    expect(result[0], unorderedEquals([1]));
  }

  static void _test5Isolated() {
    var graph = new HashMap<int, HashSet<int>>();
    graph[1] = null;
    graph[2] = null;
    graph[3] = null;
    graph[4] = null;
    graph[5] = null;

    var result = TarjanCycleDetect.getStronglyConnectedComponents(graph);
    expect(result.length, equals(5));
    expect(result[0], unorderedEquals([1]));
    expect(result[1], unorderedEquals([2]));
    expect(result[2], unorderedEquals([3]));
    expect(result[3], unorderedEquals([4]));
    expect(result[4], unorderedEquals([5]));
  }

  static void _test5Line() {
    var graph = new HashMap<int, HashSet<int>>();
    graph[1] = null;
    graph[2] = new HashSet<int>.from([1]);
    graph[3] = new HashSet<int>.from([2]);
    graph[4] = new HashSet<int>.from([3]);
    graph[5] = new HashSet<int>.from([4]);

    var result = TarjanCycleDetect.getStronglyConnectedComponents(graph);
    expect(result.length, equals(5));
    expect(result[0], unorderedEquals([1]));
    expect(result[1], unorderedEquals([2]));
    expect(result[2], unorderedEquals([3]));
    expect(result[3], unorderedEquals([4]));
    expect(result[4], unorderedEquals([5]));
  }

  static void _test5Loop() {
    var graph = new HashMap<int, HashSet<int>>();
    graph[1] = new HashSet<int>.from([5]);
    graph[2] = new HashSet<int>.from([1]);
    graph[3] = new HashSet<int>.from([2]);
    graph[4] = new HashSet<int>.from([3]);
    graph[5] = new HashSet<int>.from([4]);

    var result = TarjanCycleDetect.getStronglyConnectedComponents(graph);
    expect(result.length, equals(1));
    expect(result[0], unorderedEquals([1,2,3,4,5]));
  }

  static void _test5Random() {
    var graph = new HashMap<int, HashSet<int>>();
    graph[1] = new HashSet<int>.from([2]);
    graph[2] = new HashSet<int>.from([3]);
    graph[3] = new HashSet<int>.from([2]);
    graph[4] = new HashSet<int>.from([1]);
    graph[5] = new HashSet<int>.from([4]);

    var result = TarjanCycleDetect.getStronglyConnectedComponents(graph);
    expect(result.length, equals(4));
    expect(result[0], unorderedEquals([2,3]));
    expect(result[1], unorderedEquals([1]));
    expect(result[2], unorderedEquals([4]));
    expect(result[3], unorderedEquals([5]));
  }
}
