export class Person {
  phn: string;
  fullName: string;
  isVaccinated: boolean;
  age: number;

  constructor() { 
    this.phn = "";
    this.fullName = '';
    this.isVaccinated = false;
    this.age = 0;
   }

   copyFrom(person: any): Person {
    return Object.assign(this, person);
   }

   toString() {
    return "Person(fullname=" + this.fullName + ", Phn=" + this.phn + 
    ", Age=" + this.age + ", isVaccinated=" + this.isVaccinated + ")";

   }
}