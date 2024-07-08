import express, { Request, Response } from 'express';
import '@config/mongo';
import logger from 'morgan';
import cors from 'cors';
import http from 'http';
import indexRouter from '@src/routes/indexRouter';
import userRouter from '@src/routes/userRouter';
import chatRoomRouter from '@src/routes/chatRoomRouter';
import deleteRouter from '@src/routes/deleteRouter';
import Logging from '@src/utils/logging';

const app = express();

const port = process.env.PORT || '3000';
app.set('port', port);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/room', chatRoomRouter);
app.use('/delete', deleteRouter);

app.use('*', (req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint does not exist',
  });
});

const server = http.createServer(app);

server.listen(port);

server.on('listening', () => {
  Logging.info(`Listening on port: [1](http://localhost):${port}/`);
});
