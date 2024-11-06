import { env } from '../config/env';
import { Issue, RedmineIssuesResponse } from '../types/redmineTypes';
import Logger from '../utils/logger';
import { AppDataSource } from '../database/data-source';
import { Task } from '../entities/Task';

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


  private async saveTasks(task: Issue): Promise<number | 'EXISTING' | null> {
    try {
      const taskRepository = AppDataSource.getRepository(Task);
    
      const existingTask = await taskRepository.findOne({
        where: { title: task.subject },
      });
  
      if (existingTask) {
        return 'EXISTING';
      }
  
      const newTask = taskRepository.create({
        title: task.subject,
        project: task.project.name,
        status: task.status.name,
        priority: task.priority.name,
        description: task.description,
        dueDate: task.due_date,
      });
  
      await taskRepository.save(newTask);
      return newTask.id;
    } catch (error) {
      this.logger.error('Erro ao salvar a tarefa:', error);
      throw new Error('Erro ao salvar a tarefa');
    }
  }
  

  public async syncTasks(): Promise<void> {
    try {
      const tasks = await this.handleFetchTasks();
  
      if (!tasks || tasks.length === 0) {
        this.logger.error('No tasks found to synchronize', new Error('Tasks list is empty'));
        return;
      }
  
      const savePromises = tasks.map(async (task) => {
        try {
          const result = await this.saveTasks(task);
  
          if (result === 'EXISTING') {
            this.logger.info(`Task "${task.subject}" already exists and was skipped`);
          } else if (result) {
            this.logger.info(`Task "${task.subject}" saved with ID ${result}`);
          } else {
            this.logger.warn(`Failed to save task "${task.subject}" - ID not returned`);
          }
        } catch (error) {
          this.logger.error(`Error saving task "${task.subject}"`, error);
        }
      });
  
      await Promise.all(savePromises);
  
      this.logger.info('Synchronization completed successfully');
    } catch (error) {
      this.logger.error('Error during task synchronization', error);
    }
  }

}

export default RedmineService;
