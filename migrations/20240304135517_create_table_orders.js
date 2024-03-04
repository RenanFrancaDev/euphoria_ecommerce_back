export const up = function (knex) {
  return knex.schema.createTable("orders", (table) => {
    table.bigIncrements("id");
    table.bigint("user_id").unsigned().references("id").inTable("users");
    table.decimal("total_price", 15, 2);
    table.decimal("total_discount", 15, 2);
    table.decimal("total_price_current", 15, 2);
    table.string("status");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable("orders");
};
