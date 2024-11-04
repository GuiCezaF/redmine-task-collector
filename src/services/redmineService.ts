import { env } from '../config/env';
import Logger from '../utils/logger';

// TODO(Guilherme): Tipar o retorno do handleFetchTasks, fazer uma interface com o retorno esperado

class RedmineService {
  private logger = new Logger();
  private REDMINE_API_KEY = env.REDMINE_API_KEY;
  private REDMINE_MY_ID = env.REDMINE_USER_ID;
  private REDMINE_URL = env.REDMINE_URL;

  public async handleFetchTasks(): Promise<any> {
    const url = `${this.REDMINE_URL}/issues.json?assigned_to_id=${this.REDMINE_MY_ID}`;

    try {
      const response = await fetch(url, {
        headers: {
          'X-Redmine-API-Key': this.REDMINE_API_KEY,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        this.logger.error(
          `Failed to fetch tasks. HTTP status:`,
          response.status,
        );
        return null;
      }

      //TODO(Guilherme): Tipar o data para um array das tasks
      const data = await response.json();
      this.logger.info('Tasks fetched successfully');
      return data.issues;
    } catch (error) {
      this.logger.error('Error while fetching tasks', error);
      return null;
    }
  }
}

export default RedmineService;
