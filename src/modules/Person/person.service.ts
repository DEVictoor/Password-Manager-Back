import { ConectionPgsql } from "../../database/conection";
import { Person } from "./entities/person.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { PersonDTO } from "./DTO/person.dto";

export class PersonService {
  private _repo: Repository<Person>;

  constructor() {
    this._repo = ConectionPgsql.getRepository(Person);
  }

  async getAll() {
    return await this._repo.find();
  }

  async findById(id: string): Promise<Person | null> {
    return this._repo.findOneBy({ id });
  }

  async create(body: PersonDTO): Promise<Person> {
    return this._repo.save(body);
  }

  async update(body: PersonDTO, id: string): Promise<UpdateResult> {
    return this._repo.update({ id }, body);
  }

  async delete(id: string): Promise<DeleteResult> {
    return this._repo.delete({ id });
  }

  async seeder(): Promise<Person> {
    const foundPerson = await this._repo.findOneBy({
      email: "admin@correo.com",
    });

    if (foundPerson)
      throw new Error(
        "No es necesario crear un persona en el seeder. Ya se creo previamente"
      );

    const person = await this.create({ email: "admin@correo.com" });

    return person;
  }
}
