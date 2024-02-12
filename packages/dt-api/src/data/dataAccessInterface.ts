import { DriverSource } from './models/Driver';

export interface DataAccessInterface {
  getDrivers(): Promise<DriverSource[]>;
  getDriver(id: string): Promise<DriverSource>;
  updateDriver(driver: DriverSource): Promise<void>;
}
