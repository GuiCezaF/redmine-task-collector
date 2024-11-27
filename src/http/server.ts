import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import { env } from '../config/env';
import Logger from '../utils/logger';
import router from '../routes/routes';
import { configureDependencies } from '../config/dependencyConfig';

const logger = new Logger();
const app = express();

async function startServer() {
  try {
    const dependenciesConfig = await configureDependencies();

    app.use(express.json());
    app.use('/api', router(dependenciesConfig));

    app.listen(env.APP_PORT, () => {
      logger.info('Server is running on port 3333');
    });
  } catch (error) {
    logger.error('Error during server startup:', error);
    process.exit(1);
  }
}

startServer();
