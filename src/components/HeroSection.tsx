"use client";

import { Button } from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <div className="relative h-[90vh] bg-[#0a0a0a] -mt-[88px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://png.pngtree.com/thumb_back/fh260/background/20230519/pngtree-picture-of-green-leaves-in-a-dark-room-image_2665488.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-black/60 z-0" /> {/* Dark overlay */}

      {/* Glassmorphism Container */}
      <div className="relative z-10 h-full flex items-center pt-[88px]">
        {/* Main Content with Glassmorphism */}
        <div className="container mx-auto px-4">
          <div className="backdrop-blur-lg bg-black/30 rounded-3xl w-[90%] max-w-6xl mx-auto overflow-hidden shadow-xl">
            <div className="p-12 md:p-16">
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4 max-w-2xl">
                Empowering Farmers with the Right Tools and Expert Advice
              </h1>
              <p className="text-white/95 text-base md:text-lg mb-6 max-w-xl">
                Discover the best solutions for your crops with AgriMitra.
                Connect with experts and communities to get personalized advice
                and find the right pesticides to ensure healthy and thriving
                yields.
              </p>
              <Button className="bg-emerald-600 text-white hover:bg-emerald-700 transition-colors px-8 py-2 text-lg">
                Explore
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
