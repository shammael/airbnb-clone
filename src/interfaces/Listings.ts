import { Exchange, Listing, Location } from "@prisma/client";

interface IListing extends Listing {
  location: Location;
  exchange: Exchange;
}

export type SafeListing = Omit<IListing, "createdAt" | "updatedAt"> & {
  createdAt: string;
};

export default IListing;
