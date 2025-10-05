'use client';

import styles from './VisualizadorCarta.module.css';
import { HiArrowLeft, HiStar } from 'react-icons/hi2';
import { PokemonCarta } from '@/types/pokeapi';
import { useState } from 'react';

interface VisualizadorCartaProps {
  carta: PokemonCarta | null;
  aoVoltar: () => void;
}

export default function VisualizadorCarta({ carta, aoVoltar }: VisualizadorCartaProps) {
  const [favoritada, setFavoritada] = useState(false);
  
  if (!carta) return null;

  const handleFavoritar = () => {
    setFavoritada(!favoritada);
    // Aqui você pode adicionar lógica para salvar no estado global ou API
  };

  return (
    <div className={styles.visualizador}>
      {/* Header com botão voltar e favoritar */}
      <header className={styles.header}>
        <button 
          className={styles.botaoVoltar}
          onClick={aoVoltar}
          aria-label="Voltar"
        >
          <HiArrowLeft size={24} />
        </button>
        <h1 className={styles.nomeCarta}>{carta.nome}</h1>
        <button 
          className={`${styles.botaoFavoritar} ${favoritada ? styles.favoritada : ''}`}
          onClick={handleFavoritar}
          aria-label={favoritada ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          <HiStar size={24} />
        </button>
      </header>

      {/* Conteúdo principal */}
      <div className={styles.conteudo}>
        {/* Imagem da carta - sem enquadramento */}
        <div className={styles.containerImagem}>
          <img 
            src={carta.imagem} 
            alt={carta.nome}
            className={styles.imagemCarta}
          />
        </div>

        {/* Informações da carta */}
        <div className={styles.informacoes}>
          {/* Nome da carta */}
          <h2 className={styles.nomeCartaInfo}>{carta.nome}</h2>
          
          {/* Coleção */}
          <p className={styles.colecao}>Coleção: {carta.colecao}</p>
          
          {/* Raridade e número */}
          <p className={styles.raridadeNumero}>
            {carta.raridade && <span>{carta.raridade}</span>}
            {carta.raridade && carta.id && <span> • </span>}
            <span>#{carta.id}</span>
          </p>
          
          {/* Preço */}
          <div className={styles.precoContainer}>
            <span className={styles.preco}>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(carta.preco)}
            </span>
            {carta.variacao !== undefined && (
              <span 
                className={`${styles.variacao} ${
                  carta.variacao >= 0 ? styles.positiva : styles.negativa
                }`}
              >
                {carta.variacao >= 0 ? '+' : ''}{carta.variacao.toFixed(1)}%
              </span>
            )}
          </div>
          
          {/* Botão de adicionar à coleção */}
          <button className={styles.botaoAdicionarColecao}>
            Adicionar à Coleção
          </button>
        </div>
      </div>
    </div>
  );
}