import { db } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    let client;

    try {
        client = await db.connect();

        const data = await client.sql`
            SELECT * FROM todos;
        `;
        
        const todos = data.rows.map(row => ({
            item_id: row.item_id,
            description: row.description,
            isDone: row.isdone,
        }));

        return NextResponse.json(todos, {status: 201});

    } catch (err) {
        console.error("Failed to fetch todos:", err);
        return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 });
    } finally {
        if (client) client.release();
    }
}

// add
export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const description = formData.get('description') as string | null;
    const isDone = 'false';
    // const isDone = formData.get('isDone') === 'true' ? true : false;
    let client;

    try {
        client = await db.connect();
        const data = await client.sql`
            INSERT INTO todos (description, isDONE)
            VALUES (${description}, ${isDone})
            RETURNING item_id
        `;

        return NextResponse.json(data.rows, {status:201})
    } catch (err) {
        console.error('Error inserting the data', err);
        return NextResponse.json({error: 'Error inserting the item'}, { status: 500})
    } finally {
        client?.release();
    }
}

// update
export async function PUT(item_id: string, description: string){
    let client;

    try {

        client = await db.connect();
        const data = await client.sql`
            UPDATE todos (description)
            SET description = ${description}
            WHERE item_id = ${item_id}
            RETURNING item_id, description
        `
        return NextResponse.json(data.rows, {status: 500})

    } catch (err) {
        console.error('Error updating the data');
        return NextResponse.json({error: 'Error updating the data'}, {status: 500})
    } finally {
        client?.release();
    }
}

export async function DELETE(item_id: string) {
    let client;

    try {
        client = await db.connect()
        const data = await client.sql`
            DELETE FROM todos WHERE item_id = ${item_id}
        `;
        return NextResponse.json ({message: 'Deleted the data'})
    } catch (err) {
        console.error('Error deleting the data', err)
    } finally {
        client?.release();
    }
}