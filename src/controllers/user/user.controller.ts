import { Request, Response } from 'express';
import UserService from '../../services/user/user.service';
import User from '../../models/user/iuser.interface';

const secretKey = 'your-secret-key';
import jwt from 'jsonwebtoken';

class UserController {

  static async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      await UserService.registerUser(email, '');

      res.status(201).json({ message: 'Usuario registrado. Por favor, confirme su correo electrónico.' });
    } catch (error) {
      console.error('Error al registrar un usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
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
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId: number = parseInt(req.params.userId, 10);
      await UserService.deleteUser(userId);
      res.status(200).json({ message: 'Usuario eliminado exitosamente.' });
    } catch (error) {
      console.error('Error al eliminar un usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }

  static async confirmEmail(req: Request, res: Response): Promise<void> {
    try {
      const { email, token } = req.body;

      const confirmed = await UserService.confirmEmail(email, token);
      if (confirmed) {
        res.status(200).json({ message: 'Correo electrónico confirmado exitosamente.' });
      } else {
        res.status(400).json({ error: 'Token de confirmación no válido.' });
      }
    } catch (error) {
      console.error('Error al confirmar el correo electrónico:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }

  static async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await UserService.loginUser(email, password);

      if (token) {
        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: 'Credenciales incorrectas.' });
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }

}  


export default UserController;
