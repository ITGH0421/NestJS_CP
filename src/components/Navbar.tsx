"use client";

import Link from "next/link";
import Image from "next/image";
import { FaSearch, FaUser, FaShoppingBag } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/logo.jpg" // Update with actual logo path
            alt="Chilli Padi Confinement"
            width={50}
            height={50}
            className="cursor-pointer"
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6 text-pink-500 font-medium">
          <Link href="#">About Us ▾</Link>
          <Link href="#">Confinement Menu ▾</Link>
          <Link href="#">Order Now ▾</Link>
          <Link href="#">Confinement Tips ▾</Link>
          <Link href="#">FAQ</Link>
        </div>

        {/* Icons */}
        <div className="flex space-x-4 text-pink-500 text-lg">
          <FaSearch className="cursor-pointer" />
          <FaUser className="cursor-pointer" />
          <FaShoppingBag className="cursor-pointer" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
