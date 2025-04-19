'use client';

import { useState, useEffect } from 'react';
import { FaUser, FaLeaf, FaSearch, FaComment, FaThumbsUp, FaShare, FaTimes, FaEye } from 'react-icons/fa';
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

interface Answer {
  id: number;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  likes: number;
  isExpert: boolean;
  attachments?: string[];
  comments?: Comment[];
}

interface Comment {
  id: number;
  content: string;
  author: string;
  date: string;
  likes: number;
}

interface Question {
  id: number;
  title: string;
  description: string;
  category: string;
  author: string;
  date: string;
  answers: Answer[];
  likes: number;
  expertAnswered: boolean;
  views: number;
  tags: string[];
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
    answers: [
      {
        id: 1,
        content: "For organic whitefly control in cotton, I recommend the following integrated approach:\n\n1. Neem oil spray (2%) every 10 days\n2. Yellow sticky traps (10 per acre)\n3. Release of Encarsia formosa (parasitic wasp)\n4. Intercropping with marigold\n\nThis combination has shown 80% reduction in whitefly population in my trials.",
        author: "Dr. Anil Verma",
        authorRole: "Entomologist, ICAR",
        date: "1 hour ago",
        likes: 25,
        isExpert: true,
        attachments: ["/images/whitefly-control.jpg"],
        comments: [
          {
            id: 1,
            content: "Thank you for the detailed response. What's the best time to apply neem oil?",
            author: "Rajesh Kumar",
            date: "45 minutes ago",
            likes: 3
          },
          {
            id: 2,
            content: "Early morning or late evening is best to avoid leaf burn.",
            author: "Dr. Anil Verma",
            date: "30 minutes ago",
            likes: 5
          }
        ]
      },
      {
        id: 2,
        content: "I've had success with a homemade garlic-chili spray. Mix 100g garlic + 50g chili in 1L water, boil, cool, and spray.",
        author: "Suresh Patel",
        authorRole: "Organic Farmer",
        date: "30 minutes ago",
        likes: 12,
        isExpert: false
      }
    ],
    likes: 12,
    expertAnswered: true,
    views: 156,
    tags: ["cotton", "whitefly", "organic", "pest-control"]
  },
  {
    id: 2,
    title: "Best time to sow wheat in North India?",
    description: "When is the ideal time to sow wheat in Punjab region?",
    category: "crops",
    author: "Amarjeet Singh",
    date: "5 hours ago",
    answers: [
      {
        id: 1,
        content: "For Punjab region, the optimal wheat sowing window is:\n\n- Early varieties: 25th Oct to 10th Nov\n- Medium varieties: 10th Nov to 25th Nov\n- Late varieties: 25th Nov to 10th Dec\n\nSoil temperature should be around 20-22°C for best germination.",
        author: "Dr. Harpreet Kaur",
        authorRole: "Agronomist, PAU",
        date: "4 hours ago",
        likes: 18,
        isExpert: true,
        attachments: ["/images/wheat-sowing-chart.jpg"]
      }
    ],
    likes: 8,
    expertAnswered: true,
    views: 89,
    tags: ["wheat", "sowing", "punjab", "timing"]
  },
  {
    id: 3,
    title: "How to improve soil fertility naturally?",
    description: "Looking for organic methods to enhance soil fertility in my vegetable farm.",
    category: "soil",
    author: "Meena Patel",
    date: "1 day ago",
    answers: [
      {
        id: 1,
        content: "Here are some effective organic methods to improve soil fertility:\n\n1. Composting: Create a mix of kitchen waste, farm waste, and cow dung\n2. Green Manuring: Grow and plow under leguminous crops like dhaincha\n3. Vermicompost: Use earthworms to create nutrient-rich compost\n4. Biochar: Add charred organic matter to improve soil structure",
        author: "Dr. Ravi Sharma",
        authorRole: "Soil Scientist, KVK",
        date: "20 hours ago",
        likes: 15,
        isExpert: true,
        attachments: ["/images/soil-fertility.jpg"],
        comments: [
          {
            id: 1,
            content: "How often should we apply vermicompost?",
            author: "Meena Patel",
            date: "18 hours ago",
            likes: 2
          },
          {
            id: 2,
            content: "Apply 2-3 tons per acre every 3 months for best results.",
            author: "Dr. Ravi Sharma",
            date: "17 hours ago",
            likes: 4
          }
        ]
      },
      {
        id: 2,
        content: "I've had great results with crop rotation and mulching. Also, try using neem cake as a natural fertilizer.",
        author: "Vijay Kumar",
        authorRole: "Organic Farmer",
        date: "15 hours ago",
        likes: 8,
        isExpert: false
      }
    ],
    likes: 15,
    expertAnswered: true,
    views: 100,
    tags: ["soil", "fertility", "organic", "vegetable-farm"]
  },
  {
    id: 4,
    title: "Monsoon delay impact on kharif crops",
    description: "How should I adjust my farming schedule due to delayed monsoon this year?",
    category: "weather",
    author: "Suresh Yadav",
    date: "3 hours ago",
    answers: [
      {
        id: 1,
        content: "For delayed monsoon, consider these adjustments:\n\n1. Shift to short-duration varieties\n2. Use drought-resistant seeds\n3. Implement water conservation techniques\n4. Consider staggered sowing\n5. Prepare for possible pest outbreaks",
        author: "Dr. Priya Singh",
        authorRole: "Agrometeorologist, IMD",
        date: "2 hours ago",
        likes: 12,
        isExpert: true,
        attachments: ["/images/monsoon-crops.jpg"]
      }
    ],
    likes: 10,
    expertAnswered: false,
    views: 75,
    tags: ["monsoon", "delay", "kharif-crops", "farming-schedule"]
  },
  {
    id: 5,
    title: "Current market rate for organic tomatoes",
    description: "What are the current market prices for organic tomatoes in Delhi NCR region?",
    category: "market",
    author: "Priya Sharma",
    date: "6 hours ago",
    answers: [
      {
        id: 1,
        content: "Current organic tomato prices in Delhi NCR:\n\n- Azadpur Mandi: ₹45-50/kg\n- Ghazipur Mandi: ₹42-48/kg\n- Okhla Mandi: ₹48-52/kg\n\nPrices are expected to rise by 10% next week due to increased demand.",
        author: "Rahul Verma",
        authorRole: "Market Analyst, APMC",
        date: "4 hours ago",
        likes: 8,
        isExpert: true,
        attachments: ["/images/tomato-prices.jpg"]
      }
    ],
    likes: 6,
    expertAnswered: true,
    views: 50,
    tags: ["market", "prices", "organic", "tomatoes"]
  },
  {
    id: 6,
    title: "Recommended tractor for 5-acre farm",
    description: "Which tractor model would be best for a 5-acre mixed crop farm? Budget around 7 lakhs.",
    category: "equipment",
    author: "Harinder Singh",
    date: "1 day ago",
    answers: [
      {
        id: 1,
        content: "For a 5-acre mixed crop farm, I recommend:\n\n1. Swaraj 744 FE (45 HP) - ₹6.8 lakhs\n2. Mahindra 475 DI (45 HP) - ₹7.2 lakhs\n3. Sonalika DI 745 (45 HP) - ₹6.9 lakhs\n\nAll these models offer good fuel efficiency and are suitable for multiple farming operations.",
        author: "Amit Kumar",
        authorRole: "Agricultural Equipment Specialist",
        date: "22 hours ago",
        likes: 14,
        isExpert: true,
        attachments: ["/images/tractor-models.jpg"]
      }
    ],
    likes: 14,
    expertAnswered: true,
    views: 120,
    tags: ["tractor", "5-acre", "mixed-crop", "budget"]
  },
  {
    id: 7,
    title: "Natural pest control for rice crops",
    description: "What are some effective natural methods to control pests in rice cultivation?",
    category: "pests",
    author: "Ramesh Verma",
    date: "4 hours ago",
    answers: [
      {
        id: 1,
        content: "For natural pest control in rice:\n\n1. Use neem-based products\n2. Implement trap crops\n3. Release beneficial insects\n4. Maintain proper water levels\n5. Use pheromone traps",
        author: "Dr. Anjali Mishra",
        authorRole: "Entomologist, ICAR",
        date: "3 hours ago",
        likes: 9,
        isExpert: true,
        attachments: ["/images/rice-pests.jpg"]
      }
    ],
    likes: 9,
    expertAnswered: false,
    views: 90,
    tags: ["rice", "pests", "natural", "cultivation"]
  },
  {
    id: 8,
    title: "Soil testing labs in Maharashtra",
    description: "Can anyone recommend good soil testing laboratories in Maharashtra region?",
    category: "soil",
    author: "Anita Patil",
    date: "2 days ago",
    answers: [
      {
        id: 1,
        content: "Here are some reliable soil testing labs in Maharashtra:\n\n1. Soil Testing Lab, Pune (Government)\n2. Krishi Vigyan Kendra, Nagpur\n3. Agricultural University Lab, Rahuri\n4. Private Lab: Agro Labs, Mumbai\n\nAll provide comprehensive soil analysis and recommendations.",
        author: "Dr. Sanjay Deshmukh",
        authorRole: "Soil Scientist, KVK",
        date: "1 day ago",
        likes: 11,
        isExpert: true,
        attachments: ["/images/soil-labs.jpg"]
      }
    ],
    likes: 11,
    expertAnswered: true,
    views: 60,
    tags: ["soil", "testing", "Maharashtra", "laboratories"]
  }
];

