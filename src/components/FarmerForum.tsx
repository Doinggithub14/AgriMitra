'use client';

import { useState, useEffect } from 'react';
import { FaUser, FaLeaf, FaSearch, FaComment, FaThumbsUp, FaShare } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
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

interface Question {
  id: number;
  title: string;
  description: string;
  category: string;
  author: string;
  date: string;
  answers: number;
  likes: number;
  expertAnswered: boolean;
}

const categories = [
  { id: 'crops', name: 'Crop Management', icon: '🌾' },
  { id: 'pests', name: 'Pest Control', icon: '🐛' },
  { id: 'soil', name: 'Soil Health', icon: '🌱' },
  { id: 'weather', name: 'Weather & Climate', icon: '⛅' },
  { id: 'market', name: 'Market Prices', icon: '💰' },
  { id: 'equipment', name: 'Farming Equipment', icon: '🚜' },
];

const sampleQuestions: Question[] = [
  {
    id: 1,
    title: "How to control whitefly in cotton crop?",
    description: "I'm seeing whiteflies in my cotton field. What's the best organic way to control them?",
    category: "pests",
    author: "Rajesh Kumar",
    date: "2 hours ago",
    answers: 5,
    likes: 12,
    expertAnswered: true,
  },
  {
    id: 2,
    title: "Best time to sow wheat in North India?",
    description: "When is the ideal time to sow wheat in Punjab region?",
    category: "crops",
    author: "Amarjeet Singh",
    date: "5 hours ago",
    answers: 3,
    likes: 8,
    expertAnswered: true,
  },
];

const FarmerForum = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAskQuestion, setShowAskQuestion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredQuestions = sampleQuestions.filter(question => {
    const matchesCategory = selectedCategory === 'all' || question.category === selectedCategory;
    const matchesSearch = question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         question.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (!mounted) {
    return null; // or a loading skeleton
  }

  return (
    <div className={`${poppins.className} ${inter.className} max-w-6xl mx-auto p-4`}>
      {/* Header Section */}
      <div className="text-center mb-8">
        <AnimatePresence>
          <motion.div
            key="header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-green-800 mb-2">
              किसान सहायता फोरम / Farmer Help Forum
            </h1>
            <p className="text-xl text-green-600 mb-6">
              Ask questions, share knowledge, and connect with experts
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Search and Ask Question */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search questions..."
            className="w-full p-4 pl-12 rounded-xl border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500" />
        </div>
        <button
          onClick={() => setShowAskQuestion(true)}
          className="bg-green-600 text-white px-6 py-4 rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          <FaComment />
          Ask a Question
        </button>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 rounded-xl border-2 text-center transition-all ${
                selectedCategory === category.id
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-green-200 hover:border-green-300'
              }`}
            >
              <span className="text-2xl mb-2 block">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        <AnimatePresence mode="wait">
          {filteredQuestions.map((question) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-green-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <FaUser className="text-green-600 text-xl" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-green-800">{question.title}</h3>
                    {question.expertAnswered && (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                        <FaLeaf className="text-green-600" />
                        Expert Answered
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mt-2">{question.description}</p>
                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <FaUser className="text-green-600" />
                      {question.author}
                    </span>
                    <span>{question.date}</span>
                    <span className="flex items-center gap-1">
                      <FaComment className="text-green-600" />
                      {question.answers} answers
                    </span>
                    <span className="flex items-center gap-1">
                      <FaThumbsUp className="text-green-600" />
                      {question.likes}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Ask Question Modal */}
      <AnimatePresence>
        {showAskQuestion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-2xl w-full"
            >
              <h2 className="text-2xl font-bold text-green-800 mb-4">Ask Your Question</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    className="w-full p-3 rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="What's your question?"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Description</label>
                  <textarea
                    className="w-full p-3 rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    rows={4}
                    placeholder="Provide more details about your question..."
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Category</label>
                  <select className="w-full p-3 rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500">
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShowAskQuestion(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                  >
                    Post Question
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FarmerForum; 