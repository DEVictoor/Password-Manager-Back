import { Transporter, createTransport } from "nodemailer";
import { MailInterface } from "../../interfaces/mailer.interface";
import variables from "../../configuration/dotenv";
import { OAuth2Client } from "google-auth-library";

export class MailerService {
  private transporter: Transporter;

  constructor() {}

  async createConnection() {
    const { GOOGLE_CLIENT_ID, GOOGLE_REFRESH_TOKEN, GOOGLE_CLIENT_SECRET } =
      variables;

    const cGoogle = new OAuth2Client(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    cGoogle.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

    const { token } = await cGoogle.getAccessToken();

    if (!token) throw new Error("No se pudo obtener el Acces token de google");

    this.transporter = createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "devictormireles@gmail.com",
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        refreshToken: GOOGLE_REFRESH_TOKEN,
        accessToken: token,
      },
    });
  }

  async createConnectionGoDaddy() {
    this.transporter = createTransport({
      // service: "GoDaddy",
      // host: 'smtpout.secureserver.net',
      host: "mail.academiapreuniversitariaelite.com",
      secure: true,
      requireTLS: true,
      debug: true,
      port: 465,
      auth: {
        user: 'soporte@academiapreuniversitariaelite.com',
        pass: 'admminvictor2023%'
      }
    })
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
        console.log(info);
        return info;
      });
  }
}
