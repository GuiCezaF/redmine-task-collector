import 'reflect-metadata';
import RedmineService from "../services/redmineService";
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import Logger from "../utils/logger";
import { AppDataSource } from '../database/data-source';

const logger = new Logger();

async function runSyncTasks() {
  try {
    await AppDataSource.initialize();

    const _redmineService = new RedmineService();

    await _redmineService.syncTasks();

    logger.info('Tasks synchronized successfully!');
  } catch (error) {
    logger.error('Error synchronizing tasks:', error);
  } finally {
    await AppDataSource.destroy(); 
  }
}

yargs(hideBin(process.argv))
  .command(
    'sync-tasks',
    'Synchronize tasks from external source',
    async () => {
      await runSyncTasks();
    }
    
  )
  .help()
  .parse();
