"use client";

import { ShoppingBag } from "lucide-react";
import Button from "./ui/button";
import { useEffect, useState } from "react";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
  const cart = useCart();

  if (!isMounted) {
    return null;
  }

  return (
    <div className="ml-auto flex items-center gap-x-4">
      {/* Theme Switch */}
      <ThemeToggle />

      {/* Cart Button */}
      <Button
        onClick={() => router.push("/cart")}
        className="flex items-center rounded-full bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 px-4 py-2 transition"
      >
        <ShoppingBag size={20} />
        <span className="ml-2 text-sm font-medium">{cart.items.length}</span>
      </Button>
    </div>
  );
};

export default NavbarActions;
