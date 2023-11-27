import { Person } from "./Person";

export class Household {
  blockNum: number;
  inhabitants: Person[];

  constructor() {
    this.blockNum = -1;
    this.inhabitants = [];
  }
}