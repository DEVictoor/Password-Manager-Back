import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const ConectionPgsql = new DataSource({
  type: "postgres",
  // host: process.env.PSQL_HOST,
  // port: Number(process.env.PSQL_PORT),
  // username: process.env.PSQL_USER,
  // password: process.env.PSQL_PASSWORD,
  // database: process.env.PSQL_DATABASE,
  url: process.env.URL_DBEXTERNAL,
  synchronize: false,
  ssl: true,
  // logging: ["migration", "query", "info"],
  // logging: ["query"],
  // logging: true,
  // entities: ["src/modules/**/entities/*.entity.ts"],
  entities: ["dist/modules/**/entities/*.entity.js"],
  subscribers: [],
  migrations: [
    /*...*/
  ],
  migrationsTableName: "migrations",
  migrationsTransactionMode: "all",
  migrationsRun: true,
});
