"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  CircleUserRound,
  Search,
  ShoppingBasket,
  ShoppingCart,
} from "lucide-react";
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
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { UpdateCartContext } from "../_context/UpdateCartContext";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CartItemList from "./CartItemList";

function Header() {
  const user =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("user"))
      : null;
  const jwt =
    typeof window !== "undefined" ? sessionStorage.getItem("jwt") : null;
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);
  const [categoryList, setCategoryList] = useState([]);
  const [cartItemsList, setCartItemsList] = useState([]);
  const [totalCartItems, setTotalCartItems] = useState(0);
  const isLogin = sessionStorage.getItem("jwt") ? true : false;
  const showHeader =
    pathname === "/sign-in" || pathname === "/create-account" ? false : true;

  useEffect(() => {
    getCategoriesList();
  }, []);

  useEffect(() => {
    console.log(categoryList);
  }, [categoryList]);

  useEffect(() => {
    if (jwt) {
      setIsLoggedIn(true);
    }
  }, [jwt]);

  const [subtotal, setSubTotal] = useState(0);
  useEffect(() => {
    let total = 0;
    cartItemsList?.forEach((element) => {
      total += element?.amount;
    });
    const roundedOffTotal = total.toFixed(2);
    setSubTotal(roundedOffTotal);
  }, []);

  const signOut = () => {
    sessionStorage.clear();
    router.push("/sign-in");
    toast("Logged out successfully");
  };

  const getCartItems = async () => {
    const cartItemsList_ = await GlobalApi.getCartItems(user?.id, jwt);
    setTotalCartItems(cartItemsList_?.length);
    setCartItemsList(cartItemsList_);
    console.log(cartItemsList_);
  };

  useEffect(() => {
    getCartItems();
  }, [updateCart, isLoggedIn]);

  function getCategoriesList() {
    GlobalApi.getCategories().then((res) => {
      setCategoryList(res?.data?.data);
      console.log(res?.data?.data);
    });
  }

  if (!showHeader) return null;

  return (
    <div className="p-5 shadow-md flex justify-between">
      <div className="flex items-center gap-8">
        <Link href="/" className="font-black text-primary flex gap-2 text-xl">
          <ShoppingCart />
          <div className="space-x-1">
            <span>Agri</span>
            <span className="text-primary-complementary">Cart</span>
          </div>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <h2 className="hidden md:flex items-center py-2 px-10 bg-slate-100 gap-2 rounded-full font-medium cursor-pointer">
              <LayoutGrid /> Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Browse Categories</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categoryList?.map((category) => (
              <DropdownMenuItem key={category?.id} className="cursor-pointer">
                <Link
                  href={`/products-category/${category?.attributes?.name}`}
                  className="flex items-center gap-3"
                >
                  <Image
                    unoptimized={true}
                    src={category?.attributes?.icon?.data[0]?.attributes?.url}
                    width={27}
                    height={27}
                    alt="icon"
                  />
                  <h2>{category?.attributes?.name}</h2>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="hidden md:flex border rounded-full gap-2 p-2">
          <Search />
          <input type="text" placeholder="Search" className="outline-none" />
        </div>
      </div>
      <div className="flex items-center gap-5">
        {isLoggedIn && (
          <Sheet>
            <SheetTrigger>
              <h2 className="flex gap-2 items-center text-lg">
                <ShoppingBasket className="size-7" />{" "}
                <span className="bg-primary text-white px-2 rounded-full">
                  {totalCartItems}
                </span>
              </h2>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="font-black text-xl mt-4">
                  Your Cart
                </SheetTitle>
                <SheetDescription>
                  <CartItemList
                    cartItemList={cartItemsList}
                    getCartItems={getCartItems}
                  />
                </SheetDescription>
              </SheetHeader>
              <SheetClose asChild>
                <div className="absolute bottom-6 w-[90%] flex flex-col gap-3">
                  <h2 className="text-lg text-black font-bold flex justify-between items-center">
                    Subtotal: &#8377;{subtotal}
                  </h2>
                  <Button
                    onClick={() => router.push(jwt ? "/checkout" : "/sign-in")}
                  >
                    View Cart
                  </Button>
                </div>
              </SheetClose>
            </SheetContent>
          </Sheet>
        )}
        {!isLogin ? (
          <Link href="/sign-in">
            <Button>Login</Button>
          </Link>
        ) : (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <CircleUserRound className="size-12 cursor-pointer rounded-full bg-green-100 text-primary p-2" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>My Orders</DropdownMenuItem>
              <DropdownMenuItem asChild>
                <button onClick={signOut} className="w-full">
                  Logout
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}

export default Header;
