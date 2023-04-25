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
  onChange: (value: { currency: string; price: number }) => void;
  exchange: {
    currency: string;
    price: number;
  };
}

const Currency = ({ exchange, onChange }: Props) => {
  const [transaction, setTransaction] = useState<{
    currency: string;
    price: number;
  }>(
    exchange
      ? exchange
      : {
          currency: "USD",
          price: 0.0,
        }
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
          defaultValue={supportedCurrency.find(
            (curr) => curr.label === transaction.currency
          )}
          onChange={(value) => {
            onChange({
              currency: value!.label,
              price: transaction.price,
            });
            setTransaction({
              currency: value!.label,
              price: parseFloat(transaction.price.toFixed(2)),
            });
          }}
          value={supportedCurrency.find(
            (curr) => curr.label === transaction.currency
          )}
        />
        <CurrencyFormat
          className="w-full text-end outline-none flex justify-end items-end px-2"
          thousandSeparator={true}
          allowNegative={false}
          fixedDecimalScale={true}
          onChange={(e: any) => {
            setTransaction({ ...transaction, price: e.target.value });
            onChange({
              ...transaction,
              price: e.target.value,
            });
          }}
          value={exchange.price}
        />
      </div>
    </div>
  );
};

export default Currency;
