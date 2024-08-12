import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres"

export async function POST(req: Request){
    try{
        const { email, password } = await req.json();

        const hashedPassword = await hash(password, 10);

        const result = await sql`
            INSERT INTO users (username, email, password)
            VALUES (${email}, ${hashedPassword})
        `;

    } catch (err){
        console.error('Error', err)
    }
    return NextResponse.json({message: "successed"})
}