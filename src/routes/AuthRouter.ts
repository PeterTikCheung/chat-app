import express, { Request, Response, NextFunction } from 'express';
import AuthController from '@src/controllers/AuthController'; // Assuming you have a user controller

const router = express.Router();

router.post('/login/:userId', AuthController.loginUser);

export default router;
