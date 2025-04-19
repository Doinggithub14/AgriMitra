import CropGrid from "@/components/CropGrid";

export default function CropsPage() {
  return (
    <div className="min-h-screen bg-white -mt-[88px] pt-[88px]">
      <div className="max-w-7xl mx-auto px-4 pt-2 pb-4">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Crop Recommendations</h1>
          <p className="text-xl text-gray-600">Discover the best crops for your farm with our comprehensive recommendations</p>
        </div>
        <CropGrid />
      </div>
    </div>
  );
} 