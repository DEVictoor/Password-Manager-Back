import { DataSource, DataSourceOptions } from "typeorm";
import variables from "../configuration/dotenv";

const {
  NODE_ENV,
  URL_DBEXTERNAL,
  PSQL_HOST,
  PSQL_PORT,
  PSQL_USER,
  PSQL_PASSWORD,
  PSQL_DATABASE,
} = variables;

let data: DataSourceOptions;

if (NODE_ENV == "production") {
  data = {
    type: "postgres",
    url: URL_DBEXTERNAL,
    synchronize: false,
    ssl: false,
    logging: false,
    entities: ["dist/modules/**/entities/*.entity.js"],
  };
} else {
  data = {
    type: "postgres",
    host: PSQL_HOST,
    port: Number(PSQL_PORT),
    username: PSQL_USER,
    password: PSQL_PASSWORD,
    database: PSQL_DATABASE,
    synchronize: true,
    entities: ["src/modules/**/entities/*.entity.ts"],
    logging: true,
  };
}

export const ConectionPgsql = new DataSource(data);
