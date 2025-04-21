"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="relative min-h-screen bg-cover w-full overflow-visible -mt-[88px] pt-[88px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/b.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Glassmorphism Container */}
      <div className="relative z-10 min-h-screen">
        <div
          className="container mx-auto px-4 flex items-center justify-center"
          style={{ height: "100vh" }}
        >
          <div className="backdrop-blur-lg bg-white/10 rounded-3xl w-[95%] max-w-6xl mx-auto overflow-hidden">
            <div className="p-6 sm:p-12 md:p-16">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white leading-tight mb-4 sm:mb-6 max-w-sm sm:max-w-xl md:max-w-2xl">
                Empowering Farmers with the Right Tools and Expert Advice
              </h1>
              <p className="text-white/90 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-xs sm:max-w-md md:max-w-xl">
                Discover the best solutions for your crops with AgriMitra.
                Connect with experts and communities to get personalized advice
                and find the right pesticides to ensure healthy and thriving
                yields.
              </p>
              <Link href="/explore-crops">
                <Button className="bg-white text-green-800 hover:bg-green-50 transition-colors px-6 sm:px-8 py-2 text-base sm:text-lg">
                  Explore
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
