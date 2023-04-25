import getCurentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
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
    exchange,
    description,
  } = body;

  const result = await prisma.listing.create({
    data: {
      bathroomCount,
      location: {
        create: {
          latlng: location,
        },
      },
      category,
      description,
      guestCount,
      imageSrc,
      roomCount,
      exchange: {
        create: {
          currency: exchange.currency,
          price: parseFloat(exchange.price),
        },
      },
      userId: currentUser.id,
    },
    select: {
      bathroomCount: true,
      category: true,
      createdAt: true,
      description: true,
      exchange: {
        select: {
          currency: true,
          price: true,
        },
      },
      user: {
        select: {
          name: true,
          email: true,
          id: true,
          image: true,
        },
      },
      location: {
        select: {
          latlng: true,
        },
      },
    },
  });

  console.log({ result });

  return NextResponse.json(result);
}
