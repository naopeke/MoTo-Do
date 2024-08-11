"use server"

import { db } from "@vercel/postgres"
import { Todo } from "./definitions";

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