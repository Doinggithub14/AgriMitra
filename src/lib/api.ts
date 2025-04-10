import { Pesticide } from "@/types/pesticide";

export const getPesticidesForCrop = async (crop: string) => {
  try {
    const res = await fetch(
      `GET https://perenual.com/api/v2/species-list?key=sk-1sN967f6987d6c90d9701`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    return data.data; // returns array of plants
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};
