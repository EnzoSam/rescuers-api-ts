import { Request, Response } from 'express';
import UserService from '../../services/user/user.service';
import User from '../../models/user/iuser.interface';

const secretKey = 'your-secret-key';
import jwt from 'jsonwebtoken';
import { handleError, handleErrorGeneric } from '../../handlers/error.handler';
import { IResult } from '../../interfaces/iresult.interface';

class UserController {

  static test(req: Request, res: Response)
  {
    res.send('Controller OK!');
  }

  static async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, name, lastName, password } = req.body;
      let registerResponse = await UserService.registerUser
      (email, name, lastName, password);

      res.status(registerResponse.statusCode).send(registerResponse);
    } catch (error) {
      handleErrorGeneric(res, 'Error interno del servidor', error);
    }
  }

  static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const userId: number = parseInt(req.params.userId, 10);
      const user = await UserService.getUserById(userId);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'Usuario no encontrado.' });
      }
    } catch (error) {
      console.error('Error al obtener un usuario por ID:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId: number = parseInt(req.params.userId, 10);

       const updatedUser: Partial<User> = req.body;
        await UserService.updateUser(userId, updatedUser);
        res.status(200).json({ message: 'Usuario actualizado exitosamente.' });

    } catch (error) {
      console.error('Error al actualizar un usuario:', error);
      handleErrorGeneric(res, 'Error interno del servidor', error);
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId: number = parseInt(req.params.userId, 10);
      await UserService.deleteUser(userId);
      res.status(200).json({ message: 'Usuario eliminado exitosamente.' });
    } catch (error) {
      console.error('Error al eliminar un usuario:', error);
      handleErrorGeneric(res, 'Error interno del servidor', error);
    }
  }

  static async confirmEmail(req: Request, res: Response): Promise<void> {
    try {
    
      const { email, token } = req.body;
    
      const confirmed = await UserService.confirmEmail(email, token);
      let result:IResult = {message:'', state:'', code: 500};
      if (confirmed) {
        result.message = 'Correo electrónico confirmado exitosamente.';
        result.code = 200;
        
      } else {
        result.message = 'Token de confirmación no válido..';
        result.code = 400;
        
      }
      res.status(200).json(result);
    } catch (error) {
      console.error('Error al confirmar el correo electrónico:', error);
      console.log(error);
      handleErrorGeneric(res, 'Error interno del servidor', error);
    }
  }

  static async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await UserService.loginUser(email, password);

      if (token) {
        res.status(200).json({ token });
      } else {
        res.status(401).send({message: 'Credenciales incorrectas.'});
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      handleErrorGeneric(res, 'Error interno del servidor', error);
    }
  }

  static async requestResetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      let r = await UserService.requesResetPassword(email);
      res.status(r.code).json(r);
    } catch (error) {
      console.error('Error en la pericion de reseto de password:', error);
      handleErrorGeneric(res, 'Error interno del servidor', error);
    }
  }

  static async changePassword(req: Request, res: Response): Promise<void> {
    try {
      const { email, token, newPassword } = req.body;

      let r = await UserService.changePassword(email, token, newPassword);
      res.status(r.code).json(r);
    } catch (error) {
      console.error('Error en la pericion de cambio de password:', error);
      handleErrorGeneric(res, 'Error interno del servidor', error);
    }
  }
}  


export default UserController;
