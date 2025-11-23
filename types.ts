export interface CountryOption {
  id: string;
  name: string;
  flag: string;
  promptAdjective: string; // e.g., "Japanese" for "Japanese clothing"
  description: string;
}

export interface GenerationState {
  isLoading: boolean;
  error: string | null;
  resultImage: string | null;
}

export const COUNTRIES: CountryOption[] = [
  { id: 'jp', name: 'Japan', flag: '🇯🇵', promptAdjective: 'Japanese Kimono', description: 'Elegant silk patterns' },
  { id: 'fr', name: 'France', flag: '🇫🇷', promptAdjective: 'French Beret and Striped Shirt', description: 'Chic Parisian style' },
  { id: 'mx', name: 'Mexico', flag: '🇲🇽', promptAdjective: 'Mexican Mariachi or Poncho', description: 'Vibrant and festive' },
  { id: 'uk', name: 'UK', flag: '🇬🇧', promptAdjective: 'British Royal Guard or Tweed', description: 'Classic and regal' },
  { id: 'cn', name: 'China', flag: '🇨🇳', promptAdjective: 'Chinese Tang Suit', description: 'Traditional festive wear' },
  { id: 'us', name: 'USA', flag: '🇺🇸', promptAdjective: 'American Cowboy', description: 'Wild West style' },
  { id: 'in', name: 'India', flag: '🇮🇳', promptAdjective: 'Indian Sherwani or Saree', description: 'Colorful and ornate' },
  { id: 'de', name: 'Germany', flag: '🇩🇪', promptAdjective: 'German Lederhosen', description: 'Bavarian folk style' },
];