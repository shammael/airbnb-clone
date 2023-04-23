"use client";

import DollarIcon from "@/icons/Dolar.icon";
import React, { InputHTMLAttributes } from "react";

interface Props
  extends Pick<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "disabled" | "id" | "onChange" | "onBlur"
  > {
  formatPrice?: boolean;
  error?: boolean;
  placeholder: string;
  name: string;
}

const Input = ({
  type = "text",
  formatPrice,
  disabled = false,
  id,
  error,
  placeholder,
  onChange,
  name,
  onBlur,
}: Props) => {
  return (
    <div className="w-full relative mt-3 flex justify-center items-center">
      {formatPrice && (
        <DollarIcon className="h-10 w-10 text-neutral-500 absolute top-5 left-2" />
      )}
      <input
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        type={type}
        disabled={disabled}
        id={id}
        placeholder={placeholder}
        className={`peer p-4 pt-3 text-lg text-neutral-600 bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed w-full my-auto ${
          formatPrice ? "pl-9" : "pl-4"
        } ${
          error
            ? "border-rose-500 focus:border-rose-500"
            : "focus:border-black/50 border-neutral-300"
        }`}
      />
    </div>
  );
};

export default Input;
