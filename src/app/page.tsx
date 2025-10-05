'use client';

import styles from './page.module.css';
import { PerfilUsuario, PesquisaCartas, GradeCartas, MenuInferior, type AbaMenu } from '@/components';
import type { CartaPesquisa } from '@/components';
import { useState } from 'react';

export default function Home() {
  const [abaAtiva, setAbaAtiva] = useState<AbaMenu>('home');

  // Dados mock para demonstração
  const usuario = {
    nome: "Ash Ketchum",
    valorCarteira: "R$ 12.540,00",
    variacao: {
      porcentagem: "+5,48%",
      ehPositiva: true
    }
  };

  // Função para lidar com seleção de carta na pesquisa
  const aoSelecionarCartaPesquisa = (carta: CartaPesquisa) => {
    console.log('Carta selecionada:', carta);
    // Aqui você pode implementar a lógica para adicionar à carteira, ver detalhes, etc.
  };

  // Função para lidar com mudança de aba
  const aoTrocarAba = (aba: AbaMenu) => {
    setAbaAtiva(aba);
  };

  // Renderiza conteúdo baseado na aba ativa
  const renderizarConteudo = () => {
    switch (abaAtiva) {
      case 'home':
        return (
          <div className={styles.conteudoPagina} key="home">
            <GradeCartas />
          </div>
        );
      case 'dashboard':
        return (
          <div className={styles.conteudoPagina} key="dashboard">
            <div className={styles.conteudoAba}>
              <h2>Dashboard</h2>
              <p>Análises e estatísticas das suas cartas em breve...</p>
            </div>
          </div>
        );
      case 'colecao':
        return (
          <div className={styles.conteudoPagina} key="colecao">
            <div className={styles.conteudoAba}>
              <h2>Minha Coleção</h2>
              <p>Gerencie suas cartas favoritas em breve...</p>
            </div>
          </div>
        );
      case 'perfil':
        return (
          <div className={styles.conteudoPagina} key="perfil">
            <div className={styles.conteudoAba}>
              <h2>Perfil</h2>
              <p>Configurações e dados pessoais em breve...</p>
            </div>
          </div>
        );
      default:
        return (
          <div className={styles.conteudoPagina} key="home">
            <GradeCartas />
          </div>
        );
    }
  };

  return (
    <div className={styles.container}>
      {/* Header com perfil e carteira */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <PerfilUsuario 
            nome={usuario.nome}
            valorCarteira={usuario.valorCarteira}
            variacao={usuario.variacao}
          />
          
          {/* Pesquisa de cartas logo abaixo do perfil */}
          <PesquisaCartas 
            aoSelecionarCarta={aoSelecionarCartaPesquisa}
            placeholder="Encontre sua carta favorita..."
          />
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className={styles.main}>
        {renderizarConteudo()}
      </main>

      {/* Menu inferior */}
      <MenuInferior 
        abaAtiva={abaAtiva}
        aoTrocarAba={aoTrocarAba}
      />
    </div>
  );
}
