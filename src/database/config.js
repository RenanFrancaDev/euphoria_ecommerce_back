import knex from "knex";
import dotenv from "dotenv";
dotenv.config();

const knexConfig = knex({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST || "localhost",
    port: 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "euphoria",
  },
});

export default knexConfig;
