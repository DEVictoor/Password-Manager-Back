export interface IEnVariables {
  PSQL_USER: string;
  PSQL_PASSWORD: string;
  PSQL_PORT: string;
  PSQL_NETWORK: string;
  PSQL_DATABASE: string;
  PSQL_HOST: string;

  PGADMIN_EMAIL: string;
  PGADMIN_PASSWORD: string;
  PGADMIN_PORT: string;

  URL_DBCONNECT: string;
  URL_DBEXTERNAL: string;

  STRIPE_PUB_KEY: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_CUSTOMER_ID: string;

  MERCADO_PUB_KEY: string;
  MERCADO_ACC_TOK: string;

  JWT_KEY: string;

  NODE_ENV: string;
}
