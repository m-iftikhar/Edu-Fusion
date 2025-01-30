import { Request } from 'express';

declare module 'express' {
  interface Request {
    user?: {
      _id: string;
      role: string;
      // Add other properties of the user object if needed
    };
  }
}



