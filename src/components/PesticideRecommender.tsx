"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // ✅ Add this

interface Entry {
  crop: string;
  disease: string;
  pesticide: string;
  amount: string;
  dosage: string;
}

export default function PesticideRecommender() {
  const [data, setData] = useState<Entry[]>([]);
  const [crop, setCrop] = useState("");
  const [disease, setDisease] = useState("");
  const [result, setResult] = useState<Entry | null>(null);

  // Load JSON data on component mount
  useEffect(() => {
    fetch("/data/pesticides.json")
      .then((res) => res.json())
      .then((json) => {
        console.log("Loaded JSON:", json);
        setData(json);
      })
      .catch((err) => {
        console.error("Error loading JSON:", err);
      });
  }, []);

  // Match logic
  const handleRecommend = () => {
    const cropInput = crop.trim().toLowerCase();
    const diseaseInput = disease.trim().toLowerCase();

    const match = data.find(
      (entry) =>
        entry.crop.trim().toLowerCase() === cropInput &&
        entry.disease.trim().toLowerCase() === diseaseInput
    );

    setResult(match || null);
  };

  return (
    <div>
      <motion.div
        className="bg-white p-6 rounded-2xl shadow-lg max-w-xl mx-auto mt-10"
        initial={{ opacity: 0, y: 30 }}     // 👈 Start hidden and below
        animate={{ opacity: 1, y: 0 }}      // 👈 Animate into place
        transition={{ duration: 0.6, ease: "easeOut" }} // 👈 Smooth transition
      >
        <input
          type="text"
          placeholder="Enter Crop (e.g., Wheat)"
          className="w-full mb-3 border border-gray-300 p-3 rounded-lg"
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Disease (e.g., Rust)"
          className="w-full mb-3 border border-gray-300 p-3 rounded-lg"
          value={disease}
          onChange={(e) => setDisease(e.target.value)}
        />

        <button
          onClick={handleRecommend}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Get Recommendation
        </button>

        {result ? (
          <div className="mt-5 bg-green-100 border border-green-300 text-green-800 p-4 rounded-xl">
            <strong>Recommended Pesticide:</strong>
            <p className="mt-1">
              <span className="font-semibold">{result.pesticide}</span>
            </p>
            <p>
              <strong>Dosage:</strong> {result.dosage}
            </p>
            <p>
              <strong>Price:</strong> {result.amount}
            </p>
          </div>
        ) : (
          crop && disease && (
            <div className="mt-5 bg-red-100 border border-red-300 text-red-800 p-4 rounded-xl">
              ❌ No recommendation found for this combination.
            </div>
          )
        )}
      </motion.div>
    </div>
  );
}
