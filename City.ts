import { Clinic } from "./Clinic";
import { Household } from "./Household";

export class City {
  households: Household[];
  clinics: Clinic[];

  constructor() {
    this.households = [];
    this.clinics = [];
  }
}