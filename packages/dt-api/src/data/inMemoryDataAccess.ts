import { DataAccessInterface } from './dataAccessInterface';
import { Driver, DriverSource } from './models/Driver';

export const createInMemoryDataAccess = (
  filePath: string
): InMemoryDataAccess => {
  const inputDrivers: DriverSource[] = JSON.parse(filePath);

  return new InMemoryDataAccess(inputDrivers);
};

export class InMemoryDataAccess implements DataAccessInterface {
  private drivers: Driver[];

  constructor(driverSourceArray: DriverSource[]) {
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
  getDrivers(): Promise<Driver[]> {
    return Promise.resolve(this.drivers);
  }
  getDriver(id: string): Promise<Driver | undefined> {
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
