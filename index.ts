import * as data from "./mapdata.json";
import { HealthMap } from './HealthMap';
import { ComplexReport } from "./ComplexReport";
import { ReportMaker } from "./ReportMaker";

async function main() {
  const map = new HealthMap(data);
  map.printMap();
  console.log("---End of Map---")
  map.registerForShots();
  const report = new ReportMaker(new ComplexReport(map));
  report.printDetails();
  console.log("---End of Report---")
  map.printMap();
  console.log("---End of Map---")
}

main();