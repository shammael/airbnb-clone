import Currency from "../currency/Currency";
import Heading from "../Heading";
import CommonProps from "./interface/CommonProps";

interface Props
  extends CommonProps<"exchange", { currency: string; price: number }> {}

const Price = ({ onChange, values }: Props) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Now set your price"
        subtitle="How do you charge a night"
      />
      <Currency
        exchange={{
          currency: values.exchange.currency,
          price: values.exchange.price,
        }}
        onChange={(value) =>
          onChange("exchange", {
            currency: value.currency,
            price: value.price,
          })
        }
      />
    </div>
  );
};

export default Price;
