'use client';

import styles from './Dashboard.module.css';
import GraficoColecao from '../GraficoColecao/GraficoColecao';
import { HiStar, HiChartBarSquare } from 'react-icons/hi2';

interface DashboardProps {
  nomeUsuario?: string; // Tornando opcional já que não está sendo usado
}

export default function Dashboard({ }: DashboardProps) {
  // Dados mock internos para carteira
  const dadosCarteira = {
    valorCarteira: "R$ 12.540,00",
    variacao: {
      porcentagem: "+5,48%",
      ehPositiva: true
    }
  };
  // Dados mockados para o gráfico
  const gerarDadosColecao = () => {
    const dadosValor = [];
    let valorBase = 8500;

    for (let i = 5; i >= 0; i--) {
      const data = new Date();
      data.setMonth(data.getMonth() - i);
      
      // Crescimento gradual com algumas variações
      const crescimentoValor = Math.random() * 1000 + 500;
      valorBase += crescimentoValor;

      const periodo = data.toLocaleDateString('pt-BR', { 
        month: 'short', 
        year: '2-digit' 
      });

      dadosValor.push({
        periodo,
        valor: Math.round(valorBase),
        cartas: 0 // Não usado neste caso
      });
    }

    return dadosValor;
  };

  const dadosGrafico = gerarDadosColecao();

  // Apenas 2 estatísticas
  const estatisticas = [
    {
      titulo: 'Total de Cartas',
      valor: '73',
      icone: <HiChartBarSquare />,
      cor: 'azul'
    },
    {
      titulo: 'Favoritas',
      valor: '28',
      icone: <HiStar />,
      cor: 'roxo'
    }
  ];

  return (
    <div className={styles.dashboard}>
      {/* Valor da Carteira */}
      <div className={styles.cabecalho}>
        <div className={styles.valorPrincipal}>
          <h1 className={styles.valorCarteira}>{dadosCarteira.valorCarteira}</h1>
          <div className={`${styles.variacao} ${dadosCarteira.variacao.ehPositiva ? styles.variacaoPositiva : styles.variacaoNegativa}`}>
            <span>{dadosCarteira.variacao.porcentagem}</span>
          </div>
        </div>
        <p className={styles.subtitulo}>Valor total da coleção</p>
      </div>

      {/* Gráfico Principal */}
      <div className={styles.graficoDestaque}>
        <GraficoColecao dados={dadosGrafico} tipo="valor" />
      </div>

      {/* Cards de estatísticas abaixo do gráfico */}
      <div className={styles.estatisticas}>
        {estatisticas.map((stat, index) => (
          <div key={index} className={`${styles.cardEstatistica} ${styles[stat.cor]}`}>
            <div className={styles.iconeEstatistica}>
              {stat.icone}
            </div>
            <div className={styles.dadosEstatistica}>
              <h3 className={styles.valorEstatistica}>{stat.valor}</h3>
              <p className={styles.tituloEstatistica}>{stat.titulo}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Resumo moderno */}
      <div className={styles.resumoModerno}>
        <h2 className={styles.tituloResumo}>Atividade Recente</h2>
        <div className={styles.cardsResumo}>
          <div className={styles.cardResumo}>
            <div className={styles.indicadorCard}></div>
            <div className={styles.conteudoCard}>
              <span className={styles.numeroCard}>+8</span>
              <span className={styles.textoCard}>Cartas este mês</span>
            </div>
          </div>
          <div className={styles.cardResumo}>
            <div className={styles.indicadorCard} style={{backgroundColor: '#10b981'}}></div>
            <div className={styles.conteudoCard}>
              <span className={styles.numeroCard}>+R$ 1.240</span>
              <span className={styles.textoCard}>Crescimento</span>
            </div>
          </div>
          <div className={styles.cardResumo}>
            <div className={styles.indicadorCard} style={{backgroundColor: '#f59e0b'}}></div>
            <div className={styles.conteudoCard}>
              <span className={styles.numeroCard}>Charizard GX</span>
              <span className={styles.textoCard}>Mais valiosa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}