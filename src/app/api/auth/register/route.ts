import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres"

export async function POST(req: Request){
    try{
        const { username, email, password } = await req.json();

        console.log({username, email, password});

        const hashedPassword = await hash(password, 10);

        const result = await sql`
            INSERT INTO users (username, email, password)
            VALUES (${username}, ${email}, ${hashedPassword})
        `;

    } catch (err){
        console.error('Error', err)
    }
    return NextResponse.json({message: "successed"})
}