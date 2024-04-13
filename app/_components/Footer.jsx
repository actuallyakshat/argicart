import { ShoppingCart } from "lucide-react";
import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center text-primary sm:justify-start">
            <h1 className="font-bold text-2xl flex gap-2 items-center">
              <ShoppingCart />
              <div>
                Agri <span className="text-primary-complementary">Cart</span>
              </div>
            </h1>
          </div>

          <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
            Copyright &copy; 2024. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
