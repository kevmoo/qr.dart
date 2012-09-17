class Attachable implements Hashable {
  final String name;
  final GlobalId _id = new GlobalId();

  Attachable(this.name);

  int hashCode() => _id.hashCode();
}
