import express from 'express';
import Logger from '../utils/logger';

const app = express();

const logger = new Logger();

app.listen( 3333, () => {
  logger.info('Server is running!');
});