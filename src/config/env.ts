import "dotenv/config";
import { z } from 'zod';
import Logger from '../utils/logger';


const logger = new Logger();

const envSchema = z.object({
  APP_PORT:z.coerce.number(),
  REDMINE_API_KEY: z.string(),
  REDMINE_USER_ID: z.coerce.number(),
  REDMINE_URL: z.string().url(),
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
});

const validate = envSchema.safeParse(process.env);

if (!validate.success) {
  logger.error('Erro na validação das variáveis de ambiente:', {
    errors: validate.error.errors,
  });
  process.exit(1);
}

export const env = validate.data;
