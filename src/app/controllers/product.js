import knex from "../services/knex.js";

const TABLE = "products";
const TABLE_IMG = "products_img";

export const getAll = async () => {
  // Busca todos os produtos da tabela products
  const products = await knex(TABLE).select();

  // Atualiza o preço de cada produto aplicando o desconto
  for (let product of products) {
    product.newPrice = product.price - product.price * product.discount;
  }

  // Para cada produto, busca as informações da tabela products_img relacionadas
  for (let product of products) {
    const images = await knex(TABLE_IMG)
      .where({
        product_id: product.id,
      })
      .select("image");
    product.imageUrls = images;
  }

  return products;
};

export const get = async (id) => {
  const product = await knex(TABLE).where({ id }).select().first();

  product.newPrice = product.price - product.price * product.discount;

  const images = await knex(TABLE_IMG)
    .where({
      product_id: product.id,
    })
    .select("image");

  product.imageUrls = images;

  return product;
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
