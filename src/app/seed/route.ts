import { db } from "@vercel/postgres";
import { todos } from "../lib/placeholder-data";

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