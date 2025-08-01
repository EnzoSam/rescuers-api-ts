import nodemailer from 'nodemailer';

class EmailService {
  private transporter;

  constructor() {

    this.transporter = nodemailer.createTransport({
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendConfirmationEmail(to: string, token: string): Promise<void> {

    console.log('sending mail...')
    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to,
      subject: 'Confirmación de registro',
      text: `Por favor, haga clic en el siguiente enlace para confirmar su registro: ${process.env.FRONT_URL}auth/validate/${to}/${token}`,
    };

    await this.transporter.sendMail(mailOptions);

    console.log('mail sended')
  }

  async sendResetPasswordEmail(to: string, token: string): Promise<void> {

    console.log('sending mail...')
    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to,
      subject: 'Blanqueo de contraseña',
      text: `Por favor, haga clic en el siguiente enlace para crear una nueva contraseña: ${process.env.FRONT_URL}auth/reset/${to}/${token}`,
    };

    await this.transporter.sendMail(mailOptions);

    console.log('mail sended')
  }  

  async sendMail(to: string, subject:string, body: string): Promise<void> {

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to,
      subject: subject,
      text: body
    };

    await this.transporter.sendMail(mailOptions);
  }
}

export default EmailService;
