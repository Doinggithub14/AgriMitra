"use client";

import React from "react";
import {
  Sun,
  CloudRain,
  Snowflake,
  Calendar,
  Clock,
  Droplet,
} from "lucide-react";
import Image from "next/image";

interface SeasonalCrop {
  name: string;
  plantingTime: string;
  harvestTime: string;
  idealConditions: string[];
  image: string;
}

interface SeasonData {
  name: string;
  icon: React.ReactElement;
  description: string;
  months: string;
  crops: SeasonalCrop[];
  bgColor: string;
  textColor: string;
}

const seasonalData: SeasonData[] = [
  {
    name: "Summer",
    icon: <Sun className="w-8 h-8" />,
    description: "Hot and dry conditions, perfect for heat-loving crops",
    months: "March - June",
    bgColor: "bg-orange-50",
    textColor: "text-orange-600",
    crops: [
      {
        name: "Tomatoes",
        plantingTime: "Early March",
        harvestTime: "June-July",
        idealConditions: ["Full sun", "Well-drained soil", "Regular watering"],
        image: "/images/tomato.png",
      },
      {
        name: "Okra",
        plantingTime: "April",
        harvestTime: "June-August",
        idealConditions: ["Warm soil", "Humid conditions", "Rich compost"],
        image: "/images/okra.png",
      },
    ],
  },
  {
    name: "Monsoon",
    icon: <CloudRain className="w-8 h-8" />,
    description: "Wet and humid conditions, ideal for moisture-loving plants",
    months: "July - October",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-600",
    crops: [
      {
        name: "Rice",
        plantingTime: "June-July",
        harvestTime: "November",
        idealConditions: ["Standing water", "High humidity", "Rich soil"],
        image: "/images/rice.png",
      },
      {
        name: "Corn",
        plantingTime: "July",
        harvestTime: "October",
        idealConditions: ["Moderate rainfall", "Fertile soil", "Good drainage"],
        image: "/images/corn.jpg",
      },
    ],
  },
  {
    name: "Winter",
    icon: <Snowflake className="w-8 h-8" />,
    description: "Cool conditions perfect for leafy vegetables and pulses",
    months: "November - February",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    crops: [
      {
        name: "Wheat",
        plantingTime: "November",
        harvestTime: "March-April",
        idealConditions: ["Cool weather", "Medium soil", "Moderate water"],
        image: "/images/wheat.jpeg",
      },
      {
        name: "Chickpea",
        plantingTime: "October-November",
        harvestTime: "February-March",
        idealConditions: ["Cool temperature", "Less water", "Deep soil"],
        image: "/images/Chickpea.png",
      },
    ],
  },
];

export default function SeasonalGuide() {
  return (
    <div className="min-h-screen bg-white -mt-[88px] pt-[88px]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Seasonal Planting Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn the best times to plant and harvest your crops throughout the
            year
          </p>
        </div>

        <div className="space-y-16">
          {seasonalData.map((season) => (
            <div
              key={season.name}
              className={`${season.bgColor} rounded-3xl p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] transform`}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
                <div
                  className={`${season.textColor} p-4 rounded-2xl bg-white shadow-md transition-transform duration-300 hover:scale-110 hover:rotate-12 self-start`}
                >
                  {season.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {season.name}
                  </h2>
                  <div className="flex items-center text-gray-600 mb-3">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span>{season.months}</span>
                  </div>
                  <p className="text-gray-700 text-lg">{season.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {season.crops.map((crop) => (
                  <div
                    key={crop.name}
                    className="bg-white rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group cursor-pointer"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden shadow-md">
                        <Image
                          src={crop.image}
                          alt={crop.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-125"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300 mb-2">
                          {crop.name}
                        </h3>
                        <div className="h-[2px] w-16 bg-emerald-500 rounded-full transition-all duration-300 group-hover:w-24"></div>
                      </div>
                    </div>

                    <div className="space-y-4 transform opacity-90 transition-all duration-300 group-hover:opacity-100">
                      <div className="flex items-start gap-3 transition-all duration-300 group-hover:translate-x-1">
                        <Calendar className="w-5 h-5 text-emerald-600 mt-1 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-emerald-600 mb-1">
                            Planting Time
                          </p>
                          <p className="text-gray-900">{crop.plantingTime}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 transition-all duration-300 group-hover:translate-x-1">
                        <Clock className="w-5 h-5 text-emerald-600 mt-1 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-emerald-600 mb-1">
                            Harvest Time
                          </p>
                          <p className="text-gray-900">{crop.harvestTime}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 transition-all duration-300 group-hover:translate-x-1">
                        <Droplet className="w-5 h-5 text-emerald-600 mt-1 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-emerald-600 mb-1">
                            Ideal Conditions
                          </p>
                          <ul className="space-y-1">
                            {crop.idealConditions.map((condition, index) => (
                              <li
                                key={index}
                                className="text-gray-900 transition-all duration-300 hover:text-emerald-600 flex items-center before:content-['•'] before:mr-2 before:text-emerald-600"
                              >
                                {condition}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
