// MIXIN to implement Observer Pattern
export const ObserverMixin = {
  observers: new Set(), // set of function
  AddObserver(obs) {
    this.observers.add(obs);
  },
  removeObserver(obs) {
    this.observers.delete(obs);
  },
  notify() {
    this.observers.forEach((obs) => obs());
  },
};
