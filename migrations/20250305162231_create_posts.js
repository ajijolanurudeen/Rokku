/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("posts", (table) => {
      table.increments("id").primary();
      table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
      table.string("title").notNullable();
      table.text("body").notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("posts");
  };
