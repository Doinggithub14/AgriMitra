"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Leaf } from "lucide-react";
import Link from "next/link";
import { WaveText } from "@/components/ui/wave-text";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    if (isHome) {
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    } else {
      setIsScrolled(true);
    }
  }, [isHome]);

  const showSolid = isScrolled || !isHome;

  const links = [
    { label: "Home", href: "/" },
    { label: "Pesticide Recommendation", href: "/pesticide-recommender" },
    { label: "Crop Market", href: "/#crop-market" },
    { label: "Organic Farming", href: "/#sustainable-farming" },
    { label: "Farmer Forum", href: "/farmer-forum" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-300 ${
        showSolid ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Leaf
            className={`h-6 w-6 ${showSolid ? "text-green-700" : "text-white"}`}
          />
          <span
            className={`text-xl font-semibold ${
              showSolid ? "text-green-800" : "text-white"
            }`}
          >
            <WaveText text="Farmer's  Friend" />
          </span>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-8">
          {links.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={`transition font-semibold ${
                showSolid
                  ? "text-green-800 hover:text-green-600"
                  : "text-white hover:text-green-200"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`text-2xl transition-colors ${
              showSolid || isMenuOpen
                ? "text-green-800 hover:text-green-600"
                : "text-white hover:text-green-200"
            } z-50`}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md shadow-lg absolute top-16 left-0 w-full z-40 px-6 py-4 animate-in fade-in slide-in-from-top-5">
          <div className="flex flex-col space-y-4">
            {links.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="font-semibold text-green-800 hover:text-green-600 py-2 border-b border-green-100 last:border-b-0"
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
