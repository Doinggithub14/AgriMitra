"use client";

import HeroSection from "@/components/HeroSection";
import PesticideRecommender from "@/components/PesticideRecommender";
import MandiPrices from '@/components/MandiPrices';
import FarmerForum from '@/components/FarmerForum';
import { useState } from "react";
import Link from "next/link";
import { Leaf, Search, Crop, TrendingUp, Calendar } from "lucide-react";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<object | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://perenual.com/api/species-list?key=${process.env.NEXT_PUBLIC_PERENUAL_API_KEY}&q=${query}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const cropOptions = [
    {
      icon: <Search className="h-8 w-8 text-emerald-600" />,
      title: "Explore Crops",
      description: "Discover a wide variety of crops suitable for your region and climate",
    },
    {
      icon: <Crop className="h-8 w-8 text-emerald-600" />,
      title: "Select Your Crop",
      description: "Choose the perfect crop based on your soil type and farming conditions",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-emerald-600" />,
      title: "Market Analysis",
      description: "Get insights into market prices and demand for different crops",
    },
    {
      icon: <Calendar className="h-8 w-8 text-emerald-600" />,
      title: "Seasonal Guide",
      description: "Learn about the best time to plant and harvest various crops",
    },
  ];

  return (
    <main>
      <section className="relative">
        <HeroSection />
      </section>

      {/* Crop Exploration Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Your Farming Options</h2>
            <p className="text-xl text-gray-600">Make informed decisions about your crops with our comprehensive tools</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {cropOptions.map((option, index) => (
              <Link
                key={index}
                href={`/${option.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 bg-emerald-50 p-3 rounded-full">
                    {option.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{option.title}</h3>
                  <p className="text-gray-600">{option.description}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/crops"
              className="inline-flex items-center px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105"
            >
              <Leaf className="h-5 w-5 mr-2" />
              View Crop Recommendations
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto p-4 mt-10">
        <PesticideRecommender />
      </div>

      <div className="max-w-4xl mx-auto p-4 mt-10">
        <MandiPrices />
      </div>

      <div className="max-w-4xl mx-auto p-4 mt-10 mb-20">
        <FarmerForum />
      </div>
    </main>
  );
}
