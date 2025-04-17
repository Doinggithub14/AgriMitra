"use client";

import HeroSection from "@/components/HeroSection";
import PesticideRecommender from "@/components/PesticideRecommender";
import { useState } from "react";

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

  return (
    <main>
      {/* HeroSection now starts from the very top and covers the Navbar */}
      <section className="h-screen flex items-center justify-center bg-gray-100 relative -mt-20">
        <HeroSection />
      </section>

      {/* <div className="max-w-xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
          Pesticide Recommender for Farmers
        </h1>

        <div className="mt-20 mb-4">
          <input
            type="text"
            placeholder="Search crop..."
            onChange={(e) => setQuery(e.target.value)}
            className="border p-2 mr-2"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </div>
        {loading && <p>Loading...</p>}

        {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
      </div> */}

      <div className="max-w-4xl mx-auto p-4 mt-10">
        <PesticideRecommender />
      </div>
    </main>
  );
}
