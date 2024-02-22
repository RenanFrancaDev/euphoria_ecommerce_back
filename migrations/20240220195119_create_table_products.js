import { text } from "express";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable("products", (table) => {
    table.bigIncrements("id");
    table.bigint("category_id").unsigned().references("id").inTable("category");
    table.string("name");
    table.string("description");
    table.decimal("price", 15, 2);
    table.decimal("discount", 10, 2);
    table.integer("quantity_stock");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable("products");
};
