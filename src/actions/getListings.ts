import prisma from "../libs/prismaDb";

export default async function getListings() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        bathroomCount: true,
        category: true,
        createdAt: true,
        presentation: {
          select: {
            description: true,
            title: true,
          },
        },
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

    return listings;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
