import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import IRequestAuth from '../interfaces/iRequestAuth.interface';
import User from '../models/user/iuser.interface';

const secretKey = 'dev';

function authenticateToken(req: any, res: Response, next: NextFunction): void {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'No se proporcionó un token de autenticación.' });
    return;
  }

  jwt.verify(token, secretKey, (err:any, user:any) => {
    if (err) {
      return res.status(403).json({ error: 'Token no válido.' });
    }

    req.user = user as User;
    next();
  });
}

export default authenticateToken;
