'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Search, Filter, X } from 'lucide-react';
import { crops, categories, seasons, CropInfo } from '@/data/crops';

export default function ExploreCrops() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSeason, setSelectedSeason] = useState<string>('');
  const [selectedCrop, setSelectedCrop] = useState<CropInfo | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const filteredCrops = crops.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         crop.scientificName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || crop.category === selectedCategory;
    const matchesSeason = !selectedSeason || crop.season === selectedSeason;
    return matchesSearch && matchesCategory && matchesSeason;
  });

  const handleCropSelect = (crop: CropInfo) => {
    setSelectedCrop(crop);
    setShowDetails(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="p-4 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4 text-center">
            Explore Crops
          </h1>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search crops..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 placeholder-gray-500"
                />
              </div>
              <div className="flex gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 bg-white"
                >
                  <option value="" className="text-gray-900">All Categories</option>
                  {categories.filter(cat => cat !== 'All').map((category) => (
                    <option key={category} value={category} className="text-gray-900">{category}</option>
                  ))}
                </select>
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 bg-white"
                >
                  <option value="" className="text-gray-900">All Seasons</option>
                  {seasons.filter(season => season !== 'All').map((season) => (
                    <option key={season} value={season} className="text-gray-900">{season}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCrops.map((crop) => (
                <div
                  key={crop.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleCropSelect(crop)}
                >
                  <div className="relative h-48">
                    <Image
                      src={crop.image}
                      alt={crop.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-emerald-800">{crop.name}</h3>
                    <p className="text-sm text-gray-600 italic">{crop.scientificName}</p>
                    <p className="text-gray-600 mt-2 line-clamp-2">{crop.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                        {crop.category}
                      </span>
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                        {crop.season}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Crop Details Modal */}
          {showDetails && selectedCrop && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-emerald-800">{selectedCrop.name}</h2>
                      <p className="text-gray-600 italic">{selectedCrop.scientificName}</p>
                    </div>
                    <button
                      onClick={() => setShowDetails(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div className="relative h-64 mb-6">
                    <Image
                      src={selectedCrop.image}
                      alt={selectedCrop.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-emerald-800 mb-2">Growing Conditions</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <span className="text-gray-600">Season:</span>
                          <span className="font-medium">{selectedCrop.season}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-gray-600">Water Requirement:</span>
                          <span className="font-medium">{selectedCrop.waterRequirement}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-gray-600">Sunlight:</span>
                          <span className="font-medium">{selectedCrop.sunlight}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-gray-600">Temperature:</span>
                          <span className="font-medium">{selectedCrop.temperature}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-gray-600">Growth Duration:</span>
                          <span className="font-medium">{selectedCrop.growthDuration}</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-emerald-800 mb-2">Soil Requirements</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCrop.soilType.map((soil) => (
                          <span
                            key={soil}
                            className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm"
                          >
                            {soil}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-lg font-semibold text-emerald-800 mt-4 mb-2">Benefits</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {selectedCrop.benefits.map((benefit) => (
                          <li key={benefit} className="text-gray-600">
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {selectedCrop.marketPrice && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-emerald-800 mb-2">Market Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-emerald-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600">Market Price</p>
                          <p className="font-semibold text-emerald-800">{selectedCrop.marketPrice}</p>
                        </div>
                        <div className="bg-emerald-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600">Demand</p>
                          <p className="font-semibold text-emerald-800">{selectedCrop.demand}</p>
                        </div>
                        <div className="bg-emerald-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600">Yield</p>
                          <p className="font-semibold text-emerald-800">{selectedCrop.yield}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedCrop.nutritionalValue && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-emerald-800 mb-2">Nutritional Value</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCrop.nutritionalValue.map((nutrient) => (
                          <span
                            key={nutrient}
                            className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm"
                          >
                            {nutrient}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 