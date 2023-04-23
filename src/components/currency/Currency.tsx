import { IconType } from "react-icons";
import { BiDollar, BiEuro } from "react-icons/bi";
import Select from "react-select";
import styles from "./style.module.css";
import CurrencyFormat from "react-currency-format";
import { useState } from "react";

const supportedCurrency: { label: string; value: string }[] = [
  {
    label: "$",
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
    price: number;
  }) => void;
  exchange: {
    value: { value: string; label: string };
    price: string;
  };
}

const Currency = ({ exchange, onChange }: Props) => {
  const [currency, setCurrency] = useState({ value: "US Dollar", label: "$" });
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
          defaultValue={{ value: "US Dollar", label: "$" }}
          onChange={(value) =>
            setCurrency({
              label: value?.label as string,
              value: value?.value as string,
            })
          }
          value={currency}
        />
        {/* <input className="w-full text-end outline-none flex justify-end items-end px-2" /> */}
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
