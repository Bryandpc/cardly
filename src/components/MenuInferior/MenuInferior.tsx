'use client';

import { useState } from 'react';
import styles from './MenuInferior.module.css';
import { HiHome } from 'react-icons/hi2';
import { HiChartBarSquare } from 'react-icons/hi2';
import { HiRectangleStack } from 'react-icons/hi2';
import { HiUser } from 'react-icons/hi2';

export type AbaMenu = 'home' | 'dashboard' | 'colecao' | 'perfil';

interface MenuInferiorProps {
  abaAtiva?: AbaMenu;
  aoTrocarAba?: (aba: AbaMenu) => void;
}

interface ItemMenu {
  id: AbaMenu;
  icone: React.ComponentType<{ className?: string }>;
  rotulo: string;
}

const itensMenu: ItemMenu[] = [
  {
    id: 'home',
    icone: HiHome,
    rotulo: 'Home'
  },
  {
    id: 'dashboard',
    icone: HiChartBarSquare,
    rotulo: 'Dashboard'
  },
  {
    id: 'colecao',
    icone: HiRectangleStack,
    rotulo: 'Coleção'
  },
  {
    id: 'perfil',
    icone: HiUser,
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
        {itensMenu.map((item) => {
          const IconeComponente = item.icone;
          return (
            <button
              key={item.id}
              onClick={() => handleTrocarAba(item.id)}
              className={`${styles.itemMenu} ${
                abaAtual === item.id ? styles.ativo : ''
              }`}
              type="button"
            >
              <IconeComponente className={styles.icone} />
              <span className={styles.rotulo}>{item.rotulo}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}