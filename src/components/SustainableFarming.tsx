"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  FaSeedling,
  FaWater,
  FaRecycle,
  FaBug,
  FaLeaf,
  FaTree,
  FaCloudSun,
  FaDumpster,
  FaTractor,
} from "react-icons/fa";
import { Poppins, Hind } from "next/font/google";
import { useState } from "react";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const hind = Hind({
  weight: ["400", "500"],
  subsets: ["devanagari"],
  display: "swap",
  variable: "--font-hind",
});

const techniques = [
  {
    id: 1,
    title: "जैविक खेती | Organic Farming",
    description: {
      en: "Use natural fertilizers and pest control methods to maintain soil health and biodiversity. This includes composting, crop rotation, and biological pest control.",
      hi: "मिट्टी की सेहत और जैव विविधता को बनाए रखने के लिए प्राकृतिक खाद और कीट नियंत्रण विधियों का उपयोग करें। इसमें कम्पोस्टिंग, फसल चक्र और जैविक कीट नियंत्रण शामिल हैं।",
    },
    icon: <FaSeedling className="text-4xl text-green-600" />,
    fact: "Organic farming can reduce carbon footprint by 40% compared to conventional farming.",
    steps: [
      {
        en: "1. Start with soil testing and improvement",
        hi: "१. मिट्टी की जांच और सुधार से शुरुआत करें",
      },
      {
        en: "2. Use natural compost and manure",
        hi: "२. प्राकृतिक खाद और गोबर का उपयोग करें",
      },
      {
        en: "3. Implement natural pest control methods",
        hi: "३. प्राकृतिक कीट नियंत्रण विधियों को अपनाएं",
      },
    ],
  },
  {
    id: 2,
    title: "जल संरक्षण | Water Conservation",
    description: {
      en: "Implement efficient irrigation systems and water management techniques to optimize water usage in agriculture. This includes drip irrigation, rainwater harvesting, and moisture conservation.",
      hi: "कृषि में पानी के उपयोग को अनुकूलित करने के लिए कुशल सिंचाई प्रणालियों और जल प्रबंधन तकनीकों को लागू करें। इसमें ड्रिप सिंचाई, वर्षा जल संचयन और नमी संरक्षण शामिल हैं।",
    },
    icon: <FaWater className="text-4xl text-blue-500" />,
    fact: "Drip irrigation can save up to 60% water compared to traditional irrigation methods.",
    steps: [
      {
        en: "1. Install drip irrigation systems",
        hi: "१. ड्रिप सिंचाई प्रणाली स्थापित करें",
      },
      {
        en: "2. Create rainwater harvesting structures",
        hi: "२. वर्षा जल संचयन संरचनाएं बनाएं",
      },
      {
        en: "3. Use mulching to retain soil moisture",
        hi: "३. मिट्टी की नमी बनाए रखने के लिए मल्चिंग का उपयोग करें",
      },
    ],
  },
  {
    id: 3,
    title: "फसल चक्र | Crop Rotation",
    description: {
      en: "Systematically rotate different crops in the same area to improve soil health, prevent pest buildup, and optimize nutrient use. This includes alternating between legumes and non-legumes.",
      hi: "मिट्टी की सेहत में सुधार, कीटों के जमाव को रोकने और पोषक तत्वों के उपयोग को अनुकूलित करने के लिए एक ही क्षेत्र में विभिन्न फसलों को व्यवस्थित रूप से बदलें। इसमें दलहन और गैर-दलहन फसलों के बीच बदलाव शामिल है।",
    },
    icon: <FaRecycle className="text-4xl text-green-500" />,
    fact: "Crop rotation can increase yields by 10-25% while reducing fertilizer needs.",
    steps: [
      {
        en: "1. Plan seasonal crop sequences",
        hi: "१. मौसमी फसल क्रम की योजना बनाएं",
      },
      {
        en: "2. Include legumes in rotation",
        hi: "२. चक्र में दलहनी फसलें शामिल करें",
      },
      {
        en: "3. Monitor soil health between rotations",
        hi: "३. चक्रों के बीच मिट्टी की सेहत की निगरानी करें",
      },
    ],
  },
  {
    id: 4,
    title: "एकीकृत कीट प्रबंधन | Integrated Pest Management",
    description: {
      en: "Combine biological, cultural, physical, and chemical tools in a way that minimizes economic, health, and environmental risks. This includes using natural predators, resistant varieties, and monitoring pest populations.",
      hi: "आर्थिक, स्वास्थ्य और पर्यावरणीय जोखिमों को कम करने के लिए जैविक, सांस्कृतिक, भौतिक और रासायनिक उपकरणों को मिलाएं। इसमें प्राकृतिक शिकारियों का उपयोग, प्रतिरोधी किस्मों और कीट आबादी की निगरानी शामिल है।",
    },
    icon: <FaBug className="text-4xl text-amber-600" />,
    fact: "IPM can reduce pesticide use by up to 70% while maintaining crop yields.",
    steps: [
      {
        en: "1. Regular pest monitoring and identification",
        hi: "१. नियमित कीट निगरानी और पहचान",
      },
      {
        en: "2. Use of pest-resistant crop varieties",
        hi: "२. कीट-प्रतिरोधी फसल किस्मों का उपयोग",
      },
      {
        en: "3. Implement biological control methods",
        hi: "३. जैविक नियंत्रण विधियों को लागू करें",
      },
    ],
  },
  {
    id: 5,
    title: "मिश्रित खेती | Mixed Farming",
    description: {
      en: "Integrate crop cultivation with livestock farming to create a self-sustainable system. This includes using animal manure for crops and crop residues for animal feed.",
      hi: "एक स्व-टिकाऊ प्रणाली बनाने के लिए फसल की खेती को पशुपालन के साथ एकीकृत करें। इसमें फसलों के लिए पशु खाद और पशु चारे के लिए फसल अवशेषों का उपयोग शामिल है।",
    },
    icon: <FaTractor className="text-4xl text-green-600" />,
    fact: "Mixed farming can increase farm income by 30% through diversification.",
    steps: [
      {
        en: "1. Select compatible crops and livestock",
        hi: "१. संगत फसलों और पशुधन का चयन करें",
      },
      {
        en: "2. Establish crop-livestock integration",
        hi: "२. फसल-पशुधन एकीकरण स्थापित करें",
      },
      {
        en: "3. Manage nutrient cycling",
        hi: "३. पोषक तत्व चक्रण का प्रबंधन करें",
      },
    ],
  },
  {
    id: 6,
    title: "कम्पोस्ट खाद | Composting",
    description: {
      en: "Convert organic waste into nutrient-rich soil amendment through controlled decomposition. This includes kitchen waste, crop residues, and animal manure.",
      hi: "नियंत्रित अपघटन के माध्यम से जैविक कचरे को पोषक तत्वों से भरपूर मिट्टी संशोधन में बदलें। इसमें रसोई का कचरा, फसल अवशेष और पशु खाद शामिल हैं।",
    },
    icon: <FaDumpster className="text-4xl text-yellow-700" />,
    fact: "Composting can reduce chemical fertilizer needs by up to 50%.",
    steps: [
      {
        en: "1. Collect and sort organic materials",
        hi: "१. जैविक सामग्री एकत्र और छांटें",
      },
      {
        en: "2. Build and maintain compost pile",
        hi: "२. कम्पोस्ट ढेर बनाएं और बनाए रखें",
      },
      {
        en: "3. Monitor decomposition process",
        hi: "३. अपघटन प्रक्रिया की निगरानी करें",
      },
    ],
  },
  {
    id: 7,
    title: "कृषि वानिकी | Agroforestry",
    description: {
      en: "Combine trees or shrubs with crops or livestock to create a more diverse, productive, and sustainable land-use system. This includes alley cropping, windbreaks, and silvopasture.",
      hi: "अधिक विविध, उत्पादक और टिकाऊ भूमि-उपयोग प्रणाली बनाने के लिए पेड़ों या झाड़ियों को फसलों या पशुधन के साथ मिलाएं। इसमें एली क्रॉपिंग, विंडब्रेक्स और सिल्वोपास्चर शामिल हैं।",
    },
    icon: <FaTree className="text-4xl text-green-700" />,
    fact: "Agroforestry can increase farm productivity by 40-200% per acre.",
    steps: [
      {
        en: "1. Select appropriate tree species",
        hi: "१. उपयुक्त वृक्ष प्रजातियों का चयन करें",
      },
      {
        en: "2. Design planting layout",
        hi: "२. रोपण लेआउट डिजाइन करें",
      },
      {
        en: "3. Implement tree-crop management",
        hi: "३. वृक्ष-फसल प्रबंधन लागू करें",
      },
    ],
  },
  {
    id: 8,
    title: "जलवायु स्मार्ट कृषि | Climate-Smart Agriculture",
    description: {
      en: "Adopt farming practices that increase productivity while adapting to and mitigating climate change. This includes drought-resistant crops, water management, and reduced tillage.",
      hi: "जलवायु परिवर्तन के अनुकूलन और शमन के साथ-साथ उत्पादकता बढ़ाने वाली कृषि पद्धतियों को अपनाएं। इसमें सूखा प्रतिरोधी फसलें, जल प्रबंधन और कम जुताई शामिल हैं।",
    },
    icon: <FaCloudSun className="text-4xl text-sky-500" />,
    fact: "Climate-smart agriculture can help reduce greenhouse gas emissions by 20%.",
    steps: [
      {
        en: "1. Assess climate risks and vulnerabilities",
        hi: "१. जलवायु जोखिमों और कमजोरियों का आकलन करें",
      },
      {
        en: "2. Implement adaptive farming practices",
        hi: "२. अनुकूली कृषि पद्धतियों को लागू करें",
      },
      {
        en: "3. Monitor and adjust strategies",
        hi: "३. रणनीतियों की निगरानी और समायोजन करें",
      },
    ],
  },
];

