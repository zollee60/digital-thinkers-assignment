import express from 'express';
import * as path from 'path';
import { createInMemoryDataAccess } from './data/inMemoryDataAccess';
import { createDriverService } from './services/driverService';
import { GetDrivers } from './routes/getDrivers';
import { PostOvertake } from './routes/postOvertake';
import logger from 'pino-http';

const jsonPath = path.join(__dirname, '/assets/drivers.json');

const dataAccess = createInMemoryDataAccess(jsonPath);

const driverService = createDriverService({ dataAccess });

const endpoints = [
  new GetDrivers({ driverService }),
  new PostOvertake({ driverService }),
];

const app = express();

app.use(logger());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

endpoints.forEach((endpoint) => {
  app[endpoint.method.toLowerCase()](endpoint.path, async (req, res) => {
    const input = {
      params: req.params,
      query: req.query,
      body: req.body,
    };
    const output = await endpoint.handler(input);
    req.log.info({
      method: req.method,
      path: req.path,
      input: input,
      output: output,
    });
    res.status(output.statusCode).json(output.body);
  });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
