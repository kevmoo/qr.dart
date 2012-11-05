part of test_hop;

class TaskListTests {
  static run() {
    test('dupe names are bad', () {
      final tasks = new Tasks();
      tasks.addTask('task', (ctx) => true);

      expect(() => tasks.addTask('task', (ctx) => true), throwsArgumentError);
    });

    test('reject bad task names', () {
      final tasks = new Tasks();
      expect(() => tasks.addTask('', (ctx) => true), throwsArgumentError);
      expect(() => tasks.addTask(null, (ctx) => true), throwsArgumentError);
    });

    test('reject tasks after freeze', () {
      final tasks = new Tasks();

      expect(tasks.isFrozen, isFalse);
      tasks.freeze();
      expect(tasks.isFrozen, isTrue);

      // cannot re-freeze
      expect(() => tasks.freeze(), throws);

      // cannot add task when frozen
      expect(() => tasks.addTask('task', (ctx) => true), throws);
    });
  }
}
