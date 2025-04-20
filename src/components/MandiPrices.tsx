"use client";

import { useState, useEffect } from "react";
import {
  FaArrowUp,
  FaArrowDown,
  FaRupeeSign,
  FaSearch,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaFilter,
  FaChevronDown,
  FaTimes,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Poppins, Inter, Hind } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const hind = Hind({
  weight: ["700"],
  subsets: ["devanagari"],
  display: "swap",
});

interface MandiPrice {
  cropName: string;
  cropNameHindi: string;
  price: number;
  pricePerKg: number;
  mandiName: string;
  mandiNameHindi: string;
  priceChange: number;
  weeklyChange: number;
  lastUpdated: string;
  marketLocation: string;
  volume: number;
  category: string;
  id: string;
}

type SortField = "cropName" | "price" | "priceChange" | "weeklyChange";
type SortOrder = "asc" | "desc";

const MandiPrices = () => {
  const [prices, setPrices] = useState<MandiPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("cropName");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const fetchMandiPrices = async () => {
      try {
        const mockData: MandiPrice[] = [
          {
            cropName: "गेहूं | Wheat",
            cropNameHindi: "गेहूं",
            price: 2200,
            pricePerKg: 22,
            mandiName: "Delhi Mandi",
            mandiNameHindi: "दिल्ली मंडी",
            priceChange: 50,
            weeklyChange: 150,
            lastUpdated: "2 hours ago",
            marketLocation: "Delhi",
            volume: 5000,
            category: "Cereals",
            id: "1",
          },
          {
            cropName: "चावल | Rice",
            cropNameHindi: "चावल",
            price: 1800,
            pricePerKg: 18,
            mandiName: "Delhi Mandi",
            mandiNameHindi: "दिल्ली मंडी",
            priceChange: -30,
            weeklyChange: -80,
            lastUpdated: "1 hour ago",
            marketLocation: "Delhi",
            volume: 3500,
            category: "Cereals",
            id: "2",
          },
          {
            cropName: "टमाटर | Tomato",
            cropNameHindi: "टमाटर",
            price: 2500,
            pricePerKg: 25,
            mandiName: "Delhi Mandi",
            mandiNameHindi: "दिल्ली मंडी",
            priceChange: 150,
            weeklyChange: 300,
            lastUpdated: "30 mins ago",
            marketLocation: "Delhi",
            volume: 1800,
            category: "Vegetables",
            id: "3",
          },
          {
            cropName: "प्याज | Onion",
            cropNameHindi: "प्याज",
            price: 1800,
            pricePerKg: 18,
            mandiName: "Delhi Mandi",
            mandiNameHindi: "दिल्ली मंडी",
            priceChange: -100,
            weeklyChange: -200,
            lastUpdated: "1 hour ago",
            marketLocation: "Delhi",
            volume: 2200,
            category: "Vegetables",
            id: "4",
          },
          {
            cropName: "आलू | Potato",
            cropNameHindi: "आलू",
            price: 1200,
            pricePerKg: 12,
            mandiName: "Delhi Mandi",
            mandiNameHindi: "दिल्ली मंडी",
            priceChange: 20,
            weeklyChange: 60,
            lastUpdated: "3 hours ago",
            marketLocation: "Delhi",
            volume: 2800,
            category: "Vegetables",
            id: "5",
          },
          {
            cropName: "गन्ना | Sugarcane",
            cropNameHindi: "गन्ना",
            price: 350,
            pricePerKg: 3.5,
            mandiName: "Delhi Mandi",
            mandiNameHindi: "दिल्ली मंडी",
            priceChange: 10,
            weeklyChange: 25,
            lastUpdated: "4 hours ago",
            marketLocation: "Delhi",
            volume: 4500,
            category: "Cash Crops",
            id: "6",
          },
          {
            cropName: "कपास | Cotton",
            cropNameHindi: "कपास",
            price: 5500,
            pricePerKg: 55,
            mandiName: "Delhi Mandi",
            mandiNameHindi: "दिल्ली मंडी",
            priceChange: 200,
            weeklyChange: 450,
            lastUpdated: "2 hours ago",
            marketLocation: "Delhi",
            volume: 1200,
            category: "Cash Crops",
            id: "7",
          },
          {
            cropName: "मक्का | Maize",
            cropNameHindi: "मक्का",
            price: 1850,
            pricePerKg: 18.5,
            mandiName: "Delhi Mandi",
            mandiNameHindi: "दिल्ली मंडी",
            priceChange: 30,
            weeklyChange: 80,
            lastUpdated: "5 hours ago",
            marketLocation: "Delhi",
            volume: 3200,
            category: "Cereals",
            id: "8",
          },
        ];

        setPrices(mockData);
        setLoading(false);
      } catch {
        setError("Failed to fetch mandi prices. Please try again later.");
        setLoading(false);
      }
    };

    fetchMandiPrices();
  }, []);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <FaSort className="ml-2 text-gray-400" />;
    return sortOrder === "asc" ? (
      <FaSortUp className="ml-2 text-green-800" />
    ) : (
      <FaSortDown className="ml-2 text-green-800" />
    );
  };

  const categories = ["all", ...new Set(prices.map((price) => price.category))];

  const filteredPrices = prices
    .filter(
      (price) =>
        (selectedCategory === "all" || price.category === selectedCategory) &&
        (price.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          price.cropNameHindi.includes(searchQuery) ||
          price.mandiName.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      const multiplier = sortOrder === "asc" ? 1 : -1;
      switch (sortField) {
        case "cropName":
          return multiplier * a.cropName.localeCompare(b.cropName);
        case "price":
          return multiplier * (a.price - b.price);
        case "priceChange":
          return multiplier * (a.priceChange - b.priceChange);
        case "weeklyChange":
          return multiplier * (a.weeklyChange - b.weeklyChange);
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-2xl text-green-800 animate-pulse">
          Loading prices...
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center p-4">{error}</div>;
  }

  return (
    <section
      id="crop-market"
      className={`${poppins.className} ${inter.className} ${hind.className} w-full px-2 py-8`}
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2
            className={`text-3xl md:text-5xl font-bold text-green-900 mb-5 ${hind.className}`}
          >
            वर्तमान कृषि बाज़ार मूल्य
          </h2>
          <h3
            className={`text-2xl md:text-3xl text-green-800 pb-5 ${poppins.className} font-semibold`}
          >
            Crop Market Price List
          </h3>
        </motion.div>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 px-2 max-w-4xl mx-auto">
        <div className="relative flex-grow">
          <div className="relative group">
            <input
              type="text"
              placeholder="Search crops or mandis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 md:p-4 pl-10 md:pl-12 rounded-2xl border-2 border-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 
              focus:border-transparent bg-white/95 backdrop-blur-sm text-green-900 placeholder-green-700 
              transition-all duration-300 ease-in-out shadow-sm hover:shadow-md text-sm md:text-base"
            />
            <FaSearch
              className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-green-700 text-base md:text-lg 
              transition-all duration-300 group-hover:text-green-700"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-500
                transition-colors duration-200"
              >
                <FaTimes className="text-sm md:text-base" />
              </button>
            )}
          </div>
        </div>
        <div
          className="flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-2xl px-3 md:px-4 py-2 border-2 border-green-700 
          shadow-sm hover:shadow-md transition-all duration-300"
        >
          <FaFilter className="text-green-600 text-base md:text-lg" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="flex-1 p-1 md:p-2 rounded-xl bg-transparent focus:outline-none text-green-900 cursor-pointer
            border-0 focus:ring-0 appearance-none text-sm md:text-base"
            style={{ WebkitAppearance: "none", MozAppearance: "none" }}
          >
            {categories.map((category) => (
              <option
                key={category}
                value={category}
                className="bg-white text-green-900 py-2"
              >
                {category === "all"
                  ? "All Categories"
                  : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          <FaChevronDown className="text-green-500 text-xs md:text-sm pointer-events-none" />
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchQuery || selectedCategory !== "all") && (
        <div className="mb-4 px-2 max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 items-center">
            {searchQuery && (
              <div
                className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-2 py-1 md:px-3 rounded-full
                text-xs md:text-sm font-medium"
              >
                <span>Search: {searchQuery}</span>
                <button
                  onClick={() => setSearchQuery("")}
                  className="hover:text-green-900 transition-colors"
                >
                  <FaTimes className="text-xs" />
                </button>
              </div>
            )}
            {selectedCategory !== "all" && (
              <div
                className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-2 py-1 md:px-3 rounded-full
                text-xs md:text-sm font-medium"
              >
                <span>Category: {selectedCategory}</span>
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="hover:text-green-900 transition-colors"
                >
                  <FaTimes className="text-xs" />
                </button>
              </div>
            )}
            {(searchQuery || selectedCategory !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="text-green-600 hover:text-green-800 text-xs md:text-sm font-medium transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile View - Card List */}
      <div className="md:hidden space-y-4 px-2">
        {filteredPrices.map((price, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-4 border border-green-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-green-900 text-lg">
                  {price.cropName.split("|")[1].trim()}
                </h3>
                <p className={`text-green-800 ${hind.className}`}>
                  {price.cropNameHindi}
                </p>
                <p className="text-sm text-green-700">{price.category}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end">
                  <FaRupeeSign className="text-green-800" />
                  <span className="font-bold ml-1 text-lg">
                    {price.price.toLocaleString()}
                  </span>
                </div>
                <div className="text-sm text-green-700">
                  {price.mandiName}
                </div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm text-green-600">Price/kg:</p>
                <div className="flex items-center">
                  <FaRupeeSign className="text-green-800 text-sm" />
                  <span className="font-medium ml-1">
                    {price.pricePerKg.toLocaleString()}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-green-600">Daily Δ:</p>
                <div
                  className={`flex items-center ${
                    price.priceChange >= 0 ? "text-green-800" : "text-red-700"
                  }`}
                >
                  {price.priceChange >= 0 ? (
                    <FaArrowUp className="mr-1 text-sm" />
                  ) : (
                    <FaArrowDown className="mr-1 text-sm" />
                  )}
                  <span>{Math.abs(price.priceChange)}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-green-600">Weekly Δ:</p>
                <div
                  className={`flex items-center ${
                    price.weeklyChange >= 0 ? "text-green-800" : "text-red-700"
                  }`}
                >
                  {price.weeklyChange >= 0 ? (
                    <FaArrowUp className="mr-1 text-sm" />
                  ) : (
                    <FaArrowDown className="mr-1 text-sm" />
                  )}
                  <span>{Math.abs(price.weeklyChange)}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-green-600">Volume:</p>
                <p>{price.volume.toLocaleString()} q</p>
              </div>
            </div>

            <div className="mt-2 text-xs text-green-600">
              Updated: {price.lastUpdated}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View - Table */}
      <div className="hidden md:block section-card rounded-2xl max-w-[1500px] mx-auto bg-white/90 backdrop-blur-sm min-h-[600px] p-3 px-2">
        <div className="w-full mx-auto">
          <style jsx>{`
            .scrollable-container::-webkit-scrollbar {
              height: 10px;
              width: 10px;
            }
            .scrollable-container::-webkit-scrollbar-track {
              background: #e2e8f0;
              border-radius: 5px;
            }
            .scrollable-container::-webkit-scrollbar-thumb {
              background: #94a3b8;
              border-radius: 5px;
              border: 2px solid #e2e8f0;
            }
            .scrollable-container::-webkit-scrollbar-thumb:hover {
              background: #64748b;
            }
          `}</style>
          <div
            className="overflow-x-auto rounded-lg shadow-lg scrollable-container"
            style={{ overflowX: "scroll" }}
          >
            <div className="min-w-[900px] relative">
              <table className="w-full table-fixed bg-white border border-purple-200">
                <colgroup>
                  <col className="w-[190px]" />
                  <col className="w-[160px]" />
                  <col className="w-[120px]" />
                  <col className="w-[120px]" />
                  <col className="w-[120px]" />
                  <col className="w-[120px]" />
                  <col className="w-[120px]" />
                  <col className="w-[90px]" />
                </colgroup>
                <thead className="bg-purple-50 sticky top-0 z-10">
                  <tr className="border-b-2 border-purple-200">
                    <th className="px-3 py-4 text-center text-green-700 font-semibold text-lg border-x border-purple-200 break-words">
                      Crop Name
                    </th>
                    <th className="px-3 py-4 text-center text-green-700 font-semibold text-lg border-r border-purple-200 break-words">
                      Market
                    </th>
                    <th
                      className="px-3 py-4 text-center cursor-pointer text-green-700 border-r border-purple-200 break-words"
                      onClick={() => handleSort("price")}
                    >
                      <div className="flex items-center justify-center text-base whitespace-normal">
                        Price (₹/q) {getSortIcon("price")}
                      </div>
                    </th>
                    <th className="px-3 py-4 text-center text-green-700 border-r border-purple-200 break-words">
                      <div className="text-base whitespace-normal">
                        Price/kg (₹)
                      </div>
                    </th>
                    <th
                      className="px-3 py-4 text-center cursor-pointer text-green-700 border-r border-purple-200 break-words"
                      onClick={() => handleSort("priceChange")}
                    >
                      <div className="flex items-center justify-center text-base whitespace-normal">
                        Daily Δ {getSortIcon("priceChange")}
                      </div>
                    </th>
                    <th
                      className="px-3 py-4 text-center cursor-pointer text-green-700 border-r border-purple-200 break-words"
                      onClick={() => handleSort("weeklyChange")}
                    >
                      <div className="flex items-center justify-center text-base whitespace-normal">
                        Weekly Δ {getSortIcon("weeklyChange")}
                      </div>
                    </th>
                    <th className="px-3 py-4 text-center text-green-700 border-r border-purple-200 break-words">
                      <div className="text-base whitespace-normal">Vol (q)</div>
                    </th>
                    <th className="px-3 py-4 text-center text-green-700 border-r border-purple-200 break-words">
                      <div className="text-base whitespace-normal">Time</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-200">
                  {filteredPrices.map((price, index) => (
                    <tr
                      key={index}
                      className="hover:bg-purple-50/50 transition-colors"
                    >
                      <td className="px-3 py-3 border-x border-purple-200">
                        <div className="flex flex-col items-center gap-1">
                          <span
                            className={`text-green-700 font-semibold text-base text-center break-words ${inter.className}`}
                          >
                            {price.cropName.split("|")[1].trim()}
                          </span>
                          <span
                            className={`text-green-700 text-base font-medium text-center break-words ${hind.className}`}
                          >
                            {price.cropNameHindi}
                          </span>
                          <span className="text-green-700 text-sm font-medium text-center break-words">
                            {price.category}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-3 border-r border-purple-200">
                        <div className="flex flex-col items-center gap-1">
                          <div className="font-medium text-green-900 text-base text-center w-full break-words">
                            {price.mandiName}
                          </div>
                          <div
                            className={`text-base text-green-800 text-center w-full break-words ${hind.className}`}
                          >
                            {price.mandiNameHindi}
                          </div>
                          <div className="text-sm text-green-800 text-center w-full break-words">
                            {price.marketLocation}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 border-r border-purple-200">
                        <div className="flex items-center justify-center break-words">
                          <FaRupeeSign className="text-green-800 text-base flex-shrink-0" />
                          <span className="font-bold ml-1 text-green-900 text-base">
                            {price.price.toLocaleString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-3 border-r border-purple-200">
                        <div className="flex items-center justify-center break-words">
                          <FaRupeeSign className="text-green-800 text-base flex-shrink-0" />
                          <span className="font-bold ml-1 text-green-800 text-base">
                            {price.pricePerKg.toLocaleString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-3 border-r border-purple-200">
                        <div
                          className={`flex items-center justify-center text-base break-words ${
                            price.priceChange >= 0
                              ? "text-green-800"
                              : "text-red-700"
                          }`}
                        >
                          {price.priceChange >= 0 ? (
                            <FaArrowUp className="mr-1 text-base flex-shrink-0" />
                          ) : (
                            <FaArrowDown className="mr-1 text-base flex-shrink-0" />
                          )}
                          <span>{Math.abs(price.priceChange)}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 border-r border-purple-200">
                        <div
                          className={`flex items-center justify-center text-base break-words ${
                            price.weeklyChange >= 0
                              ? "text-green-800"
                              : "text-red-700"
                          }`}
                        >
                          {price.weeklyChange >= 0 ? (
                            <FaArrowUp className="mr-1 text-base flex-shrink-0" />
                          ) : (
                            <FaArrowDown className="mr-1 text-base flex-shrink-0" />
                          )}
                          <span>{Math.abs(price.weeklyChange)}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 border-r border-purple-200">
                        <div className="text-center text-green-900 text-base break-words">
                          {price.volume.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-3 py-3 border-r border-purple-200">
                        <div className="text-center text-sm text-green-800 break-words">
                          {price.lastUpdated}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MandiPrices;