/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("addresses", (table) => {
      table.increments("id").primary();
      table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
      table.string("street").notNullable();
      table.string("city").notNullable();
      table.string("state").notNullable();
      table.string("zip").notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("addresses");
  };