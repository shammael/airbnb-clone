import { Inter } from "next/font/google";
import Container from "@/components/Container";
import EmptyCategory from "@/components/EmptyCollection";
import getListings from "@/actions/getListings";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const listings = await getListings();
  if (listings.length === 0) {
    return <EmptyCategory showReset />;
  }

  console.log({ listings: JSON.stringify(listings, null, 2) });

  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 ">
        <div>
          {listings.map((listing: any) => {
            return <div key={listing.id}>{listing.presentation.title}</div>;
          })}
        </div>
      </div>
    </Container>
  );
}
