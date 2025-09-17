import Link from "next/link";
import Container from "./ui/container";
import MainNav from "./main-nav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";

export const revalidate = 0;

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <div className="border-b bg-white dark:bg-neutral-950">
      <Container>
        <div className="relative flex h-16 items-center px-4 sm:px-6 lg:px-8">
          {/* Logo / Brand */}
          <Link href="/" className="ml-4 flex items-center gap-x-2 lg:ml-0">
            <p className="font-bold text-xl text-black dark:text-white">STORE</p>
          </Link>

          {/* Navigation */}
          <MainNav data={categories} />

          {/* Actions (Cart, Theme Toggle, etc.) */}
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
