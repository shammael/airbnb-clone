import Counter from "../Counter";
import Heading from "../Heading";
import CommonProps from "./interface/CommonProps";

type Property = "guestCount" | "roomCount" | "bathroomCount";

interface Props extends CommonProps<Property, number> {}

const ModalCounter = ({ onChange, values }: Props) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Share some basics about your place"
        subtitle="What aminities do you have ?"
      />
      <Counter
        title="Guest"
        subtitle="How many guest do you allow ?"
        onchange={(value) => {
          onChange("guestCount", value);
        }}
        value={values.guestCount}
      />
      <hr />
      <Counter
        title="Rooms"
        subtitle="How many rooms do you have?"
        onchange={(value) => {
          onChange("roomCount", value);
        }}
        value={values.roomCount}
      />
      <hr />
      <Counter
        title="Bathrooms"
        subtitle="How many bathrooms do you have?"
        onchange={(value) => {
          onChange("bathroomCount", value);
        }}
        value={values.bathroomCount}
        flatReduce
      />
    </div>
  );
};

export default ModalCounter;
