import { City } from "./City";
import { Clinic } from "./Clinic";
import { Household } from "./Household";
import { MapInfo } from "./MapInfo";
import { MapSymbolEnum } from "./MapSymbolEnum";

export class HealthMap {
	private _mapData: MapInfo;
  private _blockUpperBound = 0;
  private _mapBlocks: Map<string, string[]>;
  private currentIntake = 20;

  public constructor(data: any) {
    this._mapData = new MapInfo(data);
    this._blockUpperBound = this.getMaxBlockNumForAllCities();
    this._mapBlocks = new Map<string, string[]>();
    this.initializeMapBlocks();
  }
  
  private initializeMapBlocks(): void {
    this._mapData.cityMap.forEach((value, key) => {
      this.buildBlocks(key, value);
    });
  }

  private buildBlocks(cityName: string, city: City) {
    let blocks = this.initializeBlocks();
    blocks = this.fillHouseHoldBlocks(blocks, city.households);
    blocks = this.fillClinicBlocks(blocks, city.clinics);
    this._mapBlocks.set(cityName, blocks);
  }

  public getCityMap(): Map<string, City> {
    return this._mapData.cityMap;
  }

  public printMap(): void {
    this._mapData.cityMap.forEach((value, key) => {
        this.printMapRow(key);
    });
  }

  public registerForShots(): void {
    this._mapData.cityMap.forEach((value, key) => {
      this.registerForShotsForCity(key, value);
    });
  }

  private registerForShotsForCity(cityName: string, city: City): void {
    city.households.forEach(h => {
      h.inhabitants.forEach(p => {
        if (!p.isVaccinated && p.age >= this.currentIntake ) {
          let closestClinicBlockNum = this.getClosestClinic(h.blockNum, city.clinics);
          let clinic = city.clinics.find(c => c.blockNum == closestClinicBlockNum);
          if (clinic) {
            p.isVaccinated = true;
            clinic.waitingList.enqueue(p);
          }
        }
      });
      if (h.inhabitants.findIndex(p => !p.isVaccinated) < 0) {
        let blocks = this._mapBlocks.get(cityName);
        if (blocks) {
          blocks[h.blockNum] = MapSymbolEnum.Vaccinated;
        }        
      }
    })
  }

  private getClosestClinic(blockNum: number, clinics: Clinic[]): number {
    let closestClinic = clinics[0].blockNum;
    for (let i = 1; i < clinics.length; i++) {
      if (Math.abs(blockNum - closestClinic) > (Math.abs(blockNum - clinics[i].blockNum))) {
        closestClinic = clinics[i].blockNum;
      }
    }
    return closestClinic;
  }

  private initializeBlocks(): string[] {
    let blocks = new Array(this._blockUpperBound);
    for (let i = 0; i < this._blockUpperBound; i++) {
      blocks[i] = "x";
    }

    return blocks;
  }

  private printMapRow(cityName: string): void {
    console.log(this._mapBlocks.get(cityName)?.join(" "));
  }

  private fillHouseHoldBlocks(blocks: string[], households: Household[]): string[] {
    households.forEach(h => {
      if (h.inhabitants.findIndex(p => !p.isVaccinated) >= 0) {
        blocks[h.blockNum] = MapSymbolEnum.Unvaccinated;
      }
      else {
        blocks[h.blockNum] = MapSymbolEnum.Vaccinated;
      }
    });
    return blocks;
  }

  private fillClinicBlocks(blocks: string[], clinics: Clinic[]): string[] {
    clinics.forEach(c => {
      blocks[c.blockNum] = MapSymbolEnum.Clinic;
    });
    return blocks;
  }

  private getMaxBlockNumForAllCities(): number {
    if (!this._mapData.cityMap || this._mapData.cityMap.size === 0) {
      throw new Error("Map data is empty");
    }
    
    let max = 0;
    this._mapData.cityMap.forEach((value, key)=> {
      const cityMaxBlockNum = this.getTotalNumOfBlock(key);
      if (max < cityMaxBlockNum) {
        max = cityMaxBlockNum;
      }
    });

    return max;
  }

  private getTotalNumOfBlock(cityName: string): number {
    let city = this._mapData.cityMap.get(cityName);
    if (city) {
      return city.households.length + city.clinics.length
    }
    else {
      throw new Error(`City ${cityName} does not exist`);
    }
  }
}