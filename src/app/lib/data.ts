// import { db } from '@vercel/postgres';
// import { Todo } from './definitions';

// export async function fetchTodos (){
//     let client;

//     try {
//         client = await db.connect();
//         const data = await client.sql`
//             SELECT * FROM todos`;
//         console.log(data.rows);
//         return data.rows;

//     }catch(err){
//         console.error('Error fetching Todos', err);
//     }finally {
//         client?.release();
//     }
// }