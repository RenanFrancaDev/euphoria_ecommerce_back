import knex from "../services/knex.js";

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

export const getAddressByUser = (id) => {
  return knex(TABLE).where({ user_id: id });
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
