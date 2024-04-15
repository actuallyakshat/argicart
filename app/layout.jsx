"use client";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { Toaster } from "@/components/ui/sonner";
import { UpdateCartContext } from "./_context/UpdateCartContext";
import { useState } from "react";
const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [updateCart, setUpdateCart] = useState();
  return (
    <html lang="en">
      <body className={outfit.className}>
        <UpdateCartContext.Provider value={{ updateCart, setUpdateCart }}>
          <Toaster />
          <Header />
          {children}
        </UpdateCartContext.Provider>
      </body>
    </html>
  );
}
