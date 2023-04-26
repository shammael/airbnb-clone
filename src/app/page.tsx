import { Inter } from "next/font/google";
import Container from "@/components/Container";
import EmptyCategory from "@/components/EmptyCollection";
import getListings from "@/actions/getListings";
import getCurentUser from "@/actions/getCurrentUser";
import IListing from "@/interfaces/Listings";
import ListingCard from "@/components/ListingCard";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const listings = (await getListings()) as unknown as IListing[];
  const currentUser = await getCurentUser();
  if (listings.length === 0) {
    return <EmptyCategory showReset />;
  }

  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 ">
        {listings.map((listing) => {
          return (
            <ListingCard
              //@ts-ignore
              user={currentUser}
              listing={{
                ...listing,
                createdAt: listing.createdAt.toString(),
              }}
              key={listing.id}
            />
          );
        })}
      </div>
    </Container>
  );
}
