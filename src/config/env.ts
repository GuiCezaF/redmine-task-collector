import { z } from 'zod';
import Logger from '../utils/logger';

const logger = new Logger();

const envSchema = z.object({
  REDMINE_API_KEY: z.string(),
  REDMINE_USER_ID: z.number(),
});

export const validate = envSchema.safeParse(process.env);

if (!validate.success) {
  logger.error('Erro na validação das variáveis de ambiente:');
  process.exit(1);
}

export const env = validate.data;
