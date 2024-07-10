import { Request, Response } from 'express';
import UserService from '@src/services/UserService';
import { generateToken } from '@src/middlewares/auth/jwt';
const AuthController = {
  loginUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;

      const result = await UserService.getUserById(userId);

      // Generate JWT token
      const token = generateToken({ userId: result._id });
      console.log(token);

      res.status(200).json({ message: 'Login successful', token: token });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while logging in' });
    }
  },
};

export default AuthController;
