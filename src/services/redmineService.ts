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

  private async handleFetchTasks(): Promise<Issue[] | null> {
    const limit = 100;
    let offset = 0;
    let allTasks: Issue[] = [];
    let page = 1;
    let haveTasks = true;

    try {
      while (haveTasks) {
        const url = `${this.REDMINE_URL}/issues.json?assigned_to_id=${this.REDMINE_MY_ID}&limit=${limit}&offset=${offset}&status_id=*`;

        const response = await fetch(url, {
          headers: {
            'X-Redmine-API-Key': this.REDMINE_API_KEY,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          this.logger.error(
            `Failed to fetch tasks. HTTP status: `,
            response.status,
          );
          return null;
        }

        const data = (await response.json()) as RedmineIssuesResponse;
        const tasks = data.issues || [];

        this.logger.info(`Página ${page} - Tarefas trazidas: ${tasks.length}`);

        allTasks = allTasks.concat(tasks);

        if (tasks.length < limit) {
          haveTasks = false;
        }

        offset += limit;
        page++;
      }

      this.logger.success('All tasks fetched successfully');
      return allTasks;
    } catch (error) {
      this.logger.error('Error while fetching tasks', error);
      return null;
    }
  }

  private async saveTasks(task: Issue): Promise<number | null> {
    try {
      const taskRepository = AppDataSource.getRepository(Task);

      const newTask = taskRepository.create({
        title: task.subject,
        project: task.project.name,
        status: task.status.name,
        priority: task.priority.name,
        description: task.description,
        dueDate: task.due_date ? new Date(task.due_date) : null,
      });

      const savedTask = await taskRepository.save(newTask);
      return savedTask.id;
    } catch (error) {
      this.logger.error(
        'Erro ao salvar a tarefa:',
        error instanceof Error ? error.message : error,
      );
      throw new Error('Erro ao salvar a tarefa');
    }
  }

  public async syncTasks(): Promise<void> {
    try {
      const tasks = await this.handleFetchTasks();

      if (!tasks || tasks.length === 0) {
        this.logger.error(
          'No tasks found to synchronize',
          new Error('Tasks list is empty'),
        );
        return;
      }

      const taskRepository = AppDataSource.getRepository(Task);

      const syncPromises = tasks.map(async (task) => {
        try {
          if (task.status.name === 'Não concluído na Sprint') return;
          if (task.tracker.name === 'Agrupador') return;
          if (task.tracker.name === 'Projeto') return;

          const existingTask = await taskRepository.findOne({
            where: { title: task.subject },
          });

          if (existingTask) {
            const hasChanges = this.hasTaskChanged(existingTask, task);

            if (hasChanges) {
              this.logger.info(`Task "${task.subject}" has changes. Updating.`);
              existingTask.project = task.project.name;
              existingTask.status = task.status.name;
              existingTask.priority = task.priority.name;
              existingTask.description = task.description;
              existingTask.dueDate = task.due_date
                ? new Date(task.due_date)
                : null;
              await taskRepository.save(existingTask);
              this.logger.success(
                `✅ Task "${task.subject}" updated with ID ${existingTask.id}`,
              );
            } else {
              this.logger.info(
                `Task "${task.subject}" has no changes. Skipping update.`,
              );
            }
          } else {
            const newTaskId = await this.saveTasks(task);
            if (newTaskId) {
              this.logger.success(
                `✅ Task "${task.subject}" saved with ID ${newTaskId}`,
              );
            } else {
              this.logger.warn(
                `Failed to save task "${task.subject}" - ID not returned`,
              );
            }
          }
        } catch (error) {
          this.logger.error(
            `Error syncing task "${task.subject}":`,
            error instanceof Error ? error.message : error,
          );
        }
      });

      await Promise.all(syncPromises);

      this.logger.success('Synchronization completed successfully');
    } catch (error) {
      this.logger.error('Error during task synchronization', error);
    }
  }

  private hasTaskChanged(existingTask: Task, task: Issue): boolean {
    return (
      existingTask.project.trim().toLowerCase() !=
        (task.project?.name?.trim()?.toLowerCase() || '') ||
      existingTask.status.trim().toLowerCase() !=
        (task.status?.name?.trim()?.toLowerCase() || '') ||
      existingTask.priority.trim().toLowerCase() !=
        (task.priority?.name?.trim()?.toLowerCase() || '') ||
      existingTask.description?.trim().toLowerCase() !=
        (task.description?.trim()?.toLowerCase() || '')
    );
  }
}

export default RedmineService;
