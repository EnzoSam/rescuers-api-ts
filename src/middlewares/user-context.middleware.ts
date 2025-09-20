import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user/iuser.interface';

const secretKey = process.env.JWT_SECRET || '1a1aa4a5a5::;;;';

function userContext(req: any, res: Response, next: NextFunction): void {

  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return next();
  }

  jwt.verify(token, secretKey, (err: any, user: any) => {
    if (err) {
      return next();
    }

    req.user = user as User;
    next();
  });
}

export default userContext;
