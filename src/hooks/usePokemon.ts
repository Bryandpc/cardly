import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { PokemonService } from '@/services/pokemonService';
import { PokemonCarta } from '@/types/pokeapi';

// Hook para buscar cartas populares
export function useCartasPopulares(limite: number = 12): UseQueryResult<PokemonCarta[], Error> {
  return useQuery({
    queryKey: ['cartas-populares', limite],
    queryFn: () => PokemonService.buscarCartasPopulares(limite),
    staleTime: 1000 * 60 * 10, // 10 minutos
    gcTime: 1000 * 60 * 30, // 30 minutos
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

// Hook para pesquisar Pokémon
export function usePesquisarPokemon(termo: string): UseQueryResult<PokemonCarta[], Error> {
  return useQuery({
    queryKey: ['pesquisar-pokemon', termo],
    queryFn: () => PokemonService.pesquisarPokemon(termo),
    enabled: termo.length >= 2, // Só executa se tiver pelo menos 2 caracteres
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 15, // 15 minutos
    retry: 1,
  });
}

// Hook para buscar um Pokémon específico
export function usePokemon(nome: string): UseQueryResult<PokemonCarta, Error> {
  return useQuery({
    queryKey: ['pokemon', nome],
    queryFn: async () => {
      const pokemon = await PokemonService.buscarPokemon(nome);
      return PokemonService.converterParaCarta(pokemon);
    },
    enabled: Boolean(nome),
    staleTime: 1000 * 60 * 15, // 15 minutos
    gcTime: 1000 * 60 * 60, // 1 hora
    retry: 2,
  });
}

// Hook para buscar múltiplos Pokémons
export function useMultiplosPokemon(nomes: string[]): UseQueryResult<PokemonCarta[], Error> {
  return useQuery({
    queryKey: ['multiplos-pokemon', nomes.sort().join(',')],
    queryFn: () => PokemonService.buscarMultiplosPokemon(nomes),
    enabled: nomes.length > 0,
    staleTime: 1000 * 60 * 10, // 10 minutos
    gcTime: 1000 * 60 * 30, // 30 minutos
    retry: 2,
  });
}