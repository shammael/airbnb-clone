"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import qs from "query-string";
import Image from "next/image";
import BeachIcon from "@/components/Category/icons/Beach";

interface Props {
  label: string;
  description: string;
  icon: any;
  selected?: boolean;
}

const CategoryBox = ({ description, icon: Icon, label, selected }: Props) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updateQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updateQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updateQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [params, label, router]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${
        selected
          ? "border-b-neutral-800 text-neutral-800"
          : "border-transparent text-neutral-500"
      }`}
    >
      <Icon
        width={30}
        height={30}
        className="fill-neutral-600 font-bold"
        // color="rgb(115 115 115 / var(--tw-text-opacity))"
      />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
