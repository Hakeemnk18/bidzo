import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}


export interface GoogleProfile {
  sub: string;
  email: string;
  name: string;
}