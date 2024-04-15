"use client";
import { Button } from "@/components/ui/button";
import { ShoppingBasket } from "lucide-react";
import Image from "next/image";
import React, { useContext, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { UpdateCartContext } from "../_context/UpdateCartContext";

function ProductItemDetail({ product }) {
  console.log("product is : ", product);
  const [loading, setLoading] = useState(false);
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);
  const router = useRouter();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [productTotalPrice, setProductTotalPrice] = useState(
    product?.attributes?.sellingPrice
      ? product?.attributes?.sellingPrice
      : product?.attributes?.mrp
  );
  const [quantity, setQuantity] = useState(1);
  const addToCart = async () => {
    setLoading(true);
    try {
      const jwt = sessionStorage.getItem("jwt");
      if (!jwt) {
        setLoading(false);
        router.push("/sign-in");
        return;
      }
      const data = {
        data: {
          product: product?.id,
          user_permissions_users: user?.id,
          amount: (productTotalPrice * quantity).toFixed(2),
          quantity,
          userId: user?.id,
        },
      };
      const response = await GlobalApi.addToCart(data, jwt);
      console.log(response);
      setUpdateCart(!updateCart);
      toast.success("Added to cart");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
    setLoading(false);
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 p-7">
      <Image
        src={product?.attributes?.images?.data[0]?.attributes?.url}
        alt={product?.attributes?.name}
        width={300}
        height={300}
        className="bg-slate-50 p-5 h-[320px] w-[300px] object-contain object-center rounded-lg"
      />
      <div className="text-black space-y-3">
        <h2 className="text-2xl font-bold">{product?.attributes?.name}</h2>
        <h2 className="text-sm text-gray-500">
          {product?.attributes?.description}
        </h2>
        <div className="flex gap-2 text-xl font-semibold">
          <h2 className="line-through text-gray-500">
            &#8377;{product?.attributes?.mrp}
          </h2>
          <h2>&#8377;{product?.attributes?.sellingPrice}</h2>
        </div>
        <h2 className="font-medium text-lg text-gray-700">
          Quantity: {product?.attributes?.itemQuantityType}
        </h2>
        <div className="flex gap-3 items-center">
          <div className="p-2 border flex items-center gap-10 w-fit px-3 font-semibold">
            <button
              disabled={quantity === 1}
              onClick={() => setQuantity(quantity - 1)}
            >
              -
            </button>
            <h2>{quantity}</h2>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
          <h2 className="font-bold text-2xl">
            = &#8377;{(quantity * productTotalPrice).toFixed(2)}
          </h2>
        </div>

        <Button
          className="flex items-center gap-3"
          disabled={loading}
          onClick={addToCart}
        >
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <ShoppingBasket /> Add to cart
            </>
          )}
        </Button>
        <h2 className="text-gray-700">
          <span className="font-medium">Category: </span>
          <span>
            {product?.attributes?.categories?.data[0]?.attributes?.name}
          </span>
        </h2>
      </div>
    </div>
  );
}

export default ProductItemDetail;
