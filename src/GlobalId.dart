class GlobalId implements Hashable{
  static int _globalId = 0;
  final int _id;
  
  GlobalId(): _id = _globalId++;
  
  int hashCode(){
    return _id;    
  }
  
}
