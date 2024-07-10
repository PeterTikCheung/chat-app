import mongoose from 'mongoose';
import config from '@config/index'; // Assuming you have an index file with your configuration
import Logging from '@src/utils/Logging';

const CONNECTION_URL = `mongodb://${config.db.url}/${config.db.name}`;

mongoose.connect(CONNECTION_URL);

mongoose.connection.on('connected', () => {
  Logging.info('Mongo has connected successfully');
});

mongoose.connection.on('reconnected', () => {
  Logging.info('Mongo has reconnected');
});

mongoose.connection.on('error', (error) => {
  Logging.error('Mongo connection has an error' + error);
  mongoose.disconnect();
});

mongoose.connection.on('disconnected', () => {
  Logging.info('Mongo connection is disconnected');
});