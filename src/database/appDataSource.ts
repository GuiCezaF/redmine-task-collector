import { AppDataSource } from '../database/data-source';
import Logger from '../utils/logger';

const logger = new Logger();

async function initializeApp() {
  try {
    await AppDataSource.initialize();
    logger.info('DataSource has been initialized!');
  } catch (err) {
    logger.error('Error during DataSource initialization:', err);
    process.exit(1);
  }
}

initializeApp();
