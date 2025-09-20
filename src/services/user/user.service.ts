import admin from 'firebase-admin';
import User from '../../models/user/iuser.interface';
import EmailService from '../email.service'
import bcrypt from 'bcryptjs'
let emailService = new EmailService();
import jwt from 'jsonwebtoken';
import { IInitRegisterResponse } from '../../interfaces/initregisterresponse.interface';
import { IResult } from '../../interfaces/iresult.interface';
import { IUserRepository } from '../../interfaces/repositories/users/iUserRepository.interface';
import { ROLES } from '../../constants/auth/roles.constant';
import { ILoginData } from '../../models/user/login-data.interface';
import { IContact } from '../../models/general/icontact.model';
import { randomUUID } from 'crypto';
import { IRefreshTokenRepository } from '../../interfaces/repositories/users/irefresh-token-repository.interface';

class UserService {

  repository: IUserRepository;
  constructor(_repository: IUserRepository,
    private _refreshTokenRepository: IRefreshTokenRepository
  ) {
    this.repository = _repository;
  }

  async getAll(): Promise<User[]> {

    const allItems = await this.repository.getAll();
    return allItems;
  }


  async getById(id: any): Promise<User | null> {

    const allItems = await this.repository.getById(id);
    if (allItems)
      delete allItems.password;
    return allItems;
  }

  async create(animal: User): Promise<string> {
    const atrRef = await this.repository.create(animal);
    return atrRef;
  }

  async update(id: string, updates: Partial<User>): Promise<void> {
    await this.repository.update(id, updates);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async generateToken(email: string) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 16; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  }

  async registerUser(email: string, name: string,
    lastName: string, password: string, phone: string | undefined): Promise<IInitRegisterResponse> {

    return new Promise(async (resolve, reject) => {
      let response: IInitRegisterResponse = {
        statusCode: 0,
        message: ''
      }
      try {

        const existingUser = await this.getUserByEmail(email);

        // Verificar si el correo electrónico ya está registrado
        if (existingUser) {
          if ((existingUser as User).emailConfirmed) {
            response.statusCode = 290;
            response.message = 'El correo electrónico ya está registrado y el email verificado.';
          }
          else {
            response.statusCode = 291;
            response.message = 'El correo electrónico ya está registrado. Pero debe verifcar el email.';
          }
          resolve(response);
          return;
        }

        let emailConfirmationToken = await this.generateToken(email);

        const hashedPassword = await bcrypt.hash(password, 10);



        const user: User = {
          email: email,
          name: name,
          lastName: lastName,
          password: hashedPassword,
          image: '',
          emailVerificationAttempts: 0,
          emailConfirmationToken: emailConfirmationToken,
          roles: [ROLES.USER],
          contacts: [],
          emailConfirmed: false,
          zoneId: 3
        };

        if (phone) {
          const whatsapp: IContact[] = [{
            contact: phone,
            type: 'whatsapp'
          }]
          user.contacts = whatsapp;
        }

        console.log('creating user')
        const idCreated = await this.repository.create(user as User);
        console.log('user created')

        try {
          await emailService.sendConfirmationEmail(email, emailConfirmationToken);
        }
        catch (smtError: any) {
          console.log('eliminando usuario por error de envio de mail');
          this.repository.delete(idCreated)
          response.statusCode = 500;
          response.message = "No se pudo enviar el correo de confirmación.";
          reject(response);
          return
        }
        response.statusCode = 200;
        response.message = 'Inicio de registro correcto. Verificar correo electrónico para continuar.'
        resolve(response);
      }
      catch (ex: any) {
        console.error('Error en registro', ex);
        response.statusCode = 500;
        response.message = ex.message;
        reject(response);
      }
    });
  }

  async confirmEmail(email: string, token: string): Promise<boolean> {

    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new Error('Usuario no encontrado.');
    }

    if (user.emailVerificationAttempts >= 5) {
      throw new Error('El correo electrónico está bloqueado debido a demasiados intentos.');
    }

    if (user.emailConfirmationToken === token) {
      user.emailConfirmed = true;
      user.emailConfirmationToken = '';
      await this.update(user.id, user);
      return true;
    }
    else {
      user.emailVerificationAttempts += 1;
      await this.update(user.id, user);
    }

