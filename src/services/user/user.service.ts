import admin from 'firebase-admin';
import User from '../../models/user/iuser.interface';
import EmailService from '../email.service'
import bcrypt from 'bcryptjs'
let emailService = new EmailService();
import jwt from 'jsonwebtoken';
import { IInitRegisterResponse } from '../../interfaces/initregisterresponse.interface';
import { IResult } from '../../interfaces/iresult.interface';

const db = admin.database();
const usersRef = db.ref('users');

class UserService {
  // Función para crear un nuevo usuario
  static async createUser(user: User): Promise<void> {
    await usersRef.push(user);
  }

  // Función para obtener un usuario por su ID
  static async getUserById(userId: number): Promise<User | any> {
    const snapshot = await usersRef.orderByChild('id').equalTo(userId).once('value');
    const user = snapshot.val();
    return user ? Object.values(user)[0] : null;
  }

  // Función para obtener un usuario por su nombre de usuario
  static async getUserByEmail(email: string): Promise<User | any> {
    const snapshot = await usersRef.orderByChild('email').equalTo(email).once('value');
    const user = snapshot.val();
    return user ? Object.values(user)[0] : null;
  }

  // Función para actualizar la información de un usuario
  static async updateUser(userId: number, updatedUser: Partial<User>): Promise<void> {
    await usersRef.child(userId.toString()).update(updatedUser);
  }

  // Función para eliminar un usuario
  static async deleteUser(userId: number): Promise<void> {
    await usersRef.child(userId.toString()).remove();
  }

  static async registerUser(email: string, name: string, lastName: string, password: string): Promise<IInitRegisterResponse> {

    return new Promise(async (resolve, reject) => {
      let response: IInitRegisterResponse = {
        statusCode: 0,
        message: ''
      }
      try {

        // Verificar si el correo electrónico está bloqueado
        const blockedUsers = await usersRef.orderByChild('emailVerificationAttempts').equalTo(5).once('value');
        if (blockedUsers.exists()) {
          response.statusCode = 500;
          response.message = 'El correo electrónico está bloqueado debido a demasiados intentos.'
          reject(response);
          return;
        }

        // Verificar si el correo electrónico ya está registrado
        const existingUser = await this.getUserByEmail(email);
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

        let emailConfirmationToken = 'hola12121333';

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = {
          email: email,
          name: name,
          lastName: lastName,
          password: hashedPassword,
          emailVerificationAttempts: 0,
          emailConfirmationToken: emailConfirmationToken
        };

        await usersRef.push(user);
        await emailService.sendConfirmationEmail(email, emailConfirmationToken);
        response.statusCode = 200;
        response.message = 'Inicio de registro correcto. Verificar correo electrónico para continuar.'
        resolve(response);
      }
      catch (ex: any) {
        response.statusCode = 500;
        response.message = ex.message;
        reject(response);
      }
    });
  }

  static async confirmEmail(email: string, token: string): Promise<boolean> {
    const snapshot = await usersRef.orderByChild('email').equalTo(email).once('value');
    const users = snapshot.val();

    if (users) {
      const userId = Object.keys(users)[0];
      const user = users[userId];

      if (!user) {
        throw new Error('Usuario no encontrado.');
      }

      if (user.emailVerificationAttempts >= 5) {
        throw new Error('El correo electrónico está bloqueado debido a demasiados intentos.');
      }

      if (user.emailConfirmationToken === token) {
        await usersRef.child(userId).update({
          emailConfirmed: true,
          emailConfirmationToken: null,
        });

        return true;
      }
      else {
        const newAttempts = user.emailVerificationAttempts + 1;
        await usersRef.child(userId.toString()).update({
          emailVerificationAttempts: newAttempts
        });
      }
    }

    return false;
  }
  static async resendVerificationEmail(email: string): Promise<void> {
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new Error('Usuario no encontrado.');
    }

    if (user.emailVerificationAttempts >= 5) {
      throw new Error('El correo electrónico está bloqueado debido a demasiados intentos.');
    }

    const newAttempts = user.emailVerificationAttempts + 1;
    const newToken = 'hola454555545sd4verifytoken';
    await usersRef.child(user.id.toString()).update({
      emailVerificationAttempts: newAttempts,
      emailConfirmationToken: newToken,
    });

    await emailService.sendConfirmationEmail(email, newToken);
  }

  static async verifyPassword(email: string, password: string): Promise<boolean> {
    const user = await this.getUserByEmail(email);

    return user ? bcrypt.compare(password, user.password) : false;
  }



  static async loginUser(email: string, password: string): Promise<string | null> {
    // Obtener el usuario por correo electrónico
    const user = await this.getUserByEmail(email);

    if (user) {
      // Verificar si el usuario existe y la contraseña coincide con el hash almacenado
      if (user && (await bcrypt.compare(password, user.password))) {
        // Generar y devolver el token JWT
        return jwt.sign({ userId: user.id, email: user.email }, 
           process.env.JWT_SECRET || '1a1aa4a5a5::;;;', { expiresIn: '120d' });
      }
    }

    return null;
  }

  static async requesResetPassword(email: string): Promise<IResult> {
    const user = await this.getUserByEmail(email);
    let result: IResult = {
      code: 0,
      message: '',
      state: ''
    }
    if (user) {

      const token = jwt.sign({ email }, process.env.JWT_SECRET || '1a1aa4a5a5::;;;', { expiresIn: '1h' });

      await usersRef.child(user.id.toString()).update({
        emailConfirmationToken: token
      });

      await emailService.sendConfirmationEmail(email, token);
      result.code = 200;
      result.message = 'Email de reseteo enviado. Revise el correo para reestablecer la contraseña';
    }
    else {
      result.code = 400;
      result.message = 'El email no esta registrado';
    }

    return result;
  }

  static async changePassword(email: string, token: string, newPassword: string): Promise<IResult> {
    const user = await this.getUserByEmail(email);
    let result: IResult = {
      code: 0,
      message: '',
      state: ''
    }
    if (user) {


      const decodedToken = jwt.verify(token,  process.env.JWT_SECRET || '1a1aa4a5a5::;;;') as { email: string };
      if(decodedToken.email === email)
      {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
  
        await usersRef.child(user.id.toString()).update({
          emailConfirmationToken: hashedPassword
        });
  
        await emailService.sendMail(email, "Cambio de password", "El cambio de password se realizó correctamente.");
        result.code = 200;
        result.message = 'Password actualizado';
      }
      else
      {
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

}

export default UserService;
