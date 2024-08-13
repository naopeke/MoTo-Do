import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    console.log({ email, password });
  } catch (err) {
    console.log({ err });
  }

  return NextResponse.json({ message: "success" });
}