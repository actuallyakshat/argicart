import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { Toaster } from "@/components/ui/sonner";
import { UpdateCartProvider } from "./_context/UpdateCartContext";
const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <UpdateCartProvider>
          <Toaster />
          <Header />
          {children}
        </UpdateCartProvider>
      </body>
    </html>
  );
}
