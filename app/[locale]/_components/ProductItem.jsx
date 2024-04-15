import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductItemDetail from "./ProductItemDetail";

const ProductItem = ({ product }) => {
  return (
    <div className="p-2 lg:p-6 h-full pb-3 flex flex-col items-center justify-center gap-3 rounded-lg border hover:scale-105 hover:shadow-md transition-all ease-in-out duration-300 cursor-pointer">
      <Image
        src={product?.attributes?.images?.data[0]?.attributes?.url}
        alt={product?.attributes?.name}
        width={500}
        height={200}
        className="h-[200px] w-[200px] object-contain"
      />

      <h2 className="text-center font-bold">{product?.attributes?.name}</h2>
      <div className="flex gap-2 font-medium">
        <h2 className="line-through text-gray-500">
          &#8377;{product?.attributes?.mrp}
        </h2>
        <h2>&#8377;{product?.attributes?.sellingPrice}</h2>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="font-medium">
            Add to cart
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <ProductItemDetail product={product} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductItem;
