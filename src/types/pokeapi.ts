// Tipos para a PokeAPI
export interface PokeAPIResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
    front_shiny: string | null;
    other: {
      'official-artwork': {
        front_default: string | null;
      };
      dream_world: {
        front_default: string | null;
      };
    };
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  height: number;
  weight: number;
}

// Interface adaptada para nosso sistema de cartas
export interface PokemonCarta {
  id: string;
  nome: string;
  colecao: string;
  preco: number;
  imagem: string;
  variacao?: number;
  tipo?: string;
  raridade?: string;
}

// Nomes dos Pokémons que vamos usar como base
export const POKEMON_NOMES = [
  'charizard',
  'pikachu', 
  'umbreon',
  'rayquaza',
  'lugia',
  'mewtwo',
  'garchomp',
  'alakazam',
  'dragonite',
  'gengar',
  'lucario',
  'gyarados',
  'blastoise',
  'venusaur',
  'mew',
  'celebi',
  'ho-oh',
  'kyogre',
  'groudon',
  'dialga'
] as const;

export type PokemonNome = typeof POKEMON_NOMES[number];