import { Driver } from '../data/models/Driver';
import { Endpoint } from '../networking/endpoint';
import { DriverService } from '../services/driverService';

export type GetDriversInput = {};

export type GetDriversOutput = {
  statusCode: 200;
  body: {
    drivers: Driver[];
  };
};

export type GetDriversEndpointImplDependencies = {
  driverService: DriverService;
};

export class GetDrivers implements Endpoint<GetDriversInput, GetDriversOutput> {
  method = 'GET' as const;
  path = '/api/drivers';

  constructor(private dependencies: GetDriversEndpointImplDependencies) {}

  async handler(): Promise<GetDriversOutput> {
    const drivers = await this.dependencies.driverService.getDrivers();
    return {
      statusCode: 200,
      body: {
        drivers,
      },
    };
  }
}
