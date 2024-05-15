import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import IRequestAuth from '../interfaces/iRequestAuth.interface';
import User from '../models/user/iuser.interface';
import { handleError } from '../handlers/error.handler';

const secretKey = process.env.JWT_SECRET || '1a1aa4a5a5::;;;';

function authenticateToken(req: any, res: Response, next: NextFunction): void {
  
  next();
  /*
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'No se proporcionó un token de autenticación.' });
    return;
  }
  
  jwt.verify(token, secretKey, (err:any, user:any) => {
    if (err) {
      return handleError(res, 403, 'Token no válido.', err);
    }

    req.user = user as User;
    next();
  });*/
}

export default authenticateToken;
