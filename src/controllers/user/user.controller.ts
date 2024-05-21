import { Request, Response } from 'express';
import UserService from '../../services/user/user.service';
import User from '../../models/user/iuser.interface';

const secretKey = 'your-secret-key';
import jwt from 'jsonwebtoken';
import { handleError, handleErrorGeneric } from '../../handlers/error.handler';
import { IResult } from '../../interfaces/iresult.interface';
import { handleCreatedOk, handleOK, handleResOK } from '../../handlers/response.handler';

class UserController {

  service:UserService;

  constructor(_userService:UserService)
  {
    this.service = _userService;
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const all = await this.service.getAll();
      handleOK(res, all);
    } catch (error) {
      console.error('Error al obtener zonas:', error);
      handleErrorGeneric(res, "Error interno del servidor.", error);
    }
  }

  async get(req: Request, res: Response): Promise<void> {
    try {

      const { id } = req.params;
      const unique = await this.service.getById(id);
      handleOK(res, unique);
    } catch (error) {
      console.error('Error al obtener zona por id.', error);
      handleErrorGeneric(res, "Error interno del servidor.", error);
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const atribute = req.body;
      let created = await this.service.create(atribute);
      handleCreatedOk(res, created);
    } catch (error) {
      console.error('Error al crear un atributo:', error);
      handleErrorGeneric(res, "Error interno del servidor.", error);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {      
      const updates = req.body;
      const { id } = updates;
      await this.service.update(id, updates);
      handleOK(res, updates);
    } catch (error) {
      console.error('Error al actualizar un atributo:', error);
      handleErrorGeneric(res, "Error interno del servidor.", error);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      handleResOK(res);
    } catch (error) {
      handleErrorGeneric(res, "Error interno del servidor.", error);
    }
  }


  async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, name, lastName, password } = req.body;
      let registerResponse = await this.service.registerUser
      (email, name, lastName, password);

      res.status(registerResponse.statusCode).send(registerResponse);
    } catch (error) {
      handleErrorGeneric(res, 'Error interno del servidor', error);
    }
  }

  async confirmEmail(req: Request, res: Response): Promise<void> {
    try {
    
      const { email, token } = req.body;
    
      const confirmed = await this.service.confirmEmail(email, token);
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

  async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await this.service.loginUser(email, password);

      if (token) {
        res.status(200).json({ token });
      } else {
        res.status(401).json({message: 'Credenciales incorrectas.'});
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      handleErrorGeneric(res, 'Error interno del servidor', error);
    }
  }

  async requestResetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      let r = await this.service.requesResetPassword(email);
      res.status(r.code).json(r);
    } catch (error) {
      console.error('Error en la pericion de reseto de password:', error);
      handleErrorGeneric(res, 'Error interno del servidor', error);
    }
  }

  async changePassword(req: Request, res: Response): Promise<void> {
    try {
      const { email, token, newPassword } = req.body;

      let r = await this.service.changePassword(email, token, newPassword);
      res.status(r.code).json(r);
    } catch (error) {
      console.error('Error en la pericion de cambio de password:', error);
      handleErrorGeneric(res, 'Error interno del servidor', error);
    }
  }
}  


export default UserController;
