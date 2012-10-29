part of bot;

// A convenience and convention for events w/ no data to send via args

class EventArgs {
  static final EventArgs empty = const EventArgs._empty();

  const EventArgs._empty();

  EventArgs();
}
