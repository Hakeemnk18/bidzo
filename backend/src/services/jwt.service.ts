import jwt from 'jsonwebtoken';
import { IJWTService } from './interfaces/jwt.interface';

export class JWTService implements IJWTService {
  sign(payload: object): string {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1m' });
  }

  verify(token: string): any {
    return jwt.verify(token, process.env.JWT_SECRET!);
  }
}