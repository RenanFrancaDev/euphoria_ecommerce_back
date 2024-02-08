/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable("address", (table) => {
    table.bigIncrements("id");
    table.bigint("user_id").unsigned().references("id").inTable("users");
    table.string("cep");
    table.string("street");
    table.string("neighborhood");
    table.string("number");
    table.string("complement");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable("address");
};
