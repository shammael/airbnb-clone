"use client";
import Container from "../Container";
import CategoryBox from "./CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import categories from "./data/categories";

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";
  if (!isMainPage) {
    return null;
  }
  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-scroll scrollbar">
        {categories.map((cat, index) => (
          <CategoryBox
            key={index}
            description={cat.description}
            icon={cat.icon}
            label={cat.label}
            selected={category === cat.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
