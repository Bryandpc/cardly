import { useState, useEffect } from 'react';
import styles from './PesquisaCartas.module.css';
import { usePesquisarPokemon } from '@/hooks/usePokemon';
import { PokemonCarta } from '@/types/pokeapi';

export interface CartaPesquisa {
  id: string;
  nome: string;
  conjunto: string;
  numero: string;
  raridade: string;
  preco: string;
  imagem?: string;
}

interface PesquisaCartasProps {
  aoSelecionarCarta: (carta: CartaPesquisa) => void;
  placeholder?: string;
}

export function PesquisaCartas({ aoSelecionarCarta, placeholder = "Encontre sua carta favorita..." }: PesquisaCartasProps) {
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  
  // Usa React Query para buscar Pokémon
  const { data: resultados = [], isLoading } = usePesquisarPokemon(termoPesquisa);

  // Função para converter PokemonCarta para CartaPesquisa
  const converterParaCartaPesquisa = (pokemon: PokemonCarta): CartaPesquisa => ({
    id: pokemon.id,
    nome: pokemon.nome,
    conjunto: pokemon.colecao,
    numero: '#' + pokemon.id.padStart(3, '0'),
    raridade: pokemon.raridade || 'Common',
    preco: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(pokemon.preco),
    imagem: pokemon.imagem
  });

  // Controla exibição do dropdown baseado no termo e resultados
  useEffect(() => {
    if (termoPesquisa.trim().length < 2) {
      setMostrarDropdown(false);
      return;
    }
    
    if (resultados.length > 0) {
      setMostrarDropdown(true);
    }
  }, [termoPesquisa, resultados]);

  const selecionarCarta = (pokemon: PokemonCarta) => {
    const cartaPesquisa = converterParaCartaPesquisa(pokemon);
    setTermoPesquisa(pokemon.nome);
    setMostrarDropdown(false);
    aoSelecionarCarta(cartaPesquisa);
  };

  const limparPesquisa = () => {
    setTermoPesquisa('');
    setMostrarDropdown(false);
  };

  return (
    <div className={styles.containerPesquisa}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={termoPesquisa}
          onChange={(e) => setTermoPesquisa(e.target.value)}
          onFocus={() => resultados.length > 0 && setMostrarDropdown(true)}
          placeholder={placeholder}
          className={styles.inputPesquisa}
        />
        
        {termoPesquisa && (
          <button 
            onClick={limparPesquisa}
            className={styles.botaoLimpar}
            type="button"
          >
            ✕
          </button>
        )}
      </div>

      {mostrarDropdown && termoPesquisa.trim().length >= 2 && (
        <div className={styles.dropdown}>
          {isLoading ? (
            <div className={styles.nenhumResultado}>
              Buscando...
            </div>
          ) : resultados.length > 0 ? (
            <ul className={styles.listaResultados}>
              {resultados.map((pokemon) => (
                <li
                  key={pokemon.id}
                  onClick={() => selecionarCarta(pokemon)}
                  className={styles.itemResultado}
                >
                  <div className={styles.infoCartaResultado}>
                    <div className={styles.nomeConjunto}>
                      <strong>{pokemon.nome}</strong>
                      <span className={styles.conjunto}>{pokemon.colecao} #{pokemon.id.padStart(3, '0')}</span>
                    </div>
                    <div className={styles.precoRaridade}>
                      <span className={styles.preco}>
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(pokemon.preco)}
                      </span>
                      <span className={styles.raridade}>{pokemon.raridade}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.nenhumResultado}>
              Nenhuma carta encontrada para "{termoPesquisa}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}