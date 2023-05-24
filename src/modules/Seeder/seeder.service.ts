import { getErrorMessage } from "../../utils/error.handle";
import { PersonService } from "../Person/person.service";
import { UserService } from "../Users/user.service";

export class SeederService {
  private _person: PersonService;
  private _user: UserService;

  constructor() {
    this._person = new PersonService();
    this._user = new UserService();
  }

  async seeder() {
    try {
      const person = await this._person.seeder();

      console.log(person);

      if (!person) throw new Error("No se pudo crear el usuario seed");

      const user = await this._user.seeder(person);

      console.log(user);
    } catch (err) {
      console.log(getErrorMessage(err));
    }
  }
}
