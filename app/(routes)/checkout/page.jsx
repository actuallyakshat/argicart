"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { ArrowBigRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Checkout() {
  const router = useRouter();
  const [cartItemsList, setCartItemsList] = useState([]);
  const [zip, setZip] = useState();
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const user =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("user"))
      : null;
  const jwt =
    typeof window !== "undefined" ? sessionStorage.getItem("jwt") : null;
  const getCartItems = async () => {
    const cartItemsList_ = await GlobalApi.getCartItems(user?.id, jwt);
    setTotalCartItems(cartItemsList_?.length);
    setCartItemsList(cartItemsList_);
    console.log(cartItemsList_);
  };

  useEffect(() => {
    if (!jwt) {
      router.push("/sign-in");
    }

    getCartItems();
  }, []);

  const [subtotal, setSubTotal] = useState(0);
  useEffect(() => {
    let total = 0;
    cartItemsList?.forEach((element) => {
      total += element?.amount;
    });
    const roundedOffTotal = total.toFixed(2);
    setSubTotal(roundedOffTotal);
  }, [cartItemsList]);

  const getTotal = () => {
    const totalAmount = parseFloat(subtotal) * 0.09 + 20;
    return (parseFloat(totalAmount) + parseFloat(subtotal)).toFixed(2);
  };

  const submitHandler = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const name = formData.get("name");
      setUsername(name);
      const email = formData.get("email");
      setEmail(email);
      const zip = formData.get("zip");
      setZip(zip);
      const phone = formData.get("phone");
      setPhone(phone);
      const address = formData.get("address");
      setAddress(address);
      const response = await GlobalApi.signIn(email, password);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalInUSD = () => {
    const totalAmount = parseFloat(subtotal) * 0.09 + 20;
    const totalUSD = (parseFloat(totalAmount) + parseFloat(subtotal)) / 83;
    return totalUSD.toFixed(2);
  };

  const onApprove = async (data) => {
    console.log(data);
    const payload = {
      data: {
        paymentId: data?.paymentId,
        totalOrderAmount: getTotal(),
        username: username,
        email: email,
        address: address,
        phone: phone,
        orderItemList: cartItemsList,
      },
    };
    const response = await GlobalApi.createOrder(payload, jwt);
    toast("Order placed successfully!");
  };

  return (
    <div>
      <h2 className="bg-primary text-white p-3 font-bold text-xl text-center">
        Checkout
      </h2>
      <form
        onSubmit={submitHandler}
        className="p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8 gap-4"
      >
        <div className="md:col-span-2 mx-20">
          <h2 className="font-bold text-3xl">Billing Details</h2>
          <div className="grid md:grid-cols-2 gap-10 mt-3">
            <Input placeholder="Name" name="name" />
            <Input placeholder="Email" type="email" name="email" />
          </div>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input placeholder="Phone" name="phone" type="number" />
            <Input placeholder="Zip Code" type="number" name="zip" />
          </div>
          <div className="mt-3">
            <Input placeholder="Address" name="address" />
          </div>
        </div>
        <div className="mx-10 border order-1">
          <h2 className="p-3 bg-gray-200 font-bold text-center">
            Total Cart ({totalCartItems})
          </h2>
          <div className="p-4 flex flex-col gap-4">
            <h2 className="font-bold flex justify-between">
              Subtotal: <span>&#8377; {subtotal}</span>
            </h2>
            <hr />
            <h2 className="flex justify-between">
              Delivery: <span>&#8377; 20</span>
            </h2>
            <h2 className="flex justify-between">
              Tax (9%): <span>&#8377; {subtotal * 0.09}</span>
            </h2>
            <hr />
            <h2 className="font-bold flex justify-between">
              Total: <span>&#8377; {getTotal()}</span>
            </h2>
            <PayPalButtons
              onApprove={onApprove}
              style={{ layout: "horizontal" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: getTotalInUSD(),
                        currency_code: "USD",
                      },
                    },
                  ],
                });
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
