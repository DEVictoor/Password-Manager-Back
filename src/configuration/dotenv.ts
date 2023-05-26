// configuration for enviroment variables
import dotenv from "dotenv";
import { IEnVariables } from "../interfaces/dotenv.interface";

dotenv.config();

const getEnVar = (v: string): string => {
  const ret = process.env[v];
  if (ret == undefined) throw new Error("process.env." + v + " is undefined!");
  return ret;
};

const variables: IEnVariables = {
  PSQL_USER: getEnVar("PSQL_USER"),
  PSQL_PASSWORD: getEnVar("PSQL_PASSWORD"),
  PSQL_PORT: getEnVar("PSQL_PORT"),
  PSQL_NETWORK: getEnVar("PSQL_NETWORK"),
  PSQL_DATABASE: getEnVar("PSQL_DATABASE"),
  PSQL_HOST: getEnVar("PSQL_HOST"),

  PGADMIN_EMAIL: getEnVar("PGADMIN_EMAIL"),
  PGADMIN_PASSWORD: getEnVar("PGADMIN_PASSWORD"),
  PGADMIN_PORT: getEnVar("PGADMIN_PORT"),

  URL_DBCONNECT: getEnVar("URL_DBCONNECT"),
  URL_DBEXTERNAL: getEnVar("URL_DBEXTERNAL"),

  STRIPE_PUB_KEY: getEnVar("STRIPE_PUB_KEY"),
  STRIPE_SECRET_KEY: getEnVar("STRIPE_SECRET_KEY"),
  STRIPE_CUSTOMER_ID: getEnVar("STRIPE_CUSTOMER_ID"),

  MERCADO_PUB_KEY: getEnVar("MERCADO_PUB_KEY"),
  MERCADO_ACC_TOK: getEnVar("MERCADO_ACC_TOK"),

  JWT_KEY: getEnVar("JWT_KEY"),

  NODE_ENV: getEnVar("NODE_ENV"),

  GOOGLE_API_KEY: getEnVar("GOOGLE_API_KEY"),
  GOOGLE_CLIENT_ID: getEnVar("GOOGLE_CLIENT_ID"),
  GOOGLE_CLIENT_SECRET: getEnVar("GOOGLE_CLIENT_SECRET"),
  GOOGLE_REFRESH_TOKEN: getEnVar("GOOGLE_REFRESH_TOKEN"),
};

export default variables;
