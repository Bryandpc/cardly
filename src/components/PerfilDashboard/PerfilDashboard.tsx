'use client';

import styles from './PerfilDashboard.module.css';
import { HiArrowTrendingUp, HiArrowTrendingDown } from 'react-icons/hi2';

interface VariacaoInfo {
  porcentagem: string;
  ehPositiva: boolean;
}

interface PerfilDashboardProps {
  nome: string;
  valorCarteira: string;
  variacao: VariacaoInfo;
}

export default function PerfilDashboard({ nome, valorCarteira, variacao }: PerfilDashboardProps) {
  return (
    <div className={styles.container}>
      {/* Seção do Perfil - igual às outras telas */}
      <div className={styles.secaoPerfil}>
        <div className={styles.avatar}>
          <span className={styles.textoAvatar}>
            {nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </span>
        </div>
        
        <div className={styles.infoPerfil}>
          <h1 className={styles.nomeUsuario}>{nome}</h1>
          <div className={styles.carteiraInfo}>
            <span className={styles.valorCarteira}>{valorCarteira}</span>
            <span className={`${styles.variacaoCarteira} ${variacao.ehPositiva ? styles.variacaoPositiva : styles.variacaoNegativa}`}>
              {variacao.ehPositiva ? <HiArrowTrendingUp size={16} /> : <HiArrowTrendingDown size={16} />}
              {variacao.porcentagem}
            </span>
          </div>
        </div>
      </div>

      {/* Título da Página */}
      <div className={styles.tituloPagina}>
        <h2 className={styles.titulo}>Dashboard</h2>
        <p className={styles.subtitulo}>Acompanhe sua coleção</p>
      </div>
    </div>
  );
}