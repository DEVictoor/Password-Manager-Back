import { GoogleService } from "../Google/google.service";
import nodemailer from "nodemailer";
import { MailInterface } from "../../interfaces/mailer.interface";

export class MailerService {
  private transporter: nodemailer.Transporter;
  private sGoogle: GoogleService;

  constructor() {
    this.sGoogle = new GoogleService();
  }

  async createConnection() {
    const { GOOGLE_CLIENT_ID, GOOGLE_REFRESH_TOKEN, GOOGLE_CLIENT_SECRET } =
      this.sGoogle;
    const accestoken = await this.sGoogle.getAccesToken();

    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "devictormireles@gmail.com",
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        refreshToken: GOOGLE_REFRESH_TOKEN,
        accessToken: accestoken,
      },
    });
  }

  async sendEmail(
    requestId: string | number | string[],
    options: MailInterface
  ) {
    return await this.transporter
      .sendMail({
        to: options.to,
        from: options.from,
        cc: options.cc,
        bcc: options.bcc,
        subject: options.subject,
        text: options.text,
        html: options.html,
      })
      .then((info) => {
        console.log(`${requestId} - Correo enviado`);
        console.log(
          `${requestId} - [MailResponse]=${info.response} [MessageID]=${info.messageId}`
        );
        return info;
      });
  }
}
