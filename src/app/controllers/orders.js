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
  const [orderId] = await knex(TABLE).insert({
    user_id: params.user_id,
    total_price: params.total_price,
    total_discount: params.total_discount,
    total_price_current: params.total_price_current,
    status: params.status,
  });

  const order = await knex(TABLE)
    .where({ id: orderId, user_id: params.user_id })
    .first();

  for (const product of params.products) {
    await knex("order_product").insert({
      user_id: params.user_id,
      order_id: order.id,
      product_id: product.id,
      price: product.price,
      discount: product.discount,
      current_price: product.newPrice,
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
// await knex("order_product").insert({
//   user_id: params.user_id,
//   order_id: order[0],
//   product_id: product.id,
//   price: product.price,
//   discount: product.discount,
//   current_price: product.newPrice,
//   quantity: product.quantity,
// });

// console.log(
//   params.user_id,
//   order,
//   product.id,
//   product.price,
//   product.discount,
//   product.current_price,
//   product.quantity
// );
