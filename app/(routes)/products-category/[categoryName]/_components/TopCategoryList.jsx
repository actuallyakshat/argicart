import { formatParamUrl } from "@/lib/functions/formatParamUrl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function TopCategoryList({ categoryList, selectedCategory }) {
  return (
    <div className="flex gap-4 mt-2 justify-center mx-7 md:mx-20 overflow-auto">
      {categoryList?.map((category) => (
        <Link
          href={`/products-category/${category?.attributes?.name}`}
          key={category?.id}
          className={`flex flex-col w-[150px] justify-center items-center gap-2 ${
            formatParamUrl(selectedCategory) == category?.attributes?.name
              ? "bg-green-600 text-white"
              : "bg-green-50 hover:bg-green-100 text-green-700"
          } rounded-lg p-3 group cursor-pointer transition-colors`}
        >
          <Image
            src={category?.attributes?.icon?.data[0]?.attributes?.url}
            width={50}
            height={50}
            alt="icon"
            className="group-hover:scale-110 transition-all ease-in-out"
          />
          <h2 className="text-center font-medium">
            {category?.attributes?.name}
          </h2>
        </Link>
      ))}
    </div>
  );
}
