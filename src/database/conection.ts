import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const ConectionPgsql = new DataSource({
  type: "postgres",
  host: process.env.PSQL_HOST,
  port: Number(process.env.PSQL_PORT),
  username: process.env.PSQL_USER,
  password: process.env.PSQL_PASSWORD,
  database: process.env.PSQL_DATABASE,
  synchronize: true,
  // logging: ["migration", "query", "info"],
  // logging: ["query"],
  entities: ["src/modules/**/entities/*.entity.ts"],
  subscribers: [],
  migrations: [
    /*...*/
  ],
  migrationsTableName: "migrations",
  migrationsTransactionMode: "all",
  migrationsRun: true,
});
