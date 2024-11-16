import 'reflect-metadata';
import express from 'express';
import Logger from '../utils/logger';

const logger = new Logger();

const app = express();

app.listen(3333, () => {
  logger.info('Server is running!');
});
