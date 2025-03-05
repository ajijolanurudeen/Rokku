import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

const db = knex({
  client: "sqlite3",
  connection: {
    filename: process.env.DATABASE_URL || "./database.sqlite",
  },
  useNullAsDefault: true,
});

export default db;
