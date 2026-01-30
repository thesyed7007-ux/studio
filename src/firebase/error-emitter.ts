type EventMap = {
    'permission-error': (error: Error) => void;
  };
  
  class EventEmitter<T extends EventMap> {
    private listeners: { [K in keyof T]?: T[K][] } = {};
  
    on<K extends keyof T>(event: K, listener: T[K]): void {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
      this.listeners[event]!.push(listener);
    }
  
    emit<K extends keyof T>(event: K, ...args: Parameters<T[K]>): void {
      const eventListeners = this.listeners[event];
      if (eventListeners) {
        eventListeners.forEach(listener => listener(...(args as any[])));
      }
    }
  }
  
  export const errorEmitter = new EventEmitter<EventMap>();
  