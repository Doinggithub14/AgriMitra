'use client';

import { useState } from 'react';
import Image from 'next/image';

interface CropInfo {
  id: string;
  name: string;
  image: string;
  pesticides: string[];
  fertilizers: string[];
  marketPrice: string;
  description: string;
}

const crops: CropInfo[] = [
  {
    id: '1',
    name: 'Wheat',
    image: '/images/wheat.jpeg',
    pesticides: ['Propiconazole', 'Tebuconazole', 'Azoxystrobin'],
    fertilizers: ['NPK 10-26-26', 'Urea', 'DAP'],
    marketPrice: '₹2,200/quintal',
    description: 'Wheat is a major cereal grain cultivated worldwide. It requires moderate temperatures and well-drained soil.',
  },
  {
    id: '2',
    name: 'Rice',
    image: '/images/rice.png',
    pesticides: ['Carbofuran', 'Chlorpyrifos', 'Fipronil'],
    fertilizers: ['NPK 17-17-17', 'Urea', 'Zinc Sulfate'],
    marketPrice: '₹2,040/quintal',
    description: 'Rice is a staple food crop that thrives in flooded conditions and warm temperatures.',
  },
  {
    id: '3',
    name: 'Corn',
    image: '/images/corn.jpg',
    pesticides: ['Atrazine', 'Glyphosate', 'Lambda-cyhalothrin'],
    fertilizers: ['NPK 20-10-10', 'Urea', 'MOP'],
    marketPrice: '₹1,962/quintal',
    description: 'Corn is a versatile crop used for food, feed, and industrial purposes. It requires full sun and fertile soil.',
  },
  {
    id: '4',
    name: 'Soybean',
    image: '/images/soyabean.jpg',
    pesticides: ['Imidacloprid', 'Thiamethoxam', 'Chlorantraniliprole'],
    fertilizers: ['NPK 12-32-16', 'Rhizobium Culture', 'Gypsum'],
    marketPrice: '₹3,800/quintal',
    description: 'Soybean is a protein-rich legume crop that grows well in warm climates and well-drained soils.',
  },
  {
    id: '5',
    name: 'Cotton',
    image: '/images/cotton.jpg',
    pesticides: ['Acephate', 'Imidacloprid', 'Spinosad'],
    fertilizers: ['NPK 20-20-20', 'Zinc Sulfate', 'Boron'],
    marketPrice: '₹6,500/quintal',
    description: 'Cotton is a fiber crop that requires long, warm growing seasons and well-drained soils.',
  },
  {
    id: '6',
    name: 'Sugarcane',
    image: '/images/sugarcane.png',
    pesticides: ['Chlorpyrifos', 'Monocrotophos', 'Imidacloprid'],
    fertilizers: ['NPK 12-32-16', 'Sulfur', 'Zinc'],
    marketPrice: '₹3,100/quintal',
    description: 'Sugarcane is a tall perennial grass used for sugar production, requiring tropical or subtropical climates.',
  },
  {
    id: '7',
    name: 'Potato',
    image: '/images/potato.png',
    pesticides: ['Mancozeb', 'Chlorothalonil', 'Metalaxyl'],
    fertilizers: ['NPK 15-15-15', 'Potash', 'Magnesium'],
    marketPrice: '₹1,500/quintal',
    description: 'Potato is a tuber crop that grows best in cool climates with well-drained, loose soil.',
  },
  {
    id: '8',
    name: 'Tomato',
    image: '/images/tomato.png',
    pesticides: ['Spinosad', 'Abamectin', 'Chlorantraniliprole'],
    fertilizers: ['NPK 19-19-19', 'Calcium Nitrate', 'Magnesium Sulfate'],
    marketPrice: '₹2,800/quintal',
    description: 'Tomato is a warm-season crop that requires full sun and well-drained, fertile soil.',
  },
  {
    id: '9',
    name: 'Chickpea',
    image: '/images/Chickpea.png',
    pesticides: ['Carbendazim', 'Mancozeb', 'Thiophanate-methyl'],
    fertilizers: ['NPK 12-32-16', 'Rhizobium Culture', 'Sulfur'],
    marketPrice: '₹5,200/quintal',
    description: 'Chickpea is a protein-rich pulse crop that grows well in cool, dry conditions.',
  }
];

export default function CropGrid() {
  const [selectedCrop, setSelectedCrop] = useState<CropInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (crop: CropInfo) => {
    setSelectedCrop(crop);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCrop(null);
  };

  return (
    <div className="container mx-auto px-4 pt-0 pb-2 bg-transparent">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {crops.map((crop) => (
          <div
            key={crop.id}
            className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white transform hover:-translate-y-2 hover:scale-[1.02] group"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={crop.image}
                alt={crop.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors duration-300">{crop.name}</h3>
              <button
                onClick={() => openModal(crop)}
                className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedCrop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative h-64 w-full">
              <div className="absolute inset-0">
                <Image
                  src={selectedCrop.image}
                  alt={selectedCrop.name}
                  fill
                  className="object-cover rounded-t-2xl"
                  sizes="(max-width: 1536px) 100vw, 1536px"
                  priority
                />
              </div>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedCrop.name}</h2>
              <p className="text-gray-600 mb-6">{selectedCrop.description}</p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Recommended Pesticides</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {selectedCrop.pesticides.map((pesticide, index) => (
                      <li key={index}>{pesticide}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Suitable Fertilizers</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {selectedCrop.fertilizers.map((fertilizer, index) => (
                      <li key={index}>{fertilizer}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Current Market Price</h3>
                  <p className="text-emerald-600 font-semibold text-xl">
                    {selectedCrop.marketPrice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 