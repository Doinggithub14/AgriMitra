'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Crop } from 'lucide-react';
import { crops, categories, seasons, waterRequirements, sunlightOptions, CropInfo } from '@/data/crops';
import { motion, AnimatePresence } from 'framer-motion';

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
      // ... rest of your additional crops ...
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-emerald-50 to-white"
    >
      <div className="max-w-6xl mx-auto">
        <div className="p-4 md:p-8">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4 text-center"
          >
            Select Your Crop
          </motion.h1>

          {/* Progress Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-between items-center mb-8"
          >
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
          </motion.div>

          {/* Selection Steps */}
          <motion.div 
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
          >
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="text-xl font-semibold text-emerald-800 mb-4">Select Crop Type</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categories.filter(cat => cat !== 'All').map((category) => (
                      <motion.button
                        key={category}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedCategory(category)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          selectedCategory === category
                            ? 'border-emerald-600 bg-emerald-50 text-gray-900'
                            : 'border-gray-200 hover:border-emerald-400 text-gray-900'
                        }`}
                      >
                        {category}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="text-xl font-semibold text-emerald-800 mb-4">Select Growing Season</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {seasons.filter(season => season !== 'All').map((season) => (
                      <motion.button
                        key={season}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedSeason(season)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          selectedSeason === season
                            ? 'border-emerald-600 bg-emerald-50 text-gray-900'
                            : 'border-gray-200 hover:border-emerald-400 text-gray-900'
                        }`}
                      >
                        {season}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="text-xl font-semibold text-emerald-800 mb-4">Select Water Availability</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {waterRequirements.map((water) => (
                      <motion.button
                        key={water}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedWater(water)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          selectedWater === water
                            ? 'border-emerald-600 bg-emerald-50 text-gray-900'
                            : 'border-gray-200 hover:border-emerald-400 text-gray-900'
                        }`}
                      >
                        {water}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="text-xl font-semibold text-emerald-800 mb-4">Select Sunlight Conditions</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {sunlightOptions.map((sunlight) => (
                      <motion.button
                        key={sunlight}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedSunlight(sunlight)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          selectedSunlight === sunlight
                            ? 'border-emerald-600 bg-emerald-50 text-gray-900'
                            : 'border-gray-200 hover:border-emerald-400 text-gray-900'
                        }`}
                      >
                        {sunlight}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
              </motion.button>
            </div>
          </motion.div>

          {/* Results Section */}
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-emerald-800">Recommended Crops</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className="text-emerald-600 hover:text-emerald-700 flex items-center gap-2"
                >
                  <Crop size={20} />
                  Reset Filters
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedCrops.map((crop) => (
                  <motion.div
                    key={crop.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -5 }}
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
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleCropSelect(crop)}
                        className="mt-4 w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                      >
                        View Details
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Crop Details Modal */}
          <AnimatePresence>
            {showDetails && selectedCrop && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-emerald-800">{selectedCrop.name}</h2>
                        <p className="text-gray-600 italic">{selectedCrop.scientificName}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowDetails(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Crop size={24} />
                      </motion.button>
                    </div>

                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="relative h-64 mb-6"
                    >
                      <Image
                        src={selectedCrop.image}
                        alt={selectedCrop.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      {/* ... rest of your modal content ... */}
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}