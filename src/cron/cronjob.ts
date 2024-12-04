import cron from 'node-cron';
import Logger from '../utils/logger';
import RedmineService from '../services/redmineService';

const logger = new Logger();
const redmineService = new RedmineService();

// executa o job todo dia as 08:15, 12:15 e 15:15
export const jobSyncTask = cron.schedule('15 8,12,15 * * *', () => {
  logger.info('Initiating automatic task synchronization...');
  redmineService.syncTasks();
});
