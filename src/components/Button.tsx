"use client";

import React, { SVGProps } from "react";

interface Props {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: {
    element: React.FC<SVGProps<SVGSVGElement>>;
    properties: SVGProps<SVGSVGElement>;
  };
  type?: "button" | "reset" | "submit";
}

const Button = ({
  label,
  onClick,
  disabled,
  icon,
  outline,
  small,
  type,
}: Props) => {
  let Icon;
  if (icon) {
    Icon = icon.element;
  }
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full ${
        outline
          ? "bg-white border-black text-black"
          : "bg-rose-500 border-rose-500 text-white"
      } ${
        small
          ? "py-1 text-sm font-light border-[1px]"
          : "border-2 py-3 text-md font-semibold"
      }`}
    >
      {Icon && (
        <Icon
          {...icon?.properties}
          className="absolute left-4 top-3 w-[20px] h-[20px]"
        />
      )}
      {label}
    </button>
  );
};

export default Button;
