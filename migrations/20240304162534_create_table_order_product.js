import { text } from "express";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

//TODO Slug " " for "_"
export const up = function (knex) {
  return knex.schema.createTable("order_product", (table) => {
    table.bigIncrements("id");
    table.bigint("user_id").unsigned().references("id").inTable("users");
    table.bigint("product_id").unsigned().references("id").inTable("products");
    table.bigint("order_id").unsigned().references("id").inTable("orders");
    table.decimal("price", 15, 2);
    table.decimal("discount", 10, 2);
    table.decimal("current_price", 15, 2);
    table.integer("quantity");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable("order_product");
};
