import { City } from "./City";
import { HealthMap } from "./HealthMap";
import { IReport } from "./IReport";

export class SimpleReport implements IReport {
  protected readonly cityMap: Map<string, City>;

  constructor(map: HealthMap) {
    this.cityMap = map.getCityMap();
  } 
 
  public printDetails(): void {
    this.cityMap.forEach((city, cityName) => {
      console.log(`City(name=${cityName})`);
      city.clinics.forEach(c => {
        console.log(c.toString());
        console.log('People waiting');
        let person = c.waitingList.dequeue();
        while (person) {
          console.log(person.toString());
          person = c.waitingList.dequeue();
        }
      });
    })
  }
}