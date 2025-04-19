"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Leaf } from "lucide-react";
import Link from "next/link";
import { WaveText } from "@/components/ui/wave-text";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
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
    { label: "Pest Recommendation", href: "/pestrecommendation" },
    { label: "Expert Consultation", href: "/farmer-forum" },
    { label: "Crop Market", href: "#crop-market" },
    { label: "Organic Farming", href: "/expertconsultation" },
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
            <WaveText text="AgriMitra" />
          </span>
        </div>
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
      </div>
    </nav>
  );
}
