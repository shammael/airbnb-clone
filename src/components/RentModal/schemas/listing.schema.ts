import * as yup from "yup";

const listingSchema = yup.object().shape({
  category: yup.string().required(),
  location: yup
    .tuple([yup.number().label("latitude"), yup.number().label("longitude")])
    .required(),
  guestCount: yup.number().required(),
  roomCount: yup.number().required(),
  bathroomCount: yup.number().required(),
  imageSrc: yup.string().required(),
  exchange: yup
    .object({
      currency: yup.string().required(),
      price: yup.number().required().min(1),
    })
    .required(),
  presentation: yup
    .object({
      description: yup.string().required(),
      title: yup.string().required(),
    })
    .required(),
});

export default listingSchema;
