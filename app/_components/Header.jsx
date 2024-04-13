"use client";
import React, { useEffect, useState } from "react";
import { Search, ShoppingBag, ShoppingCart } from "lucide-react";
import { LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GlobalApi from "../_utils/GlobalApi";
import Image from "next/image";

function Header() {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    getCategoriesList();
  }, []);

  //   useEffect(() => {
  //     {
  //       categoryList?.map((category) => {
  //         console.log(category?.attributes?.icon?.data[0]?.attributes?.url);
  //       });
  //     }
  //   }, [categoryList]);

  function getCategoriesList() {
    GlobalApi.getCategories().then((res) => {
      setCategoryList(res?.data?.data);
      console.log(res?.data?.data);
    });
  }
  return (
    <div className="p-5 shadow-md flex justify-between">
      <div className="flex items-center gap-8">
        <h1 className="font-black text-primary flex gap-2 text-xl">
          <ShoppingCart />
          <div className="space-x-1">
            <span>Agri</span>
            <span className="text-primary-complementary">Cart</span>
          </div>
        </h1>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <h2 className="hidden md:flex items-center py-2 px-10 bg-slate-100 gap-2 rounded-full font-medium cursor-pointer">
              <LayoutGrid /> Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Browse Categories</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categoryList.map((category) => (
              <DropdownMenuItem
                key={category?.id}
                className="cursor-pointer flex gap-3"
              >
                <Image
                  unoptimized={true}
                  src={
                    process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                    category?.attributes?.icon?.data[0]?.attributes?.url
                  }
                  width={27}
                  height={27}
                  alt="icon"
                />
                <h2>{category?.attributes?.name}</h2>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="hidden md:flex border rounded-full gap-2 p-2">
          <Search />
          <input type="text" placeholder="Search" className="outline-none" />
        </div>
      </div>
      <div className="flex gap-5">
        <h2 className="flex gap-2 items-center text-lg">
          <ShoppingBag /> 0
        </h2>
        <Button>Login</Button>
      </div>
    </div>
  );
}

export default Header;
