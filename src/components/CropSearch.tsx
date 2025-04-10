"use client";

import { useState } from "react";

interface CropSearchProps {
  onSearch: (crop: string) => void;
}

const CropSearch: React.FC<CropSearchProps> = ({ onSearch }) => {
  const [crop, setCrop] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!crop) return;
    onSearch(crop);
    setCrop("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Enter Crop Name..."
        value={crop}
        onChange={(e) => setCrop(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </form>
  );
};

export default CropSearch;
