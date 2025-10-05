'use client';

import { useState } from 'react';
import styles from './MenuInferior.module.css';

export type AbaMenu = 'home' | 'dashboard' | 'colecao' | 'perfil';

interface MenuInferiorProps {
  abaAtiva?: AbaMenu;
  aoTrocarAba?: (aba: AbaMenu) => void;
}

interface ItemMenu {
  id: AbaMenu;
  rotulo: string;
}

const itensMenu: ItemMenu[] = [
  {
    id: 'home',
    rotulo: 'Home'
  },
  {
    id: 'dashboard',
    rotulo: 'Dashboard'
  },
  {
    id: 'colecao',
    rotulo: 'Coleção'
  },
  {
    id: 'perfil',
    rotulo: 'Perfil'
  }
];

export default function MenuInferior({ abaAtiva = 'home', aoTrocarAba }: MenuInferiorProps) {
  const [abaAtual, setAbaAtual] = useState<AbaMenu>(abaAtiva);

  const handleTrocarAba = (aba: AbaMenu) => {
    setAbaAtual(aba);
    aoTrocarAba?.(aba);
  };

  return (
    <nav className={styles.menuInferior}>
      <div className={styles.containerMenu}>
        <div className={styles.indicadorAtivo} 
             style={{ 
               transform: `translateX(${itensMenu.findIndex(item => item.id === abaAtual) * 100}%)` 
             }} 
        />
        {itensMenu.map((item) => (
          <button
            key={item.id}
            onClick={() => handleTrocarAba(item.id)}
            className={`${styles.itemMenu} ${
              abaAtual === item.id ? styles.ativo : ''
            }`}
            type="button"
          >
            <span className={styles.rotulo}>{item.rotulo}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}