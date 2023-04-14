"use client";

import React, { InputHTMLAttributes } from "react";
import { BiDollar } from "react-icons/bi";

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
    <div className="w-full relative mt-3">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}
      <input
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        type={type}
        disabled={disabled}
        id={id}
        placeholder={placeholder}
        className={`peer w-ful p-4 pt-3 text-lg text-neutral-600 bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed w-full ${
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
