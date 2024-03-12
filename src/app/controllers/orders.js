import knex from "../services/knex.js";

const TABLE = "orders";

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

export const save = async (params) => {
  console.log(params);
  const order = await knex(TABLE).insert({
    user_id: params.user_id,
    total_price: params.total_price,
    total_discount: params.total_discount,
    total_price_current: params.total_price_current,
    status: params.status,
  });

  for (const product of params.products) {
    await knex("order_product").insert({
      user_id: params.user_id,
      order_id: order[0],
      product_id: product.id,
      price: product.price,
      discount: product.discount,
      current_price: product.current_price,
      quantity: product.quantity,
    });
  }
  return order;
};

export const update = (id, params) => {
  return knex(TABLE).where({ id }).update(params);
};

export const remove = (id) => {
  return knex(TABLE).delete(id);
};
