import PesticideRecommender from "@/components/PesticideRecommender";

export default function PesticideRecommenderPage() {
  return (


    
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-green-900 to-green-500 text-transparent bg-clip-text">Pesticide Recommender</h1>
      <p className="text-xl text-gray-600 mb-8">Get personalized pesticide recommendations based on your crop and pest problems.</p>
      <PesticideRecommender />
    </div>
  );
}
