import knex from "../services/knex.js";

const TABLE = "products";
const TABLE_IMG = "products_img";
const TABLE_CAT = "category";

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
    product.imageUrls = images.map((image) => image.image);
  }

  for (let product of products) {
    const categories = await knex(TABLE_CAT)
      .where({ id: product.category_id })
      .select("name");
    product.category = categories[0].name;
  }

  return products;
};

export const getDiscount = async () => {
  const products = await getAll();
  const prodWithDiscount = [];

  for (let i = 0; i < products.length; i++) {
    if (products[i].discount > 0) {
      prodWithDiscount.push(products[i]);
    }
  }
  return prodWithDiscount;
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
