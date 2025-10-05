'use client';

import styles from './VisualizadorCarta.module.css';
import { HiArrowLeft, HiStar, HiArrowTrendingUp, HiArrowTrendingDown, HiMinus } from 'react-icons/hi2';
import { PokemonCarta } from '@/types/pokeapi';
import { useState, useRef } from 'react';
import Botao from '../Botao/Botao';
import { FiFolderPlus } from 'react-icons/fi';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { HiRectangleStack } from 'react-icons/hi2';
import { useToasts } from '@/hooks';
import { GraficoEvolucao } from '@/components';

interface VisualizadorCartaProps {
  carta: PokemonCarta | null;
  aoVoltar: () => void;
}

export default function VisualizadorCarta({ carta, aoVoltar }: VisualizadorCartaProps) {
  const [favoritada, setFavoritada] = useState(false);
  const [animandoColecao, setAnimandoColecao] = useState(false);
  const botaoRef = useRef<HTMLDivElement>(null);
  const toasts = useToasts();
  
  if (!carta) return null;

  // Dados mockados do gráfico baseados no ID da carta
  const gerarDadosGrafico = () => {
    const seed = parseInt(carta.id) || 1;
    const dadosGrafico = [];
    let precoBase = carta.preco * 0.7; // Começa com 70% do preço atual
    
    // Gera 12 pontos (últimos 12 meses)
    for (let i = 11; i >= 0; i--) {
      const data = new Date();
      data.setMonth(data.getMonth() - i);
      
      // Variação baseada no seed para consistência
      const variacao = Math.sin((seed + i) * 0.5) * 0.15 + 
                       Math.cos((seed * 2 + i) * 0.3) * 0.08;
      
      precoBase = precoBase * (1 + variacao);
      
      // Garante que o último ponto seja o preço atual
      const preco = i === 0 ? carta.preco : precoBase;
      
      dadosGrafico.push({
        data: data.toLocaleDateString('pt-BR', { month: '2-digit', day: '2-digit' }),
        preco: Math.round(preco * 100) / 100,
        precoFormatado: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(preco)
      });
    }
    
    return dadosGrafico;
  };

  // Calcula estatísticas do gráfico
  const calcularEstatisticas = (dados: any[]) => {
    const precos = dados.map(d => d.preco);
    const precoMinimo = Math.min(...precos);
    const precoMaximo = Math.max(...precos);
    const precoMedio = precos.reduce((a, b) => a + b, 0) / precos.length;
    
    const precoInicial = dados[0].preco;
    const precoFinal = dados[dados.length - 1].preco;
    const variacaoPercentual = ((precoFinal - precoInicial) / precoInicial) * 100;
    
    let tendencia: 'alta' | 'baixa' | 'estavel';
    if (variacaoPercentual > 5) {
      tendencia = 'alta';
    } else if (variacaoPercentual < -5) {
      tendencia = 'baixa';
    } else {
      tendencia = 'estavel';
    }

    return {
      precoMinimo,
      precoMaximo,
      precoMedio,
      variacaoPercentual,
      tendencia
    };
  };

  const dadosGrafico = gerarDadosGrafico();
  const estatisticas = calcularEstatisticas(dadosGrafico);

  // Ícone da tendência
  const IconeTendencia = () => {
    switch (estatisticas.tendencia) {
      case 'alta':
        return <HiArrowTrendingUp className={styles.iconeAlta} />;
      case 'baixa':
        return <HiArrowTrendingDown className={styles.iconeBaixa} />;
      default:
        return <HiMinus className={styles.iconeEstavel} />;
    }
  };

  // Cores baseadas na tendência
  const corLinha = estatisticas.tendencia === 'alta' 
    ? '#10b981' 
    : estatisticas.tendencia === 'baixa' 
    ? '#dc2626' 
    : '#3b82f6';

  const handleFavoritar = () => {
    setFavoritada(!favoritada);
    
    if (!favoritada) {
      toasts.adicionarFavoritos();
    } else {
      toasts.removerFavoritos();
    }
  };

  const handleAdicionarColecao = () => {
    if (animandoColecao) return; // Previne múltiplos cliques durante a animação
    
    setAnimandoColecao(true);
    
    // Adicionar efeito de feedback visual imediato
    if (botaoRef.current) {
      botaoRef.current.style.transform = 'scale(0.95)';
      setTimeout(() => {
        if (botaoRef.current) {
          botaoRef.current.style.transform = 'scale(1)';
        }
      }, 150);
    }
    
    // Simula uma operação de adicionar à coleção
    setTimeout(() => {
      setAnimandoColecao(false);
      
      // Toast de sucesso com animação customizada
      toasts.adicionarColecao(carta.nome);
      
      // Aqui você pode adicionar a lógica real de adicionar à coleção
      console.log('Carta adicionada à coleção:', carta.nome);
    }, 1400); // Duração da animação
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
          <h2 className={styles.nomeCartaInfo}>{carta.nome}</h2>
          <p className={styles.colecao}>{carta.colecao}</p>
          
          <p className={styles.raridadeNumero}>
            {carta.raridade && <span>{carta.raridade}</span>}
            {carta.raridade && carta.id && <span> • </span>}
            <span>#{carta.id}</span>
          </p>

          <div className={styles.informacoesAdicionais}>
            <div ref={botaoRef}>
              <Botao
                  icone={<FiFolderPlus />}
                  texto={animandoColecao ? "Adicionando..." : "Adicionar à coleção"}
                  onClick={handleAdicionarColecao}
                  customClass={`${styles.botaoAdicionar} ${animandoColecao ? styles.botaoAnimando : ''}`}
              >
              </Botao>
            </div>
            
            <div className={styles.precoContainer}>
                <span className={styles.labelPreco}>Valor atual</span>
                <div className={styles.precoContainerPrincipal}>
                    <span
                      className={`${styles.precoContainerIcone} ${
                        carta.variacao !== undefined
                          ? carta.variacao >= 0
                            ? styles.positiva
                            : styles.negativa
                          : ''
                      }`}
                    >
                      {carta.variacao !== undefined
                        ? carta.variacao >= 0
                          ? <IoMdArrowDropup />
                          : <IoMdArrowDropdown />
                        : null}
                    </span>
                    <span className={styles.preco}>
                        {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(carta.preco)}
                    </span>
                </div>
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
          </div>

          {/* Evolução de Preço */}
          <GraficoEvolucao dados={dadosGrafico} corLinha={corLinha} />
        </div>
      </div>

      {/* Bolinha de animação */}
      {animandoColecao && (
        <div className={styles.bolinhaAnimacao}>
          <HiRectangleStack size={20} />
        </div>
      )}
    </div>
  );
}