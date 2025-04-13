"use client";

import { Button } from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <div className="relative min-h-screen bg-cover w-full overflow-visible">
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

      {/* Glassmorphism Container */}
      <div className="relative z-10 min-h-screen">
        {/* Main Content with Glassmorphism */}
        <div
          className="container mx-auto mt-40 px-4 flex items-center justify-center"
          style={{ height: "calc(100vh - 80px)" }}
        >
          <div className="backdrop-blur-lg bg-white/10 rounded-3xl w-[90%] max-w-6xl mx-auto overflow-hidden">
            <div className="p-12 md:p-16">
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 max-w-2xl">
                Empowering Farmers with the Right Tools and Expert Advice
              </h1>
              <p className="text-white/90 text-lg mb-8 max-w-xl">
                Discover the best solutions for your crops with AgriMitra.
                Connect with experts and communities to get personalized advice
                and find the right pesticides to ensure healthy and thriving
                yields.
              </p>
              <Button className="bg-white text-green-800 hover:bg-green-50 transition-colors px-8 py-2 text-lg">
                Explore
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
