import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { IJwtAuthRequest } from '@src/definitions/RequestDefinition';
// Secret key used to sign the JWT token
import config from '@config/index';

const jwtToken: string = config.JWT_SECRET_KEY;
// Generate a JWT token with a payload
const generateToken = (payload: any): string => {
  return jwt.sign(payload, jwtToken);
};

const authenticateToken = (req: Request, res: Response, next: any): void => {
  const authHeader = req.headers.authorization;
  const request = req as IJwtAuthRequest;

  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Extract the token from the Authorization header

    jwt.verify(token, jwtToken, (err: any, user: any) => {
      if (err) {
        res.sendStatus(403); // Token verification failed
      } else {
        request.userId = user.userId; // Attach the user object to the request
        next(); // Continue to the next middleware or route handler
      }
    });
  } else {
    res.sendStatus(401); // Token not provided
  }
};

export { generateToken, authenticateToken };
