"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import toast from "react-hot-toast";

const Summary = () => {
    const SearchParams =useSearchParams();
    const items = useCart((state) => state.items);
    const removeAll = useCart((state) => state.removeAll);

    useEffect(() => {
        if (SearchParams.get("success")) {
            toast.success("Payment completed.");
            removeAll();
        }

        if (SearchParams.get("canceled")) {
            toast.error("something went wrong.")
        }
    },[SearchParams,removeAll]);

    const totalPrice = items.reduce((total, item) => {return total + Number(item.price);},0)

    const onCheckout = async () => {
    try {
        console.log("Calling checkout API...");
        const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        { productIds: items.map((item) => item.id) }
        );
        console.log("Checkout response:", response.data);

        const data = response.data;

        const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "My Store",
        description: "Order Payment",
        order_id: data.orderId,
        handler: function (res: any) {
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

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
    } catch (error: any) {
        console.error("Checkout error:", error.message, error.response?.data);
        toast.error("Checkout failed!");
    }
    };



    return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 ">
        <h2 className="text-lg font-medium text-gray-900">Order Summary </h2>
        <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between border-t border-gray-200 pt-4 ">
                <div className="text-base font-mediumtext-gray-900">
                    Order total
                </div>
                <Currency value={totalPrice} />
            </div>
        </div>
        <Button disabled={items.length === 0} onClick={onCheckout} className="w-full mt-6 ">Checkout</Button>
    </div>
    )

};

export default Summary;
