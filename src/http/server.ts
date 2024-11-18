import 'reflect-metadata';
import express from 'express';
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

    app.listen(3333, () => {
      logger.info('Server is running on port 3333');
    });
  } catch (error) {
    console.error('Error during server startup:', error);
    process.exit(1); 
  }
}

startServer();
