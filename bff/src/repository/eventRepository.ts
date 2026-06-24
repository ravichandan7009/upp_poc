import { Event } from '../types/Event';

class EventRepository {
  private events: Event[] = [];

  seed(event: Event) {
    this.events.push(event);
  }

  findByPid(pid: string) {
    return this.events.find(
      event => event.pid === pid
    );
  }

  findById(id: string) {
    return this.events.find(
      event => event.id === id
    );
  }

  create(event: Event) {
    this.events.push(event);
    return event;
  }

  update(updatedEvent: Event) {
    const index = this.events.findIndex(
      event => event.id === updatedEvent.id
    );

    if (index >= 0) {
      this.events[index] = updatedEvent;
    }

    return updatedEvent;
  }
}

export default new EventRepository();