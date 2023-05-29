import { Person } from "../Person/entities/person.entity";
import { User } from "./entities/user.entity";
import { hash } from "bcrypt";
import { ObjectId, Repository, UpdateResult } from "typeorm";
import { ConectionPgsql } from "../../database/conection";
import { UserDTO } from "./PDO/user.dto";
import { generateOtp } from "../../utils/otp.helper";
import { UpdateDTO } from "./PDO/update.dto";

export class UserService {
  private _repo: Repository<User>;

  constructor() {
    this._repo = ConectionPgsql.getRepository(User);
  }

  async find(): Promise<User[]> {
    return await this._repo.find();
  }

  async findOneById(id: string): Promise<User> {
    const foundUser = await this._repo.findOne({
      where: { id },
      relations: { person: true },
    });

    if (!foundUser) throw new Error("No se pudo encontrar el usuario");
    return foundUser;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    console.log(email);
    return await this._repo.findOneBy({ person: { email } });
  }

  async findOneByEmailAndIsVerified(email: string): Promise<User | null> {
    return await this._repo.findOneBy({ person: { email }, isVerified: true });
  }

  async findOneByEmailAndNotIsVerified(email: string): Promise<User | null> {
    return await this._repo.findOneBy({ person: { email }, isVerified: false });
  }

  async create(body: UserDTO): Promise<User> {
    const otp = generateOtp(5);
    return await this._repo.save({ ...body, otp });
  }

  async updateById(body: UpdateDTO, id: string): Promise<User> {
    const foundUser = await this.findOneById(id);

    foundUser.isVerified = body.isVerified;
    foundUser.otp = body.otp;

    foundUser.save();

    return foundUser;
  }

  async seeder(person: Person): Promise<User> {
    const user = new User();
    user.person = person;
    user.password = await hash("password", 10);
    user.otp = "12345";
    user.isVerified = true;
    user.username = "username_person";

    return await user.save();
  }
}
