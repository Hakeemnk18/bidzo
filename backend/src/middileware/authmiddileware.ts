import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HttpStatusCode } from '../constants/httpStatusCode';
import { ResponseMessages } from '../constants/responseMessages';

interface AuthRequest extends Request {
  user?: any; 
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: ResponseMessages.UNAUTHORIZED });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string, role: string };
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: ResponseMessages.UNAUTHORIZED });
  }
};