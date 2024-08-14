import { db } from "@vercel/postgres";
import { todos, users, collections } from "../lib/placeholder-data";
import bcrypt from 'bcrypt';

async function seedUsers() {
  const client = await db.connect();

  try {
    await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      );
    `;

    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
          INSERT INTO users (username, email, password)
          VALUES (${user.username}, ${user.email}, ${hashedPassword})
          ON CONFLICT (email) DO NOTHING;
        `;
      }),
    );
    return insertedUsers;
  } finally {
    client.release();
  }
}


async function seedCollections() {
  const client = await db.connect();

  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
     CREATE TABLE IF NOT EXISTS collections (
      collection_id SERIAL PRIMARY KEY,
      collection_name VARCHAR(255),
      user_id INTEGER,
       CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
        REFERENCES users(user_id)
        ON DELETE CASCADE
    );
    `;

    const insertedCollections = await Promise.all(
      collections.map((collection) => client.sql`
        INSERT INTO collections (collection_name)
        VALUES (${collection.collection_name})
        ON CONFLICT (collection_id) DO NOTHING
        `
      )
    );
    return insertedCollections;
  } finally {
    client.release();
  }
}


async function seedTodos() {
  const client = await db.connect();

  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
     CREATE TABLE IF NOT EXISTS todos (
      item_id SERIAL PRIMARY KEY,
      description VARCHAR(255) NOT NULL,
      isDone BOOLEAN NOT NULL,
      collection_id INTEGER
      CONSTRAINT fk_collection
        FOREIGN KEY(collection_id) 
        REFERENCES collection(collection_id)
        ON DELETE CASCADE
    );
    `;

    const insertedTodos = await Promise.all(
      todos.map((todo) => client.sql`
        INSERT INTO todos (description, isDone)
        VALUES (${todo.description}, ${todo.isDone})
        ON CONFLICT (item_id) DO NOTHING
        `
      )
    );
    return insertedTodos;
  } finally {
    client.release();
  }
}

export async function GET() {
  const client = await db.connect();

  try {
    await client.sql`BEGIN`;
    await seedUsers();
    await seedTodos();
    await client.sql`COMMIT`;

    return Response.json({ message: `Database seeded successfully` });
 
  } catch (err) {
    await client.sql`ROLLBACK`;
    return Response.json({ err }, { status: 500 });

  } finally {
    client.release();
  }
}