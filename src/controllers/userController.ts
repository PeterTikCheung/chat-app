import { Request, Response } from 'express';
// models
import UserService from '@src/services/UserService';
import Logging from '@src/utils/logging';

const UserController = {
  onGetAllUsers: async (req: Request, res: Response): Promise<Response> => {
    try {
      const users = await UserService.getAllUsers();
      return res.status(200).json({ success: true, users });
    } catch (error) {
      Logging.error('Error on onGetAllUsers controller method:' + error);
      return res.status(500).json({ success: false, error: error });
    }
  },
  onGetUserById: async (req: Request, res: Response): Promise<Response> => {
    try {
      const user = await UserService.getUserById(req.params.id);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      Logging.error('Error on onGetUserById controller method:' + error);
      return res.status(500).json({ success: false, error: error });
    }
  },
  onCreateUser: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { firstName, lastName, type } = req.body;
      const user = await UserService.createUser(firstName, lastName, type);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      Logging.error('Error on onCreateUser controller method:' + error);
      return res.status(500).json({ success: false, error });
    }
  },
};

export default UserController;
