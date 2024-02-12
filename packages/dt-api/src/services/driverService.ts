import { DataAccessInterface } from '../data/dataAccessInterface';
import { Driver } from '../data/models/Driver';

export interface DriverService {
  getDrivers: () => Promise<Driver[]>;
  getDriver: (id: string) => Promise<Driver>;
  overtake: (driverId: number) => Promise<void>;
}

export type DriverServiceDependencies = {
  dataAccess: DataAccessInterface;
};

export const createDriverService = (
  dependencies: DriverServiceDependencies
): DriverService => {
  return {
    getDrivers: () => {
      return dependencies.dataAccess.getDrivers();
    },
    getDriver: (id: string) => {
      return dependencies.dataAccess.getDriver(parseInt(id));
    },
    overtake: async (driverId: number) => {
      const overtakingDriver = await dependencies.dataAccess.getDriver(
        driverId
      );

      console.debug('overtakingDriver', overtakingDriver);

      const overtakenDriver = (await dependencies.dataAccess.getDrivers()).find(
        (d) => d.place === overtakingDriver.place - 1
      );

      console.debug('overtakenDriver', overtakenDriver);

      if (!overtakenDriver) {
        throw new Error('No driver to overtake');
      }

      await dependencies.dataAccess.updateDriver({
        ...overtakingDriver,
        place: overtakingDriver.place - 1,
      });
      await dependencies.dataAccess.updateDriver({
        ...overtakenDriver,
        place: overtakenDriver.place + 1,
      });
    },
  };
};
