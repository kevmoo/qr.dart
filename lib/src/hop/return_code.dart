part of hop;

class ReturnCode {
  static const ReturnCode success = const ReturnCode(0, 'success');
  static const ReturnCode taskFail = const ReturnCode(1, 'task fail');
  static const ReturnCode taskError = const ReturnCode(2, 'task error');
  static const ReturnCode badParam = const ReturnCode(3, 'bad param');
  static const ReturnCode noParam = const ReturnCode(4, 'no param');

  final int value;
  final String name;

  const ReturnCode(this.value, this.name);
}
