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

      const user = await this._user.seeder(person);
    } catch (err) {
      console.log(getErrorMessage(err));
    }
  }
}
