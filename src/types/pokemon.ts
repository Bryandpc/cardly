// Tipos para cartas TCG Pokémon
export interface PokemonCard {
  id: string;
  name: string;
  set: string;
  number: string;
  rarity: string;
  price: {
    low: number;
    mid: number;
    high: number;
    market: number;
    directLow: number;
  };
  lastUpdated: string;
  imageUrl?: string;
}

export interface PokemonSet {
  id: string;
  name: string;
  series: string;
  releaseDate: string;
  total: number;
  images: {
    symbol: string;
    logo: string;
  };
}

export interface PriceHistory {
  date: string;
  price: number;
}

export interface CardSearch {
  query: string;
  set?: string;
  rarity?: string;
  page?: number;
  limit?: number;
}