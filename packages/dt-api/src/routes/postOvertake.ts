import { Driver } from '../data/models/Driver';
import {
  Endpoint,
  EndpointError,
  HttpStatusCode,
} from '../networking/endpoint';
import { DriverService } from '../services/driverService';

export type PostOvertakeInput = {
  params: {
    driverId: string;
  };
};

export type PostOvertakeOutput = {
  statusCode: HttpStatusCode;
  body: {
    driver: Driver;
  };
};

export type PostOvertakeEndpointImplDependencies = {
  driverService: DriverService;
};

export class PostOvertake
  implements Endpoint<PostOvertakeInput, PostOvertakeOutput>
{
  method = 'POST' as const;
  path = '/api/drivers/:driverId/overtake';

  constructor(private dependencies: PostOvertakeEndpointImplDependencies) {}

  async handler(
    input: PostOvertakeInput
  ): Promise<PostOvertakeOutput | EndpointError> {
    try {
      const driverId = parseInt(input.params.driverId);

      await this.dependencies.driverService.overtake(driverId);
      const driver = await this.dependencies.driverService.getDriver(
        input.params.driverId.toString()
      );
      if (!driver) {
        throw new Error('Driver not found');
      }
      return {
        statusCode: 200,
        body: {
          driver,
        },
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: {
          message: error.message,
        },
      };
    }
  }
}
