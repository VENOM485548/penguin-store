"use client";

import { Product } from "@/types";
import Currency from "./ui/currency";
import Button from "./ui/button";
import { ShoppingCart } from "lucide-react";
import useCart from "@/hooks/use-cart";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();

  const onAddToCart = () => {
    cart.addItem(data);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground">{data.name}</h1>

      <div className="mt-3 flex items-end justify-between">
        <div className="text-2xl text-foreground">
          <Currency value={data?.price} />
        </div>
      </div>

      <hr className="my-4 border-border" />

      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-foreground">Size:</h3>
          <div className="text-sm text-muted-foreground">{data?.size?.name}</div>
        </div>

        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-foreground">Color:</h3>
          <div
            className="h-6 w-6 rounded-full border border-border"
            style={{ backgroundColor: data?.color?.value }}
            aria-label={`Color ${data?.color?.name ?? ""}`}
          />
        </div>
      </div>

      <div className="mt-10 flex items-center gap-x-3">
        <Button onClick={onAddToCart} className="flex items-center gap-x-2">
          Add to cart
          <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default Info;
