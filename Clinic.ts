import { WaitListQueue } from "./WaitListQueue";

export class Clinic {
  name: string;
  blockNum: number;
  staff: number;
  waitingList: WaitListQueue;

  constructor() {
    this.name = "";
    this.blockNum = -1;
    this.staff = 0;
    this.waitingList = new WaitListQueue();
  }

  copyFrom(clinic: any): Clinic {
    return Object.assign(this, clinic);
   }

  getCurrentWaitTime() {
    let waitMinutesPerPerson = 15;
    return Math.abs((this.waitingList.size() * waitMinutesPerPerson) / this.staff); 
  }
  
  toString(): string {
    return "Clinic(name=" + this.name + ", block#=" + this.blockNum + 
      ", staff=" + this.staff + ")";
  }
}