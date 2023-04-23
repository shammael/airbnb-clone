import Select from "react-select";
import styles from "./style.module.css";
import CurrencyFormat from "react-currency-format";
import { useState } from "react";

const supportedCurrency: { label: string; value: string }[] = [
  {
    label: "USD",
    value: "US Dollar",
  },
  {
    label: "EUR",
    value: "Euro",
  },
  {
    label: "BS",
    value: "Bolívares",
  },
];

interface Props {
  onChange: (value: {
    currency: { value: string; label: string };
    price: string;
  }) => void;
  exchange: {
    value: { value: string; label: string };
    price: string;
  };
}

const Currency = ({ exchange, onChange }: Props) => {
  const [currency, setCurrency] = useState<{ value: string; label: string }>(
    { ...exchange.value } || { value: "US Dollar", label: "USD" }
  );
  return (
    <div className="flex flex-col">
      <label
        htmlFor="description"
        className="text-lg font-semibold text-neutral-500"
      >
        Price
      </label>
      <div className="flex w-full text-lg text-neutral-600 bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed">
        <Select
          options={supportedCurrency}
          className={styles.currency}
          defaultValue={{ value: "US Dollar", label: "USD" }}
          onChange={(value) =>
            setCurrency({
              label: value?.label as string,
              value: value?.value as string,
            })
          }
          value={currency}
        />
        <CurrencyFormat
          className="w-full text-end outline-none flex justify-end items-end px-2"
          thousandSeparator={true}
          allowNegative={false}
          fixedDecimalScale={true}
          onChange={(value: any) =>
            onChange({ currency, price: value.target.value })
          }
        />
      </div>
    </div>
  );
};

export default Currency;