const FarmerForum = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAskQuestion, setShowAskQuestion] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [mounted, setMounted] = useState(false);
  const [newAnswer, setNewAnswer] = useState('');
  const [questions, setQuestions] = useState<Question[]>(sampleQuestions);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePostAnswer = () => {
    if (!selectedQuestion || !newAnswer.trim()) return;

    const newAnswerObj: Answer = {
      id: Date.now(),
      content: newAnswer,
      author: "Current User", // This would be replaced with actual user data
      authorRole: "Farmer",
      date: "Just now",
      likes: 0,
      isExpert: false
    };

    const updatedQuestions = questions.map(q => {
      if (q.id === selectedQuestion.id) {
        return {
          ...q,
          answers: [...q.answers, newAnswerObj]
        };
      }
      return q;
    });

    setQuestions(updatedQuestions);
    setNewAnswer('');
  };

  const filteredQuestions = questions.filter(question => {
    const matchesCategory = selectedCategory === 'all' || question.category === selectedCategory;
    const matchesSearch = question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         question.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (!mounted) {
    return null;
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
              onClick={() => setSelectedQuestion(question)}
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
                  <div className="flex flex-wrap gap-2 mt-3">
                    {question.tags.map((tag, index) => (
                      <span key={index} className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <FaUser className="text-green-600" />
                      {question.author}
                    </span>
                    <span>{question.date}</span>
                    <span className="flex items-center gap-1">
                      <FaComment className="text-green-600" />
                      {question.answers.length} answers
                    </span>
                    <span className="flex items-center gap-1">
                      <FaThumbsUp className="text-green-600" />
                      {question.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaEye className="text-green-600" />
                      {question.views} views
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Question Detail Modal */}
      <AnimatePresence>
        {selectedQuestion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedQuestion(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-green-800">{selectedQuestion.title}</h2>
                <button
                  onClick={() => setSelectedQuestion(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-600">{selectedQuestion.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedQuestion.tags.map((tag, index) => (
                    <span key={index} className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {selectedQuestion.answers.map((answer) => (
                  <div key={answer.id} className="border-b border-gray-200 pb-6 last:border-0">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-full ${answer.isExpert ? 'bg-green-100' : 'bg-gray-100'}`}>
                        <FaUser className={`text-xl ${answer.isExpert ? 'text-green-600' : 'text-gray-600'}`} />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-green-800">{answer.author}</h4>
                            <p className="text-sm text-gray-500">{answer.authorRole}</p>
                          </div>
                          {answer.isExpert && (
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                              <FaLeaf className="text-green-600" />
                              Expert
                            </span>
                          )}
                        </div>
                        <div className="mt-3 whitespace-pre-line text-gray-700">
                          {answer.content}
                        </div>
                        {answer.attachments && answer.attachments.length > 0 && (
                          <div className="mt-4 grid grid-cols-2 gap-4">
                            {answer.attachments.map((attachment, index) => (
                              <img
                                key={index}
                                src={attachment}
                                alt="Attachment"
                                className="rounded-lg w-full h-48 object-cover"
                              />
                            ))}
                          </div>
                        )}
                        <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                          <span>{answer.date}</span>
                          <span className="flex items-center gap-1">
                            <FaThumbsUp className="text-green-600" />
                            {answer.likes}
                          </span>
                        </div>
                        {answer.comments && answer.comments.length > 0 && (
                          <div className="mt-4 space-y-3">
                            {answer.comments.map((comment) => (
                              <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                                <div className="flex justify-between items-start">
                                  <span className="font-medium text-gray-800">{comment.author}</span>
                                  <span className="text-sm text-gray-500">{comment.date}</span>
                                </div>
                                <p className="mt-1 text-gray-600">{comment.content}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <button className="text-gray-500 hover:text-gray-700">
                                    <FaThumbsUp className="text-sm" />
                                  </button>
                                  <span className="text-sm text-gray-500">{comment.likes}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-bold text-green-800 mb-4">Your Answer</h3>
                <textarea
                  className="w-full p-4 rounded-xl border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={4}
                  placeholder="Write your answer here..."
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                  <button 
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                    onClick={handlePostAnswer}
                  >
                    Post Answer
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                <div>
                  <label className="block text-gray-700 mb-2">Tags</label>
                  <input
                    type="text"
                    className="w-full p-3 rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Add tags (comma separated)"
                  />
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