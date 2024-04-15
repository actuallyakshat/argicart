"use client";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import { toast } from "sonner";

export default function CartItemList({ cartItemList, getCartItems }) {
  const user =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("user"))
      : null;
  const jwt =
    typeof window !== "undefined" ? sessionStorage.getItem("jwt") : null;

  const deleteItemHandler = async (id, jwt) => {
    const response = await GlobalApi.deleteCartItem(id, jwt);
    console.log(response);
    if (response.status == 200) {
      toast.success("Item deleted");
      await getCartItems();
    }
  };

  return (
    <div className="mt-4">
      <div className="space-y-5 h-[70vh] overflow-y-auto">
        {cartItemList?.map((cartItem, index) => (
          <div key={cartItem?.id}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Image
                  src={cartItem?.image}
                  alt={cartItem.name}
                  width={70}
                  height={70}
                  className="border rounded-xl w-[100px] p-2 object-contain"
                />
                <div>
                  <h2 className="font-black">{cartItem?.name}</h2>
                  <h2>Quantity: {cartItem?.quantity}</h2>
                  <h2 className="text-lg font-bold">
                    Price: &#8377;{cartItem?.amount}
                  </h2>
                </div>
              </div>

              <TrashIcon
                onClick={() => deleteItemHandler(cartItem?.id, jwt)}
                className="cursor-pointer hover:text-black transition-colors"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
