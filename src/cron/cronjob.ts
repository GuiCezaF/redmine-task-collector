import cron from 'node-cron';
import Logger from '../utils/logger';
import RedmineService from '../services/redmineService';

const logger = new Logger();
const redmineService = new RedmineService();

// executa o job todo dia as 08:50, 12:00 e 15:00
export const jobSyncTask = cron.schedule('50 8,12,15 * * *', () => {
  logger.info('Initiating automatic task synchronization...');
  redmineService.syncTasks();
});
