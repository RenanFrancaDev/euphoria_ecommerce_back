import knex from "../services/knex.js";
import bcrypt from "bcrypt";

const TABLE = "address";

export const getAll = () => {
  return knex(TABLE).select(
    "id",
    "user_id",
    "cep",
    "street",
    "neighborhood",
    "number",
    "complement",
    "created_at",
    "updated_at"
  );
};

export const get = (id) => {
  return knex(TABLE)
    .where({ id })
    .select(
      "id",
      "user_id",
      "cep",
      "street",
      "neighborhood",
      "number",
      "complement",
      "created_at",
      "updated_at"
    )
    .first();
};

export const save = (params) => {
  return knex(TABLE).insert(params);
};

export const update = (id, params) => {
  return knex(TABLE).where({ id }).update(params);
};

export const remove = (id) => {
  return knex(TABLE).delete(id);
};

export const getByEmail = (email) => {
  return knex(TABLE).where({ email }).first();
};
