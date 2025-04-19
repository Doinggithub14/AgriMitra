"use client";
import { Leaf } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-emerald-600" />
            <span className="text-emerald-600 text-xl font-semibold">AgriMitra</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/crops"
              className={`${
                pathname === "/crops"
                  ? "text-emerald-600"
                  : "text-gray-600 hover:text-emerald-600"
              } transition font-semibold`}
            >
              Crop Recommendations
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-emerald-600 transition font-semibold"
            >
              Services
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-emerald-600 transition font-semibold"
            >
              Inspirations
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-emerald-600 transition font-semibold"
            >
              About AgriMitra
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-emerald-600 transition font-semibold"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
