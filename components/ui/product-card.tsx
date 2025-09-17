"use client";

import { Product } from "@/types";
import Image from "next/image";
import IconButton from "./icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import Currenct from "./currency";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";

interface ProductCardProps {
  data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const cart = useCart();
  const previewModal = usePreviewModal();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
  };

  const onAddToCard: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-background group cursor-pointer rounded-xl border border-border p-3 space-y-4"
    >
      <div className="aspect-square rounded-xl bg-muted relative">
        <Image
          src={data?.images?.[0]?.url}
          fill
          alt="Image"
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-muted-foreground" />}
            />
            <IconButton
              onClick={onAddToCard}
              icon={<ShoppingCart size={20} className="text-muted-foreground" />}
            />
          </div>
        </div>
      </div>
      {/* description */}
      <div>
        <p className="font-semibold text-lg text-foreground">{data.name}</p>
        <p className="text-sm text-muted-foreground">{data.category?.name}</p>
      </div>
      {/* price */}
      <div className="flex items-center justify-between">
        <Currenct value={data?.price} />
      </div>
    </div>
  );
};

export default ProductCard;
