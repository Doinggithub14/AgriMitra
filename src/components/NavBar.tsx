"use client";
import { Leaf } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 bg-transparent">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-white" />
          <span className="text-white text-xl font-semibold">AgriMitra</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#"
            className="text-white hover:text-green-200 transition font-semibold"
          >
            Services
          </a>
          <a
            href="#"
            className="text-white hover:text-green-200 transition font-semibold"
          >
            Inspirations
          </a>
          <a
            href="#"
            className="text-white hover:text-green-200 transition font-semibold"
          >
            About AgriMitra
          </a>
          <a
            href="#"
            className="text-white hover:text-green-200 transition font-semibold"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
