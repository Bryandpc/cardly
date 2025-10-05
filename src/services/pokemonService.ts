import { PokeAPIResponse, PokemonCarta, POKEMON_NOMES } from '@/types/pokeapi';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

// Cache simples para evitar requisições desnecessárias
const cache = new Map<string, PokeAPIResponse>();

export class PokemonService {
  // Busca um Pokémon específico da PokeAPI
  static async buscarPokemon(nome: string): Promise<PokeAPIResponse> {
    const nomeFormatado = nome.toLowerCase().trim();
    
    // Verifica cache primeiro
    if (cache.has(nomeFormatado)) {
      return cache.get(nomeFormatado)!;
    }

    try {
      const response = await fetch(`${BASE_URL}/${nomeFormatado}`);
      
      if (!response.ok) {
        throw new Error(`Erro ao buscar Pokémon: ${response.statusText}`);
      }

      const pokemon: PokeAPIResponse = await response.json();
      
      // Salva no cache
      cache.set(nomeFormatado, pokemon);
      
      return pokemon;
    } catch (error) {
      console.error(`Erro ao buscar ${nome}:`, error);
      throw error;
    }
  }

  // Converte dados da PokeAPI para nosso formato de carta
  static converterParaCarta(pokemon: PokeAPIResponse): PokemonCarta {
    const colecoes = [
      'Paldea Evolved',
      'Vivid Voltage', 
      'Evolving Skies',
      'Silver Tempest',
      'Temporal Forces',
      'Paradox Rift',
      'Obsidian Flames',
      'Paldean Fates'
    ];

    const raridadeOptions = ['Common', 'Uncommon', 'Rare', 'Ultra Rare', 'Secret Rare'];
    
    // Gera preço baseado no ID do Pokémon (para consistência)
    const precoBase = Math.sin(pokemon.id) * 50 + 75; // Entre 25-125
    const preco = Math.abs(precoBase);
    
    // Gera variação baseada no nome (para consistência)
    const variacaoSeed = pokemon.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const variacao = ((variacaoSeed % 30) - 15) / 10; // Entre -1.5% e +1.5%

    // Seleciona imagem (prioriza official-artwork)
    const imagem = pokemon.sprites.other['official-artwork'].front_default ||
                   pokemon.sprites.other.dream_world.front_default ||
                   pokemon.sprites.front_default ||
                   '/api/placeholder/200/280';

    return {
      id: pokemon.id.toString(),
      nome: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
      colecao: colecoes[pokemon.id % colecoes.length],
      preco: Math.round(preco * 100) / 100,
      imagem,
      variacao: Math.round(variacao * 10) / 10,
      tipo: pokemon.types[0]?.type.name || 'normal',
      raridade: raridadeOptions[pokemon.id % raridadeOptions.length]
    };
  }

  // Busca múltiplos Pokémons em paralelo
  static async buscarMultiplosPokemon(nomes: string[]): Promise<PokemonCarta[]> {
    try {
      const promessas = nomes.map(nome => this.buscarPokemon(nome));
      const pokemons = await Promise.all(promessas);
      
      return pokemons.map(pokemon => this.converterParaCarta(pokemon));
    } catch (error) {
      console.error('Erro ao buscar múltiplos Pokémons:', error);
      throw error;
    }
  }

  // Busca cartas populares (usando nossa lista base)
  static async buscarCartasPopulares(limite: number = 12): Promise<PokemonCarta[]> {
    const nomesAleatorios = [...POKEMON_NOMES]
      .sort(() => Math.random() - 0.5)
      .slice(0, limite);

    return this.buscarMultiplosPokemon(nomesAleatorios);
  }

  // Busca para a funcionalidade de pesquisa
  static async pesquisarPokemon(termo: string): Promise<PokemonCarta[]> {
    const termoPesquisa = termo.toLowerCase().trim();
    
    if (termoPesquisa.length < 2) {
      return [];
    }

    // Filtra nomes que contém o termo de pesquisa
    const nomesEncontrados = POKEMON_NOMES.filter(nome => 
      nome.includes(termoPesquisa)
    );

    // Se não encontrou nomes parciais, tenta busca exata
    if (nomesEncontrados.length === 0) {
      try {
        const pokemon = await this.buscarPokemon(termoPesquisa);
        return [this.converterParaCarta(pokemon)];
      } catch {
        return [];
      }
    }

    return this.buscarMultiplosPokemon(nomesEncontrados);
  }
}