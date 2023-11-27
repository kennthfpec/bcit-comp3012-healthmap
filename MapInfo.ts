import { City } from "./City";
import { Clinic } from "./Clinic";
import { Household } from "./Household";
import { Person } from "./Person";
import { WaitListQueue } from "./WaitListQueue";

export class MapInfo {
  cityMap: Map<string, City>;

  constructor(jsonData: any) {
    this.cityMap = new Map<string, City>();
    const cityData: any = Object.values(jsonData)[0];  
    const keys: string[] = Object.keys(cityData);
    keys.forEach(k => {
      let cityObject = new City();
      let city = cityData[k] as City;
      city.households.forEach(h => {
        let houseObject = new Household();
        houseObject.blockNum = h.blockNum;
        h.inhabitants.forEach(i => {
          let person = new Person();
          houseObject.inhabitants.push(person.copyFrom(i));
        });
        cityObject.households.push(houseObject);
      });
      city.clinics.forEach(c => {
        let clinicObject = new Clinic();
        cityObject.clinics.push(clinicObject.copyFrom(c));
      })      
      this.cityMap.set(k, cityObject);
    });
    console.log(JSON.stringify(this.cityMap));
  }
}