    return false;
  }
  async resendVerificationEmail(email: string): Promise<void> {
    let user = await this.getUserByEmail(email);

    if (!user) {
      throw new Error('Usuario no encontrado.');
    }

    if (user.emailVerificationAttempts >= 5) {
      throw new Error('El correo electrónico está bloqueado debido a demasiados intentos.');
    }

    const newToken = await this.generateToken(email);
    user.emailVerificationAttempts += 1;
    user.emailConfirmationToken = newToken;
    await this.update(user.id, user);

    await emailService.sendConfirmationEmail(email, newToken);
  }

  async verifyPassword(email: string, password: string): Promise<boolean> {
    const user = await this.getUserByEmail(email);

    return user ? bcrypt.compare(password, user.password || '') : false;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.getUserByEmail(email);
    return user;
  }

  async loginUser(email: string, password: string):
    Promise<ILoginData | null> {
    const user = await this.getUserByEmail(email);

    if (!user)
      throw new Error('El usuario no existe');
    if (!user.emailConfirmed)
      throw new Error('El usuario no ha validado su email');

    if (user && (await bcrypt.compare(password, user.password || ''))) {
      return this.generateNewLogin(user)
    }

    return null;
  }

  async generateNewLogin(user: User): Promise<ILoginData | null>{
    const refreshToken = await randomUUID();
    const nowDate: Date = new Date();
    nowDate.setMonth(nowDate.getMonth() + 6);
    const timestampExp: number = nowDate.getTime();

    await this._refreshTokenRepository.create
      (
        {
          token: refreshToken,
          userId: user.id,
          expiryDate: timestampExp
        });

    const token = await jwt.sign(
      { userId: user.id, email: user.email, roles: user.roles },
      process.env.JWT_SECRET || '1a1aa4a5a5::;;;', { expiresIn: '1h' });
    return { token, sub: user.id, refreshToken }
  }


  async requesResetPassword(email: string): Promise<IResult> {
    let user = await this.getUserByEmail(email);
    let result: IResult = {
      code: 0,
      message: '',
      state: ''
    }
    if (user) {

      const token = await this.generateToken(email);
      user.emailConfirmationToken = token;
      await this.update(user.id, user);
      await emailService.sendResetPasswordEmail(email, token);
      result.code = 200;
      result.message = 'Email de reseteo enviado. Revise el correo para reestablecer la contraseña';
    }
    else {
      result.code = 400;
      result.message = 'El email no esta registrado';
    }

    return result;
  }

  async changePassword(email: string, token: string, newPassword: string): Promise<IResult> {
    let user = await this.getUserByEmail(email);
    let result: IResult = {
      code: 0,
      message: '',
      state: ''
    }
    if (user) {
      if (user.emailConfirmationToken === token) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.emailConfirmationToken = ''
        await this.update(user.id, user);
        await emailService.sendMail(email, "Cambio de contraseña", "El cambio de contraseña se realizó correctamente.");
        result.code = 200;
        result.message = 'Password actualizado';
      }
      else {
        result.code = 500;
        result.message = 'El token no es valido';
      }
    }
    else {
      result.code = 400;
      result.message = 'El email no esta registrado';
    }

    return result;
  }

  async setRoles(userId: any, roles: number[]): Promise<void> {
    if (!userId)
      throw new Error('Operacion imposible sin Id');

    let u = await this.getById(userId);
    if (u) {
      u.roles = roles;
      await this.update(u.id, u);
    }
    else
      throw new Error('El usuario no existe.')
  }

  async refreshToken(token: string): Promise<ILoginData | null> {
    const tokenDb = await this._refreshTokenRepository.getByToken(token);
    if (!tokenDb) {
      console.log('No existe el token');
      return null;
    }

    if (new Date().getTime() > tokenDb.expiryDate) {
      console.log('token expirado')
      return null;
    }

    const user = await this.getById(tokenDb.userId);
    if (!user) {
      console.log('usario de refresh token no valido');
      return null;
    }

    await this._refreshTokenRepository.deleteByToken(tokenDb.token);

    const newLogin = await this.generateNewLogin(user)
    return newLogin
  }
}

export default UserService;
