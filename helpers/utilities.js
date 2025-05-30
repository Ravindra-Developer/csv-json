const pool = require('./db');

async function initTableIfNotExists() {
  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS public.users (
        name varchar NOT NULL,
        age int4 NOT NULL,
        address jsonb NULL,
        additional_info jsonb NULL,
        id serial4 NOT NULL,
        CONSTRAINT users_pkey PRIMARY KEY (id)
      );
    `;
  await pool.query(createTableQuery);
}


module.exports = { initTableIfNotExists };