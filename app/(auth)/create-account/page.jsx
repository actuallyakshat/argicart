"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function CreateAccount() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const createAccountHandler = async (event) => {
    try {
      setLoading(true);
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const username = formData.get("username");
      const password = formData.get("password");
      const email = formData.get("email");
      const response = await GlobalApi.registerUser(username, email, password);
      sessionStorage.setItem("user", JSON.stringify(response.data.user));
      sessionStorage.setItem("jwt", response.data.jwt);
      console.log(response.data);
      router.push("/");
      toast("Account created successfully");
    } catch (error) {
      console.log("bhai hag diya", error);
      toast(error);
    }
    setLoading(false);
  };
  return (
    <div className="flex items-baseline justify-center my-20">
      <div className="flex flex-col items-center justify-center p-10 bg-slate-100 rounded-xl border border-gray-200">
        <h1 className="flex gap-2 items-center text-primary font-bold text-3xl mb-2">
          <ShoppingCart />
          <span className="space-x-1">
            Agri <span className="text-primary-complementary">Cart</span>
          </span>
        </h1>
        <h2 className="font-bold text-3xl">Create an Account</h2>
        <h3 className="text-gray-500">
          Enter your email and password to create an account
        </h3>
        <form
          className="flex flex-col gap-5 w-full my-4"
          onSubmit={createAccountHandler}
        >
          <Input placeholder="Username" name="username" required />
          <Input placeholder="Email" name="email" type="email" required />
          <Input
            placeholder="Password"
            type="password"
            name="password"
            required
          />
          <Button>{loading ? <LoadingSpinner /> : "Create an Account"}</Button>
          <p>
            Already have an account?{" "}
            <Link
              href={"/sign-in"}
              className="text-blue-500 hover:text-blue-600 transition-colors"
            >
              Click here to Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
