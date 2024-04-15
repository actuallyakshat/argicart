'use client';
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

export const CategoryList = ({ categoryList }) => {
  const { t } = useTranslation();
  return (
    <div>
      <h2 className="text-2xl font-black mt-5 text-green-600">
        {t('shop_by_category')}
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {categoryList?.map((category) => (
          <Link
            href={`/products-category/${category?.attributes?.name}`}
            key={category?.id}
            className="flex flex-col items-center gap-2 bg-green-50 rounded-lg p-3 mt-2 group cursor-pointer hover:bg-green-100 transition-colors"
          >
            <Image
              src={category?.attributes?.icon?.data[0]?.attributes?.url}
              width={50}
              height={50}
              alt="icon"
              className="group-hover:scale-110 transition-all ease-in-out"
            />
            <h2 className="text-center text-green-700 font-medium">
              {category?.attributes?.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};
