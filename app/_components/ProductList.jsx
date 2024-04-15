import React from "react";
import ProductItem from "./ProductItem";

export const ProductList = ({ productList }) => {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-black mt-5 text-green-600">
        Our Popular Products
      </h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {productList?.length > 0 &&
          productList?.map(
            (product, index) =>
              index < 8 && (
                <div key={product?.id}>
                  <ProductItem product={product} />
                </div>
              )
          )}
      </div>
      {productList?.length < 1 && (
        <h2 className="text-3xl text-gray-500 font-bold">
          We currently don't have any products to display here.
        </h2>
      )}
    </div>
  );
};
