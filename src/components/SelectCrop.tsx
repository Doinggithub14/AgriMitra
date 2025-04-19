'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Search, Filter, X, ArrowLeft, ArrowRight } from 'lucide-react';
import { crops, categories, seasons, waterRequirements, sunlightOptions, CropInfo } from '@/data/crops';

export default function SelectCrop() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSeason, setSelectedSeason] = useState<string>('');
  const [selectedWater, setSelectedWater] = useState<string>('');
  const [selectedSunlight, setSelectedSunlight] = useState<string>('');
  const [selectedCrop, setSelectedCrop] = useState<CropInfo | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const filteredCrops = crops.filter(crop => {
    if (selectedCategory && crop.category !== selectedCategory) return false;
    if (selectedSeason && crop.season !== selectedSeason) return false;
    if (selectedWater && crop.waterRequirement !== selectedWater) return false;
    if (selectedSunlight && crop.sunlight !== selectedSunlight) return false;
    return true;
  });

  // Add more crops to the recommendation section
  const recommendedCrops = [
    ...filteredCrops,
    // Only add additional crops when no filters are selected
    ...(selectedCategory === '' && selectedSeason === '' && selectedWater === '' && selectedSunlight === '' ? [
      {
        id: '16',
        name: 'Mustard',
        scientificName: 'Brassica juncea',
        image: '/images/mustard.png',
        category: 'Oilseed',
        season: 'Rabi',
        waterRequirement: 'Low' as const,
        sunlight: 'Full Sun' as const,
        temperature: '15-25°C',
        growthDuration: '90-120 days',
        description: 'Mustard is an important oilseed crop that produces edible oil and is used as a condiment.',
        soilType: ['Loamy', 'Clay Loam', 'Sandy Loam'],
        benefits: ['Oil production', 'Soil improvement', 'Multiple uses'],
        marketPrice: '₹4,500-5,500/quintal',
        demand: 'Medium' as const,
        yield: '15-20 quintals/hectare',
        nutritionalValue: ['Oil', 'Protein', 'Minerals']
      },
      {
        id: '17',
        name: 'Groundnut',
        scientificName: 'Arachis hypogaea',
        image: '/images/groundnut.png',
        category: 'Oilseed',
        season: 'Kharif',
        waterRequirement: 'Low' as const,
        sunlight: 'Full Sun' as const,
        temperature: '25-30°C',
        growthDuration: '90-120 days',
        description: 'Groundnut is a major oilseed crop that produces edible oil and is rich in protein.',
        soilType: ['Sandy Loam', 'Loamy', 'Well-drained'],
        benefits: ['Oil production', 'High protein content', 'Soil improvement'],
        marketPrice: '₹5,000-6,000/quintal',
        demand: 'High' as const,
        yield: '20-25 quintals/hectare',
        nutritionalValue: ['Oil', 'Protein', 'Fiber', 'Minerals']
      },
      {
        id: '18',
        name: 'Sunflower',
        scientificName: 'Helianthus annuus',
        image: '/images/sunflower.png',
        category: 'Oilseed',
        season: 'Kharif',
        waterRequirement: 'Low' as const,
        sunlight: 'Full Sun' as const,
        temperature: '20-25°C',
        growthDuration: '90-100 days',
        description: 'Sunflower is an important oilseed crop that produces high-quality edible oil.',
        soilType: ['Loamy', 'Sandy Loam', 'Well-drained'],
        benefits: ['Oil production', 'Multiple uses', 'Soil improvement'],
        marketPrice: '₹4,500-5,500/quintal',
        demand: 'Medium' as const,
        yield: '15-20 quintals/hectare',
        nutritionalValue: ['Oil', 'Protein', 'Vitamin E']
      },
      {
        id: '19',
        name: 'Jute',
        scientificName: 'Corchorus olitorius',
        image: '/images/jute.png',
        category: 'Fiber Crop',
        season: 'Kharif',
        waterRequirement: 'High' as const,
        sunlight: 'Full Sun' as const,
        temperature: '24-37°C',
        growthDuration: '120-150 days',
        description: 'Jute is a natural fiber crop used for making ropes, bags, and other products.',
        soilType: ['Alluvial', 'Loamy', 'Clay Loam'],
        benefits: ['Natural fiber', 'Eco-friendly', 'Multiple uses'],
        marketPrice: '₹4,000-5,000/quintal',
        demand: 'Medium' as const,
        yield: '25-30 quintals/hectare',
        nutritionalValue: ['Fiber', 'Minerals']
      },
      {
        id: '20',
        name: 'Tea',
        scientificName: 'Camellia sinensis',
        image: '/images/tea.png',
        category: 'Beverage Crop',
        season: 'Year-round',
        waterRequirement: 'High' as const,
        sunlight: 'Partial Shade' as const,
        temperature: '20-30°C',
        growthDuration: 'Perennial',
        description: 'Tea is a perennial crop that produces leaves used for making the popular beverage.',
        soilType: ['Acidic', 'Well-drained', 'Rich Organic'],
        benefits: ['Beverage production', 'Multiple harvests', 'Economic value'],
        marketPrice: '₹100-200/kg',
        demand: 'High' as const,
        yield: '2,000-3,000 kg/hectare',
        nutritionalValue: ['Antioxidants', 'Caffeine', 'Minerals']
      },
      {
        id: '21',
        name: 'Coffee',
        scientificName: 'Coffea arabica',
        image: '/images/coffee.png',
        category: 'Beverage Crop',
        season: 'Year-round',
        waterRequirement: 'Medium' as const,
        sunlight: 'Partial Shade' as const,
        temperature: '15-24°C',
        growthDuration: 'Perennial',
        description: 'Coffee is a perennial crop that produces beans used for making the popular beverage.',
        soilType: ['Volcanic', 'Well-drained', 'Rich Organic'],
        benefits: ['Beverage production', 'Economic value', 'Multiple harvests'],
        marketPrice: '₹200-300/kg',
        demand: 'High' as const,
        yield: '1,000-1,500 kg/hectare',
        nutritionalValue: ['Caffeine', 'Antioxidants', 'Minerals']
      }
    ] : [])
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setSelectedCategory('');
    setSelectedSeason('');
    setSelectedWater('');
    setSelectedSunlight('');
    setCurrentStep(1);
  };

  const handleCropSelect = (crop: CropInfo) => {
    setSelectedCrop(crop);
    setShowDetails(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="p-4 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4 text-center">
            Select Your Crop
          </h1>

          {/* Progress Indicator */}
          <div className="flex justify-between items-center mb-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= step
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step}
                </div>
                <span className="text-sm mt-2 text-gray-600">
                  {step === 1 && 'Crop Type'}
                  {step === 2 && 'Season'}
                  {step === 3 && 'Water'}
                  {step === 4 && 'Sunlight'}
                </span>
              </div>
            ))}
          </div>

          {/* Selection Steps */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            {currentStep === 1 && (
              <div>
                <h2 className="text-xl font-semibold text-emerald-800 mb-4">Select Crop Type</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categories.filter(cat => cat !== 'All').map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedCategory === category
                          ? 'border-emerald-600 bg-emerald-50 text-gray-900'
                          : 'border-gray-200 hover:border-emerald-400 text-gray-900'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h2 className="text-xl font-semibold text-emerald-800 mb-4">Select Growing Season</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {seasons.filter(season => season !== 'All').map((season) => (
                    <button
                      key={season}
                      onClick={() => setSelectedSeason(season)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedSeason === season
                          ? 'border-emerald-600 bg-emerald-50 text-gray-900'
                          : 'border-gray-200 hover:border-emerald-400 text-gray-900'
                      }`}
                    >
                      {season}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <h2 className="text-xl font-semibold text-emerald-800 mb-4">Select Water Availability</h2>
                <div className="grid grid-cols-3 gap-4">
                  {waterRequirements.map((water) => (
                    <button
                      key={water}
                      onClick={() => setSelectedWater(water)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedWater === water
                          ? 'border-emerald-600 bg-emerald-50 text-gray-900'
                          : 'border-gray-200 hover:border-emerald-400 text-gray-900'
                      }`}
                    >
                      {water}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <h2 className="text-xl font-semibold text-emerald-800 mb-4">Select Sunlight Conditions</h2>
                <div className="grid grid-cols-3 gap-4">
                  {sunlightOptions.map((sunlight) => (
                    <button
                      key={sunlight}
                      onClick={() => setSelectedSunlight(sunlight)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedSunlight === sunlight
                          ? 'border-emerald-600 bg-emerald-50 text-gray-900'
                          : 'border-gray-200 hover:border-emerald-400 text-gray-900'
                      }`}
                    >
                      {sunlight}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                <ArrowLeft size={20} />
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={currentStep === 4}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  currentStep === 4
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                Next
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Results Section */}
          {currentStep === 4 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-emerald-800">Recommended Crops</h2>
                <button
                  onClick={handleReset}
                  className="text-emerald-600 hover:text-emerald-700 flex items-center gap-2"
                >
                  <X size={20} />
                  Reset Filters
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedCrops.map((crop) => (
                  <div
                    key={crop.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
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
                      <button
                        onClick={() => handleCropSelect(crop)}
                        className="mt-4 w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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