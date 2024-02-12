import { readFileSync } from 'fs';
import { DataAccessInterface } from './dataAccessInterface';
import { Driver, DriverSource } from './models/Driver';

export const createInMemoryDataAccess = (
  filePath: string
): InMemoryDataAccess => {
  const jsonString = readFileSync(filePath, 'utf-8');

  const inputDrivers: DriverSource[] = JSON.parse(jsonString);

  return InMemoryDataAccess.getInstance(inputDrivers);
};

export class InMemoryDataAccess implements DataAccessInterface {
  private static instance: InMemoryDataAccess;
  private drivers: Driver[];

  private constructor(driverSourceArray: DriverSource[]) {
    for (let i = driverSourceArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [driverSourceArray[i], driverSourceArray[j]] = [
        driverSourceArray[j],
        driverSourceArray[i],
      ];
    }

    this.drivers = driverSourceArray.map((driver, idx) => {
      return {
        ...driver,
        place: idx + 1,
        imgUrl: `/static/${driver.code.toLowerCase()}.png`,
      };
    });
  }

  static getInstance(driverSourceArray: DriverSource[]): InMemoryDataAccess {
    if (!InMemoryDataAccess.instance) {
      InMemoryDataAccess.instance = new InMemoryDataAccess(driverSourceArray);
    }
    return InMemoryDataAccess.instance;
  }

  getDrivers(): Promise<Driver[]> {
    return Promise.resolve(this.drivers);
  }
  getDriver(id: number): Promise<Driver | undefined> {
    return Promise.resolve(this.drivers.find((driver) => driver.id === id));
  }
  updateDriver(newDriver: Partial<Driver>): Promise<void> {
    this.drivers = this.drivers.map((driver) => {
      if (driver.id === newDriver.id) {
        return {
          ...driver,
          ...newDriver,
        };
      }
      return driver;
    });
    return Promise.resolve();
  }
}
