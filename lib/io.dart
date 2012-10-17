#library('bot_io');

#import('dart:io');
#import('bot.dart');

void prnt(obj, [Color color = null]) {
  String value;
  if(obj == null) {
    value = '';
  } else {
    value = obj.toString();
  }
  if(color != null) {
    value = color.wrap(value);
  }
  stdout.writeString(value);
}

void prntLine(obj, [Color color = null]) {
  prnt("$obj\n", color);
}

class Color {
  const String _NO_COLOR = '\u001b[0m';
  static const BLACK = const Color._internal(0, 'black');
  static const BLUE = const Color._internal(4, 'blue');
  static const RED = const Color._internal(1, 'red');
  static const GREEN = const Color._internal(2, 'green');

  final int id;
  final String name;

  const Color._internal(this.id, this.name);

  String toString() => "$name ($id)";

  String wrap(String input) {
    assert(input != null);
    return "${shellValue}$input${_NO_COLOR}";
  }

  String get shellValue => '\u001b[3${id}m';
}
