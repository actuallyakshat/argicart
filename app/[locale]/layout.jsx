"use client";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { Toaster } from "@/components/ui/sonner";
import { UpdateCartProvider } from "./_context/UpdateCartContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <PayPalScriptProvider
      options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}
    >
      <html lang="en">
        <body className={outfit.className}>
          <UpdateCartProvider>
            <Toaster />
            <Header />
            {children}
          </UpdateCartProvider>
        </body>
      </html>
    </PayPalScriptProvider>
  );
}
