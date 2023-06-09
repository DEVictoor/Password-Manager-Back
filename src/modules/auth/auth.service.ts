import { UserService } from "../Users/user.service";
import { PersonService } from "../Person/person.service";
import { LoginDTO } from "./DTO/login.dto";
import { compareSync } from "bcrypt";
import variables from "../../configuration/dotenv";
import jwt from "jsonwebtoken";
import { User } from "../Users/entities/user.entity";
import { generateOtp } from "../../utils/otp.helper";
import { MailerService } from "../mailer/mailer.service";
import verifyEmail from "../mailer/templates/verifyEmail";
import { SendInformation } from "./DTO/send_information.dto";
import { plantillaInfomativa } from "../mailer/templates/information";

const { JWT_KEY } = variables;

export class AuthService {
  private _userservice: UserService;
  private _personService: PersonService;

  constructor() {
    this._userservice = new UserService();
    this._personService = new PersonService();
  }

  async login({
    email,
    password,
  }: LoginDTO): Promise<{ token: string } | Error> {
    const user = await this._userservice.findOneByEmail(email);

    if (!user) throw new Error("No se encontro el usuario");

    const isMatch = compareSync(password, user.password);

    if (!isMatch) throw new Error("Credenciales incorrectas");

    const token = jwt.sign({ id: user.id }, JWT_KEY, {
      expiresIn: "3d",
    });

    return { token };
  }

  async register(email: string): Promise<User> {
    const foundUser = await this._userservice.findOneByEmail(email);

    if (!foundUser) {
      const person = await this._personService.create({ email });
      const user = await this._userservice.create({ person });
      return user;
    }
    if (foundUser.isVerified)
      throw new Error("Correo ya verificado. Por favor elige otro");

    const newOtp = generateOtp(5);

    const update = await this._userservice.updateById(
      { otp: newOtp, isVerified: false },
      foundUser.id
    );

    return update;
  }

  async sendEmailRegister(user: User) {
    const template = verifyEmail(user.otp, "asdas");
    const sMailer = new MailerService();
    await sMailer.createConnection();
    await sMailer.sendEmail("asldhbna1", {
      to: user.person.email,
      subject: "Verify OTP",
      html: template.html,
    });
  }

  async sendEmailInformation({email, username, telefono} : SendInformation) {
    const {SMTP_USER} = variables;
    const template = plantillaInfomativa(username, telefono);
    const sMailer = new MailerService();
    await sMailer.createConnectionGoDaddy();
    await sMailer.sendEmail("zxzxc", {
      to: email, 
      from: SMTP_USER,
      subject: "Correo informativo",
      html: template,
    })
  }
}
