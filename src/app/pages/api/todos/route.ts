import { sql, db } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(req: Request){
    const client = await db.connect();

    const {rows: todos} = await client.sql`
        SELECT * FROM todos;
    `;
    client.release();
    return NextResponse.json(todos);
}