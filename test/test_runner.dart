part of test_hop;

class TestRunner extends Runner {

  TestRunner(Tasks state, List<String> arguments) :
    super(state, arguments);


  @protected
  TaskContext getContext(String taskName) {
    return new TestTaskContext(taskName);
  }
}

class TestTaskContext extends TaskContext {
  TestTaskContext(String name):super(name);

  @protected
  void printCore(String msg, Color color) {
    // at the moment, just swallowing all print output
  }
}
