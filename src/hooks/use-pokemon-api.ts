import { useQuery } from '@tanstack/react-query';
import { PokemonCard, PokemonSet, CardSearch } from '@/types/pokemon';

// Simulação de API - substitua por APIs reais posteriormente
const MOCK_DELAY = 1000;

const mockCards: PokemonCard[] = [
  {
    id: '1',
    name: 'Pikachu',
    set: 'Base Set',
    number: '25',
    rarity: 'Common',
    price: {
      low: 1.50,
      mid: 3.00,
      high: 5.00,
      market: 3.25,
      directLow: 2.00,
    },
    lastUpdated: new Date().toISOString(),
    imageUrl: '/placeholder-card.jpg',
  },
  {
    id: '2',
    name: 'Charizard',
    set: 'Base Set',
    number: '4',
    rarity: 'Holo Rare',
    price: {
      low: 150.00,
      mid: 300.00,
      high: 500.00,
      market: 325.00,
      directLow: 200.00,
    },
    lastUpdated: new Date().toISOString(),
    imageUrl: '/placeholder-card.jpg',
  },
];

const mockSets: PokemonSet[] = [
  {
    id: 'base1',
    name: 'Base Set',
    series: 'Base',
    releaseDate: '1998-01-09',
    total: 102,
    images: {
      symbol: '/placeholder-symbol.png',
      logo: '/placeholder-logo.png',
    },
  },
];

// Simulação de chamada de API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Hook para buscar cartas
export const useSearchCards = (search: CardSearch) => {
  return useQuery({
    queryKey: ['cards', search],
    queryFn: async (): Promise<PokemonCard[]> => {
      await delay(MOCK_DELAY);
      
      let filteredCards = mockCards;
      
      if (search.query) {
        filteredCards = filteredCards.filter(card =>
          card.name.toLowerCase().includes(search.query.toLowerCase())
        );
      }
      
      if (search.set) {
        filteredCards = filteredCards.filter(card =>
          card.set.toLowerCase().includes(search.set!.toLowerCase())
        );
      }
      
      if (search.rarity) {
        filteredCards = filteredCards.filter(card =>
          card.rarity.toLowerCase().includes(search.rarity!.toLowerCase())
        );
      }
      
      return filteredCards;
    },
    enabled: !!search.query || !!search.set,
  });
};

// Hook para buscar carta específica
export const useCard = (cardId: string) => {
  return useQuery({
    queryKey: ['card', cardId],
    queryFn: async (): Promise<PokemonCard | null> => {
      await delay(MOCK_DELAY);
      return mockCards.find(card => card.id === cardId) || null;
    },
    enabled: !!cardId,
  });
};

// Hook para buscar sets
export const useSets = () => {
  return useQuery({
    queryKey: ['sets'],
    queryFn: async (): Promise<PokemonSet[]> => {
      await delay(MOCK_DELAY);
      return mockSets;
    },
  });
};

// Hook para buscar cartas populares/em alta
export const usePopularCards = () => {
  return useQuery({
    queryKey: ['popular-cards'],
    queryFn: async (): Promise<PokemonCard[]> => {
      await delay(MOCK_DELAY);
      // Retorna as cartas com maior valor de mercado
      return mockCards.sort((a, b) => b.price.market - a.price.market);
    },
  });
};