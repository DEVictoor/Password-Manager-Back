import { GoogleConfig } from "../Google/google.config";
import { GoogleService } from "../Google/google.service";
import nodemailer from "nodemailer";
import { MailInterface } from "../../interfaces/mailer.interface";
import { log } from "console";

export class MailerService {
  private static instance: MailerService;
  private transporter: nodemailer.Transporter;
  private sGoogle: GoogleService;
  private cGoogle: GoogleConfig;

  constructor() {
    this.sGoogle = new GoogleService();
    this.cGoogle = new GoogleConfig();
    this.createConnection();
  }

  static getInstance() {
    if (!MailerService.instance) MailerService.instance = new MailerService();
    return MailerService.instance;
  }

  async createConnection() {
    const { GOOGLE_CLIENT_ID, GOOGLE_REFRESH_TOKEN, GOOGLE_CLIENT_SECRET } =
      this.cGoogle;
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

  async emailRegister() {}
}
