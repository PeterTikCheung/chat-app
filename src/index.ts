import express, { Request, Response } from 'express';
import '@config/mongo';
import logger from 'morgan';
import cors from 'cors';
import http from 'http';
import AuthRouter from '@src/routes/AuthRouter';
import UserRouter from '@src/routes/UserRouter';
import ChatroomRouter from '@src/routes/ChatRoomRouter';
import DeleteRouter from '@src/routes/DeleteRouter';
import Logging from '@src/utils/Logging';
import { Server } from 'socket.io';
import WebSockets from '@src/utils/WebSocket';
import { setSharedContext } from '@src/utils/ContextManager';

const app = express();

const port = process.env.PORT || '3000';
app.set('port', port);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/', AuthRouter);
app.use('/users', UserRouter);
app.use('/room', ChatroomRouter);
app.use('/delete', DeleteRouter);

app.use('*', (req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint does not exist',
  });
});

const server = http.createServer(app);

const io = new Server(server);
setSharedContext({ io });
// Handle WebSocket connections
io.on('connection', WebSockets.connection);
setSharedContext({ io });
server.listen(port);

server.on('listening', () => {
  Logging.info(`Listening on port: [1](http://localhost):${port}/`);
});
