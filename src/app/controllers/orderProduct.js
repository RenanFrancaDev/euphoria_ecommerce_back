import knex from "../services/knex.js";

const TABLE = "order_product";

export const getAll = () => {
  return knex(TABLE).select();
};

export const get = (id) => {
  return knex(TABLE).where({ id }).first();
};

export const getByOrder = (order_id) => {
  return knex(TABLE).where({ order_id });
};

export const getByUser = (user_id) => {
  return knex(TABLE).where({ user_id });
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
