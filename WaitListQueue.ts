import { Person } from "./Person";

export class WaitListQueue {
  private persons: Person[];
  private readonly waitMinutesPerPerson = 15;

  constructor() {
      this.persons = [];
  }
  enqueue(person: Person) {
    this.persons.push(person);
  }

  dequeue(): Person | undefined {
    if(this.size() == 0) {
        return undefined;
    }
    else {
      return this.persons.shift();
    }
  }

  size(): number {
    return this.persons.length;
  }
}