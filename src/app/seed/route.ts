import { db } from "@vercel/postgres";
import bcrypt from 'bcrypt';
import { todos, users } from "../lib/placeholder-data";

async function seedUsers() {
  const client = await db.connect();

  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
          INSERT INTO users (user_id, username, email, password)
          VALUES (${user.user_id}, ${user.username}, ${user.email}, ${hashedPassword})
          ON CONFLICT (user_id) DO NOTHING;
        `;
      }),
    );
    return insertedUsers;
  } catch (err){
    console.error('Error seeding', err)
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
      isDone BOOLEAN NOT NULL
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