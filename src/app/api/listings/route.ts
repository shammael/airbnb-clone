import getCurentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { Schema } from "yup";
import prisma from "../../../libs/prismaDb";
export async function POST(req: Request) {
  const body = await req.json();
  const currentUser = await getCurentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const {
    category,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    imageSrc,
    cashValue,
    description,
  } = body;
}
