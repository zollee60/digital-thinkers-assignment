import { Driver, DriverSource } from './models/Driver';

export interface DataAccessInterface {
  getDrivers(): Promise<Driver[]>;
  getDriver(id: number): Promise<Driver>;
  updateDriver(newDriver: Partial<Driver>): Promise<void>;
}
