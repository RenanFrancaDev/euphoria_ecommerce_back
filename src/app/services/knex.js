import knex from "knex";
import knexConfig from "../../database/config.js";

let conn;

const knexService = () => {
  if (!conn) {
    conn = knex(knexConfig);
  }
  return conn;
};

export default knexService();
