import { InferType } from "yup";
import listingSchema from "../schemas/listing.schema";

export type Listing = Omit<InferType<typeof listingSchema>, "location"> & {
  location: [number, number];
};
