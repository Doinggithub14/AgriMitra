"use client";

import { useState } from "react";
// import { TrendingUp, BarChart2, PieChart, Calendar, ArrowUpRight, ArrowDownRight, Search } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js/auto";
import { Line, Bar, Pie } from "react-chartjs-2";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface CropData {
  name: string;
  currentPrice: number;
  previousPrice: number;
  priceChange: number;
  monthlyPrices: number[];
  demandShare: number;
  seasonalityData: number[];
}

const crops: { [key: string]: CropData } = {
  Wheat: {
    name: "Wheat",
    currentPrice: 2200,
    previousPrice: 2100,
    priceChange: 4.76,
    monthlyPrices: [
      2000, 2050, 2100, 2150, 2200, 2180, 2220, 2250, 2200, 2180, 2150, 2200,
    ],
    demandShare: 35,
    seasonalityData: [65, 80, 90, 75, 60, 50, 45, 55, 70, 85, 95, 75],
  },
  Rice: {
    name: "Rice",
    currentPrice: 2040,
    previousPrice: 2100,
    priceChange: -2.86,
    monthlyPrices: [
      2100, 2080, 2060, 2040, 2020, 2000, 2020, 2040, 2060, 2080, 2100, 2040,
    ],
    demandShare: 40,
    seasonalityData: [80, 85, 75, 65, 55, 45, 50, 60, 70, 80, 90, 85],
  },
  Corn: {
    name: "Corn",
    currentPrice: 1962,
    previousPrice: 1900,
    priceChange: 3.26,
    monthlyPrices: [
      1800, 1850, 1900, 1920, 1940, 1960, 1980, 1970, 1960, 1950, 1940, 1962,
    ],
    demandShare: 25,
    seasonalityData: [70, 75, 85, 90, 80, 70, 65, 60, 65, 75, 85, 80],
  },
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function MarketAnalysis() {
  const [selectedCrop, setSelectedCrop] = useState("Wheat");
  const [timeRange, setTimeRange] = useState("12M");

  const priceData = {
    labels: months,
    datasets: [
      {
        label: `${selectedCrop} Price (₹/quintal)`,
        data: crops[selectedCrop].monthlyPrices,
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const seasonalityData = {
    labels: months,
    datasets: [
      {
        label: `${selectedCrop} Demand Index`,
        data: crops[selectedCrop].seasonalityData,
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderRadius: 4,
      },
    ],
  };

  const marketShareData = {
    labels: [`${selectedCrop}`, "Other Crops"],
    datasets: [
      {
        data: [
          crops[selectedCrop].demandShare,
          100 - crops[selectedCrop].demandShare,
        ],
        backgroundColor: [
          "rgba(16, 185, 129, 0.8)",
          "rgba(229, 231, 235, 0.8)",
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: true,
        text: `${selectedCrop} Market Trends`,
        font: {
          size: 16,
          weight: "bold" as const,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white -mt-[88px] pt-[88px]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Market Analysis
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track price trends, market demand, and seasonal patterns for
            agricultural commodities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
                <div className="flex-1 max-w-xs">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Crop
                  </label>
                  <div className="relative">
                    <select
                      value={selectedCrop}
                      onChange={(e) => setSelectedCrop(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-emerald-100 bg-white text-gray-900 font-medium shadow-sm appearance-none cursor-pointer hover:border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    >
                      {Object.keys(crops).map((crop) => (
                        <option
                          key={crop}
                          value={crop}
                          className="text-gray-900 bg-white py-2"
                        >
                          {crop}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-emerald-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Period
                  </label>
                  <div className="flex gap-2">
                    {["1M", "3M", "6M", "12M"].map((range) => (
                      <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`px-4 py-2.5 rounded-xl transition-all duration-200 font-medium ${
                          timeRange === range
                            ? "bg-emerald-500 text-white shadow-md hover:bg-emerald-600"
                            : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-2 mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Price Trend Analysis
                </h3>
                <p className="text-gray-600">
                  Historical price movement for {selectedCrop} over the last{" "}
                  {timeRange}
                </p>
              </div>
              <div className="h-[300px]">
                <Line data={priceData} options={options} />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="space-y-2 mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Seasonal Demand Pattern
                </h3>
                <p className="text-gray-600">
                  Monthly demand variations for {selectedCrop} throughout the
                  year
                </p>
              </div>
              <div className="h-[200px]">
                <Bar
                  data={seasonalityData}
                  options={{
                    ...options,
                    plugins: {
                      ...options.plugins,
                      title: {
                        ...options.plugins.title,
                        text: `${selectedCrop} Seasonal Demand Index`,
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="space-y-2 mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedCrop} Current Price
                </h3>
                <p className="text-gray-600">Latest market price and change</p>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                ₹{crops[selectedCrop].currentPrice}
                <span className="text-base font-normal text-gray-500">
                  /quintal
                </span>
              </div>
              <div
                className={`flex items-center ${
                  crops[selectedCrop].priceChange >= 0
                    ? "text-emerald-500"
                    : "text-red-500"
                }`}
              >
                {crops[selectedCrop].priceChange >= 0 ? (
                  <ArrowUpRight className="w-5 h-5 mr-1" />
                ) : (
                  <ArrowDownRight className="w-5 h-5 mr-1" />
                )}
                <span className="font-medium">
                  {Math.abs(crops[selectedCrop].priceChange)}%
                </span>
                <span className="text-gray-600 ml-2 text-sm">
                  vs last month
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="space-y-2 mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedCrop} Market Share
                </h3>
                <p className="text-gray-600">
                  Current market demand distribution
                </p>
              </div>
              <div className="h-[200px] flex items-center justify-center">
                <Pie
                  data={marketShareData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { display: true, position: "bottom" as const },
                      title: {
                        display: true,
                        text: `${selectedCrop} Market Share Distribution`,
                        font: { size: 14, weight: "bold" as const },
                      },
                    },
                  }}
                />
              </div>
              <div className="text-center mt-4">
                <span className="text-2xl font-bold text-emerald-500">
                  {crops[selectedCrop].demandShare}%
                </span>
                <p className="text-gray-600">of total market demand</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
