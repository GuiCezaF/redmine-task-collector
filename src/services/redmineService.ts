import { env } from '../config/env';
import { Issue, RedmineIssuesResponse } from '../types/redmineTypes';
import Logger from '../utils/logger';

class RedmineService {
  private logger = new Logger();
  private REDMINE_API_KEY = env.REDMINE_API_KEY;
  private REDMINE_MY_ID = env.REDMINE_USER_ID;
  private REDMINE_URL = env.REDMINE_URL;

  public async handleFetchTasks(): Promise<Issue[] | null> {
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

      const data: RedmineIssuesResponse =
        (await response.json()) as RedmineIssuesResponse;
      this.logger.info('Tasks fetched successfully');

      return data.issues;
    } catch (error) {
      this.logger.error('Error while fetching tasks', error);
      return null;
    }
  }
}

export default RedmineService;
