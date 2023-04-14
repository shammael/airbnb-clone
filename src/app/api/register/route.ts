import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismaDb";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, name, password } = body;

  const userDB = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (userDB) {
    throw new Error("Email not available");
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      email,
      hashedPassword,
      name,
    },
  });

  return NextResponse.json(user);
}
