"use server"

import { db } from "@vercel/postgres"
import { Todo, TodoListCollection } from "./definitions";
import bcrypt from 'bcrypt';
import { FormSchema } from "./definitions";


// type loginRequest = {
//     email: string,
//     password: string
// }

export async function loginUser({email, password}:FormSchema) {

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

// export async function loginUser(formData: FormData) {
//     const email = formData.get('email') as string;
//     const password = formData.get('password') as string;
//     let client;
//     try {
//         client = await db.connect();
//         const data = await client.sql`
//             SELECT * FROM users
//             WHERE email = ${email}
//         `;
//         console.log('Login in back', data.rows);

//         const user = data.rows[0];
//         if (!user) {
//             throw new Error('User not found');
//         }

//         const passwordMatch = await bcrypt.compare(password, user.password);
//         if (!passwordMatch) {
//             throw new Error('Password does not match');
//         }

//         return {
//             user_id: user.user_id,
//             username: user.username,
//             email: user.email,
//         };
//     } catch (err) {
//         console.error('Error posting', err);
//         throw new Error('Error matching the data');
//     } finally {
//         client?.release();
//     }
// }


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


export async function getTodos(collection_id: number){
    let client;
    try {
        client = await db.connect();
        const data = await client.sql`
            SELECT * FROM todos
            WHERE collection_id = ${collection_id}
        ;`;

        const todos: Todo[] = data.rows.map(row => ({
            item_id: row.item_id,
            description: row.description,
            isDone: row.isdone,
            collection_id: row.collection_id
        }));
        return todos;
    } catch (err){
        console.error('Error fetching Todos:', err);
        throw new Error('Failed to fetch Todos');
    } finally {
        client?.release();
    }
}


export async function postTodo(formData: FormData, collection_id:number){
    const description = formData.get('description') as string;
    const isDone = 'false';
    let client;
    try {
        client = await db.connect();
        const data = await client.sql`
        INSERT INTO todos (description, isDone, collection_id)
        VALUES (${description}, ${isDone}, ${collection_id})
        RETURNING item_id, description, isDone, collection_id
        `
        console.log('Inserted data in back', data.rows);
        return data.rows.map((row:any)=>({
            item_id: row.item_id,
            description: row.description,
            isDone: row.isDone,
            collection_id: row.collection_id
        }))
    } catch (err){
        console.error('Error posting', err);
        throw new Error('Error inserting new data');
    } finally {
        client?.release();
    }
}


export async function putTodo(item_id: number, description: string){
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


export async function deleteTodo(item_id: number) {
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


export async function doneTodo(item_id: number, isDone:boolean) {
    let client;
    try {
        client = await db.connect();
        const data = await client.sql`
            UPDATE todos 
            SET isdone = ${isDone}
            WHERE item_id = ${item_id}
            RETURNING item_id, description, isdone;
        `
        console.log('Check changed', data.rows);
        return data.rows;
    } catch (err){
        console.error('Error deleting', err);
        throw new Error ('Error deleting data');
    } finally {
        client?.release();
    }
}


export async function getCollections(user_id: number){
    let client;
    try {
        client = await db.connect();
        const data = await client.sql`
            SELECT * FROM collections
            WHERE user_id = ${user_id}
        ;`;

        const collections: TodoListCollection[] = data.rows.map(row => ({
            collection_id: row.collection_id,
            collection_name: row.collection_name,
        }));
        return collections;
    } catch (err){
        console.error('Error fetching Collections:', err);
        throw new Error('Failed to fetch Collections');
    } finally {
        client?.release();
    }
}


export async function postCollection(formData: FormData, user_id: number){
    const collection_name= formData.get('collection_name') as string;
    let client;
    try {
        client = await db.connect();
        const data = await client.sql`
        INSERT INTO collections (collection_name, user_id)
        VALUES (${collection_name}, ${user_id})
        RETURNING collection_id, collection_name, user_id
        `
        console.log('Inserted data in back', data.rows);
        return data.rows.map((row:any)=>({
            collection_id: row.collection_id,
            collection_name: row.collection_name,
            user_id: row.user_id
        }))
    } catch (err){
        console.error('Error posting', err);
        throw new Error('Error inserting new data');
    } finally {
        client?.release();
    }
}


export async function putCollection(collection_id: number, collection_name: string){
    let client;
    try {
        client = await db.connect();
        const data = await client.sql`
        UPDATE collections
        SET collection_name = ${collection_name}
        WHERE collection_id = ${collection_id}
        RETURNING collection_id, collection_name
        `
        console.log('Inserted data in back', data.rows);
        return data.rows.map((row: any) =>({
            collection_id: row.collection_id,
            collection_name: row.collection_name,
        }))
    } catch (err) {
        console.error('Error putting', err);
        throw new Error ('Error editing data');
    } finally {
        client?.release();
    }
}


export async function deleteCollection(collection_id: number) {
    let client;
    try {
        client = await db.connect();
        const data = await client.sql`
            DELETE FROM collections WHERE collection_id = ${collection_id};
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

export async function getCollectionNameById(collection_id: number){
    let client;
    try {
        client = await db.connect();
        const data = await client.sql`
        SELECT collection_name 
        FROM collections
        WHERE collection_id = ${collection_id} 
        `
        return data.rows[0].collection_name;
    }catch(err){
        console.error('Error fetching collection name', err)
    }finally{
        client?.release();
    }

}



// export const updateTodoOrder = async (orderedTodos: Todo[]) => {
//     let client:any;
//     try {
//         client = await db.connect()
//         const data = orderedTodos.map((todo, index) => {
//             return client.sql`
//                 UPDATE todos
//                 SET order_index = ${index}
//                 WHERE item_id = ${todo.item_id}
//             `;
//         });
//         console.log('Generated SQL queries:', data);

//         for (const query of data) {
//             console.log('Executing query:', query.text);
//             await query;
//         }
//     } catch (err) {
//         console.error('Error updating todos order', err);
//     } finally {
//         client?.release();
//     }
// };