import { Person } from "../../Person/entities/person.entity";

export class UserDTO {
  username?: string;
  password?: string;
  person: Person;
}
