class EventTarget {
  constructor() {
    this.listeners = new Map();
  }

  addEventListener(event, callback) {
    // If event doesn't exist, create an empty array
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    const callbacks = this.listeners.get(event);

    // Don't add the same callback twice
    if (!callbacks.includes(callback)) {
      callbacks.push(callback);
    }
  }

  removeEventListener(event, callback) {
    // If event doesn't exist, do nothing
    if (!this.listeners.has(event)) {
      return;
    }

    const callbacks = this.listeners.get(event);

    // Find the callback
    const index = callbacks.indexOf(callback);

    // Remove it if found
    if (index !== -1) {
      callbacks.splice(index, 1);
    }

    // If no callbacks remain, remove the event
    if (callbacks.length === 0) {
      this.listeners.delete(event);
    }
  }

  dispatchEvent(event) {
    // If there are no listeners, do nothing
    if (!this.listeners.has(event)) {
      return;
    }

    const callbacks = this.listeners.get(event);

    // Call every callback
    callbacks.forEach(callback => {
      callback();
    });
  }
}