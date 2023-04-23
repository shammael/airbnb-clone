"use client";

import MinusIcon from "@/icons/Minus.icon";
import PlusIcon from "@/icons/Plus.icon";
import { useCallback } from "react";

interface Props {
  title: string;
  subtitle: string;
  value: number;
  onchange: (value: number) => void;
  flatReduce?: boolean;
}

const Counter = ({ onchange, subtitle, title, value, flatReduce }: Props) => {
  const onAdd = useCallback(() => {
    onchange(value + 1);
  }, [onchange, value]);

  const onReduce = useCallback(() => {
    if (value === 1 && !flatReduce) return;
    if (value === 0) return;
    onchange(value - 1);
  }, [onchange, value, flatReduce]);

  return (
    <div className="flex felx-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="text-gray-600">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={onReduce}
          className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
        >
          <PlusIcon />
        </div>
        <div className="text-xl text-neutral-600">{value}</div>
        <div
          onClick={onAdd}
          className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
        >
          <MinusIcon />
        </div>
      </div>
    </div>
  );
};

export default Counter;
