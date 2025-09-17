"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import toast from "react-hot-toast";

// Razorpay response type
interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// Expected checkout API response
interface CheckoutResponse {
  key: string;
  amount: number;
  currency: string;
  orderId: string;
}

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => total + Number(item.price), 0);

  const onCheckout = async () => {
    try {
      const response = await axios.post<CheckoutResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        { productIds: items.map((item) => item.id) }
      );

      const data = response.data;

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "My Store",
        description: "Order Payment",
        order_id: data.orderId,
        handler: (res: RazorpayPaymentResponse) => {
          toast.success("Payment successful! ID: " + res.razorpay_payment_id);
          removeAll();
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Checkout error:", error.message, error.response?.data);
      } else {
        console.error("Unknown error during checkout:", error);
      }
      toast.error("Checkout failed!");
    }
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 dark:bg-neutral-900 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 dark:border-neutral-700 pt-4">
          <div className="text-base font-medium text-gray-900 dark:text-white">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button disabled={items.length === 0} onClick={onCheckout} className="w-full mt-6">
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
