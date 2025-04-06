export interface TypedEvent<T extends Element> extends Event {
  target: T;
}