const SustainableFarming: React.FC = () => {
  const [isVisible] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -90 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.1,
      rotate: 360,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className={`${poppins.className} w-full px-16 py-16 bg-gradient-to-b from-purple-100 via-purple-50 to-purple-200`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="text-center mb-12" variants={headerVariants}>
        <h2
          className={`text-5xl font-bold text-green-700 mb-4 ${hind.className}`}
        >
          सतत खेती की विधियां
        </h2>
        <h3 className="text-3xl text-green-700">
          Sustainable Farming Techniques
        </h3>
      </motion.div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="max-w-[1600px] mx-auto grid gap-8"
            variants={containerVariants}
          >
            {techniques.map((technique) => (
              <motion.div
                key={technique.id}
                variants={cardVariants}
                whileHover={{
                  scale: 1.01,
                  transition: { duration: 0.2 },
                }}
                className="relative backdrop-blur-md bg-white/40 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-purple-100"
              >
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <motion.div
                    variants={iconVariants}
                    whileHover="hover"
                    className="p-4 rounded-full bg-white/80 shadow-inner flex-shrink-0"
                  >
                    {technique.icon}
                  </motion.div>

                  <div className="flex-1 space-y-4">
                    <motion.h4
                      variants={contentVariants}
                      className="text-2xl font-semibold text-green-700"
                    >
                      <span
                        className={`${hind.className} font-medium text-green-700`}
                      >
                        {technique.title.split("|")[0]}
                      </span>
                      <span className="ml-2 text-green-700">
                        {technique.title.split("|")[1]}
                      </span>
                    </motion.h4>

                    <motion.div
                      variants={contentVariants}
                      className="space-y-2"
                    >
                      <p className="text-lg text-green-700 font-medium">
                        {technique.description.en}
                      </p>
                      <p
                        className={`${hind.className} text-lg text-green-700 font-medium`}
                      >
                        {technique.description.hi}
                      </p>
                    </motion.div>

                    <motion.div
                      variants={contentVariants}
                      className="bg-white/50 p-4 rounded-lg space-y-3"
                    >
                      <div className="flex items-center gap-2">
                        <motion.div
                          whileHover={{
                            scale: 1.15,
                            rotate: 360,
                            transition: { duration: 0.3 },
                          }}
                        >
                          <FaLeaf className="text-4xl text-green-600 flex-shrink-0" />
                        </motion.div>
                        <p className="text-base text-green-700 font-medium">
                          <span className="font-semibold">Did you know? </span>
                          {technique.fact}
                        </p>
                      </div>

                      <div className="border-t border-green-100 pt-3">
                        <motion.h5
                          variants={contentVariants}
                          className="text-xl font-semibold text-green-700 mb-2"
                        >
                          <span>Implementation Steps</span>
                          <span
                            className={`${hind.className} ml-2 font-medium`}
                          >
                            | कार्यान्वयन चरण
                          </span>
                        </motion.h5>
                        <ul className="space-y-2">
                          {technique.steps.map((step, idx) => (
                            <motion.li
                              key={idx}
                              variants={stepVariants}
                              custom={idx}
                              className="flex flex-col text-base text-green-700"
                            >
                              <span className="font-medium">{step.en}</span>
                              <span className={`${hind.className} font-medium`}>
                                {step.hi}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-300/30 to-transparent rounded-tr-2xl -z-10"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-200/30 to-transparent rounded-bl-2xl -z-10"
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SustainableFarming;
