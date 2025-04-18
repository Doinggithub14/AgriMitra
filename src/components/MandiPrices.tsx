'use client';

import { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown, FaRupeeSign, FaLeaf } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Poppins, Inter } from 'next/font/google';

const poppins = Poppins({ 
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

interface MandiPrice {
  cropName: string;
  cropNameHindi: string;
  price: number;
  mandiName: string;
  mandiNameHindi: string;
  priceChange: number;
  lastUpdated: string;
}

const MandiPrices = () => {
  const [prices, setPrices] = useState<MandiPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchMandiPrices = async () => {
      try {
        // Mock data for demonstration
        const mockData: MandiPrice[] = [
          {
            cropName: "Wheat",
            cropNameHindi: "गेहूं",
            price: 2200,
            mandiName: "Delhi Mandi",
            mandiNameHindi: "दिल्ली मंडी",
            priceChange: 50,
            lastUpdated: "2 hours ago"
          },
          {
            cropName: "Rice",
            cropNameHindi: "चावल",
            price: 1800,
            mandiName: "Delhi Mandi",
            mandiNameHindi: "दिल्ली मंडी",
            priceChange: -30,
            lastUpdated: "1 hour ago"
          },
          {
            cropName: "Potato",
            cropNameHindi: "आलू",
            price: 1200,
            mandiName: "Delhi Mandi",
            mandiNameHindi: "दिल्ली मंडी",
            priceChange: 20,
            lastUpdated: "3 hours ago"
          }
        ];
        
        setPrices(mockData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch mandi prices. Please try again later.");
        setLoading(false);
      }
    };

    fetchMandiPrices();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-2xl text-green-600 animate-pulse">Loading prices...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center p-4">
        {error}
      </div>
    );
  }

  return (
    <div className={`${poppins.className} ${inter.className} max-w-4xl mx-auto p-4`}>
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-green-800 mb-2">
            आज के मंडी भाव
          </h2>
          <h3 className="text-2xl text-green-600">
            Today's Mandi Prices
          </h3>
          <div className="flex justify-center mt-4">
            <FaLeaf className="text-green-500 text-2xl animate-pulse" />
          </div>
        </motion.div>
      </div>
      
      <div className="grid gap-8">
        {prices.map((price, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-green-100 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-50 rounded-full -ml-12 -mb-12 opacity-50"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold text-green-700">
                    {price.cropName}
                  </h3>
                  <p className="text-xl text-green-600">
                    {price.cropNameHindi}
                  </p>
                  <p className="text-gray-600 mt-2">
                    {price.mandiName} ({price.mandiNameHindi})
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center justify-end">
                    <FaRupeeSign className="text-2xl text-green-600" />
                    <span className="text-4xl font-bold ml-1">{price.price}</span>
                    <span className="text-sm text-gray-500 ml-2">/ quintal</span>
                  </div>
                  
                  <div className={`flex items-center justify-end mt-2 ${
                    price.priceChange >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {price.priceChange >= 0 ? (
                      <FaArrowUp className="mr-1" />
                    ) : (
                      <FaArrowDown className="mr-1" />
                    )}
                    <span>{Math.abs(price.priceChange)}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-gray-500 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Last updated: {price.lastUpdated}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MandiPrices; 