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

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to,
      subject: 'Confirmación de registro',
      text: `Por favor, haga clic en el siguiente enlace para confirmar su registro: http://your-app-url/confirm-email?email=${to}&token=${token}`,
    };

    // Envía el correo electrónico
    await this.transporter.sendMail(mailOptions);
  }
}

export default EmailService;
