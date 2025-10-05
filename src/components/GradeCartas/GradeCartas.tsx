'use client';

import styles from './GradeCartas.module.css';
import { useCartasPopulares } from '@/hooks/usePokemon';
import { PokemonCarta } from '@/types/pokeapi';

interface GradeCartasProps {
  cartas?: PokemonCarta[];
}

export default function GradeCartas({ cartas }: GradeCartasProps) {
  // Usa React Query para buscar cartas populares
  const { data: cartasPopulares, isLoading, error } = useCartasPopulares(12);
  
  // Usa cartas passadas como prop ou cartas da API
  const cartasParaExibir = cartas || cartasPopulares || [];
  const formatarPreco = (preco: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco);
  };

  const formatarVariacao = (variacao: number) => {
    const sinal = variacao >= 0 ? '+' : '';
    return `${sinal}${variacao.toFixed(1)}%`;
  };

  // Estados de loading e erro
  if (isLoading && cartasParaExibir.length === 0) {
    return (
      <section className={styles.secaoGrade}>
        <div className={styles.cabecalho}>
          <h2 className={styles.titulo}>Cartas em Alta</h2>
          <p className={styles.subtitulo}>Carregando cotações...</p>
        </div>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
        </div>
      </section>
    );
  }

  if (error && cartasParaExibir.length === 0) {
    return (
      <section className={styles.secaoGrade}>
        <div className={styles.cabecalho}>
          <h2 className={styles.titulo}>Cartas em Alta</h2>
          <p className={styles.subtitulo}>Erro ao carregar cotações</p>
        </div>
        <div className={styles.erro}>
          <p>Não foi possível carregar as cartas. Tente novamente.</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.secaoGrade}>
      <div className={styles.cabecalho}>
        <h2 className={styles.titulo}>Cartas em Alta</h2>
        <p className={styles.subtitulo}>Acompanhe as cotações mais atualizadas</p>
      </div>
      
      <div className={styles.grade}>
        {cartasParaExibir.map((carta) => (
          <div key={carta.id} className={styles.cartaContainer}>
            <div className={styles.imagemContainer}>
              <img 
                src={carta.imagem} 
                alt={carta.nome}
                className={styles.imagemCarta}
              />
            </div>
            
            <div className={styles.infoCarta}>
              <div className={styles.cabecalhoCarta}>
                <span className={styles.colecao}>{carta.colecao}</span>
                <h3 className={styles.nomeCarta}>{carta.nome}</h3>
              </div>
              
              <div className={styles.precoContainer}>
                <span className={styles.preco}>
                  {formatarPreco(carta.preco)}
                </span>
                {carta.variacao !== undefined && (
                  <span 
                    className={`${styles.variacao} ${
                      carta.variacao >= 0 ? styles.positiva : styles.negativa
                    }`}
                  >
                    {formatarVariacao(carta.variacao)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}