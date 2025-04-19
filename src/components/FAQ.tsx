'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How can I get expert advice for my crops?",
    answer: "You can connect with agricultural experts through our Expert Forum section. Simply post your question with relevant details and photos if needed, and our verified experts will provide personalized advice within 24 hours."
  },
  {
    question: "How often are mandi prices updated?",
    answer: "Mandi prices are updated multiple times throughout the day. Most markets update their prices twice daily - once in the morning and once in the evening. You can see the last update time for each price listing."
  },
  {
    question: "Can I get weather forecasts for my specific location?",
    answer: "Yes, you can get detailed weather forecasts for your specific location. Enter your village or city name in the Weather section to receive local weather updates, including temperature, rainfall predictions, and agricultural weather advisories."
  },
  {
    question: "How do I identify crop diseases?",
    answer: "You can identify crop diseases by uploading clear photos of the affected plants in our Expert Forum. Our system uses AI to provide initial identification, and agricultural experts will confirm the diagnosis and suggest treatment options."
  },
  {
    question: "Is the platform available in regional languages?",
    answer: "Yes, AgriMitra supports multiple Indian languages including Hindi, Marathi, Punjabi, and more. You can switch languages using the language selector in the top menu to view content in your preferred language."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-5xl font-bold text-center text-green-500 mb-12">
        Frequently Asked Questions
      </h1>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="overflow-hidden"
            initial={false}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-6 flex justify-between items-center bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors duration-200"
            >
              <span className="text-lg font-medium text-green-800">
                {faq.question}
              </span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaChevronDown className="text-green-600 text-xl" />
              </motion.div>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white px-6 py-4 rounded-b-lg border-2 border-t-0 border-green-100"
                >
                  <p className="text-gray-600">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 