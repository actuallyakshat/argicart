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

function Header() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const jwt = sessionStorage.getItem("jwt");
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
    if (jwt) {
      setIsLoggedIn(true);
    }
  }, [jwt]);

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
                    src={
                      process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                      category?.attributes?.icon?.data[0]?.attributes?.url
                    }
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
          <h2 className="flex gap-2 items-center text-lg">
            <ShoppingBasket className="size-7" />{" "}
            <span className="bg-primary text-white px-2 rounded-full">
              {totalCartItems}
            </span>
          </h2>
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
