import { City } from "./City";
import { HealthMap } from "./HealthMap";
import { IReport } from "./IReport";
import { SimpleReport } from "./SimpleReport";

export class ComplexReport extends SimpleReport implements IReport {
  
  constructor(map: HealthMap) {
    super(map);
  } 
 
  public printDetails(): void {
    this.cityMap.forEach((city, cityName) => {
      console.log(`City(name=${cityName})`);
      city.clinics.forEach(c => {
        console.log(c.toString());
        console.log(`Average Wait Time = ${c.getCurrentWaitTime()} minutes`);

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