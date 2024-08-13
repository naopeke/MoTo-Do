"use server"

import { db } from "@vercel/postgres"
import { Todo } from "./definitions";
import bcrypt from 'bcrypt';

export async function loginUser(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    let client;
    try {
        client = await db.connect();
        const data = await client.sql`
            SELECT * FROM users
            WHERE email = ${email}
        `;
        console.log('Login in back', data.rows);

        const user = data.rows[0];
        if (!user) {
            throw new Error('User not found');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Password does not match');
        }

        return {
            user_id: user.user_id,
            username: user.username,
            email: user.email,
        };
    } catch (err) {
        console.error('Error posting', err);
        throw new Error('Error matching the data');
    } finally {
        client?.release();
    }
}


export async function registerUser(formData: FormData) {
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    let client;

    try {
        client = await db.connect();
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = await client.sql`
            INSERT INTO users (username, email, password)
            VALUES (${username}, ${email}, ${hashedPassword})
            RETURNING user_id, email
        `;

        console.log('User created:', data.rows[0]);

        return data.rows[0];
    } catch (err) {
        console.error('Error creating user:', err);
        throw new Error('Error creating user');
    } finally {
        client?.release();
    }
}


export async function getTodos(){
    let client;
    try {
        client = await db.connect();
        const data = await client.sql`
            SELECT * FROM todos;    
        `;

        const todos: Todo[] = data.rows.map(row => ({
            item_id: row.item_id,
            description: row.description,
            isDone: row.isDone
        }));
        return todos;
    } catch (err){
        console.error('Error fetching Todos:', err);
        throw new Error('Failed to fetch Todos');
    } finally {
        client?.release();
    }
}


export async function postTodo(formData: FormData){
    const description = formData.get('description') as string;
    const isDone = 'false';
    let client;
    try {
        client = await db.connect();
        const data = await client.sql`
        INSERT INTO todos (description, isDone)
        VALUES (${description}, ${isDone})
        RETURNING item_id
        `
        console.log('Inserted data in back', data.rows);
        return data.rows.map((row:any)=>({
            item_id: row.item_id,
            description: row.description,
            isDone: row.isDone
        }))
    } catch (err){
        console.error('Error posting', err);
        throw new Error('Error inserting new data');
    } finally {
        client?.release();
    }
}


export async function putTodo(item_id: string, description: string){
    let client;
    try {
        client = await db.connect();
        const data = await client.sql`
        UPDATE todos
        SET description = ${description}
        WHERE item_id = ${item_id}
        RETURNING item_id, description, isDone
        `
        console.log('Inserted data in back', data.rows);
        return data.rows.map((row: any) =>({
            item_id: row.item_id,
            description: row.description,
            isDone: row.isdone
        }))
    } catch (err) {
        console.error('Error putting', err);
        throw new Error ('Error editing data');
    } finally {
        client?.release();
    }
}


export async function deleteTodo(item_id: string) {
    let client;
    try {
        client = await db.connect();
        const data = await client.sql`
            DELETE FROM todos WHERE item_id = ${item_id};
        `
        console.log('Deleted', data.rows);
        return { message: 'deleted'}
    } catch (err){
        console.error('Error deleting', err);
        throw new Error ('Error deleting data');
    } finally {
        client?.release();
    }
}