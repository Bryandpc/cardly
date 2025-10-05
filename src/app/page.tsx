'use client';

import styles from './page.module.css';
import { PerfilUsuario, PesquisaCartas, GradeCartas, MenuInferior, VisualizadorCarta, Dashboard, type AbaMenu } from '@/components';
import type { CartaPesquisa } from '@/components';
import { useState } from 'react';
import { PokemonCarta } from '@/types/pokeapi';

type TelaAtiva = 'principal' | 'visualizador';

export default function Home() {
  const [abaAtiva, setAbaAtiva] = useState<AbaMenu>('home');
  const [telaAtiva, setTelaAtiva] = useState<TelaAtiva>('principal');
  const [cartaSelecionada, setCartaSelecionada] = useState<PokemonCarta | null>(null);

  // Dados mock para demonstração
  const usuario = {
    nome: "Ash Ketchum"
  };

  // Função para lidar com seleção de carta na pesquisa
  const aoSelecionarCartaPesquisa = (carta: CartaPesquisa) => {
    console.log('Carta selecionada:', carta);
    // Aqui você pode implementar a lógica para adicionar à carteira, ver detalhes, etc.
  };

  // Função para lidar com mudança de aba
  const aoTrocarAba = (aba: AbaMenu) => {
    setAbaAtiva(aba);
    setTelaAtiva('principal'); // Sempre volta para tela principal quando troca de aba
    setCartaSelecionada(null); // Remove carta selecionada
  };

  // Função para ir para visualização da carta
  const irParaVisualizacao = (carta: PokemonCarta) => {
    setCartaSelecionada(carta);
    setTelaAtiva('visualizador');
  };

  // Função para voltar à tela principal
  const voltarParaPrincipal = () => {
    setTelaAtiva('principal');
    setCartaSelecionada(null);
  };

  // Renderiza conteúdo baseado na tela ativa
  const renderizarConteudo = () => {
    // Se estiver visualizando uma carta, mostra apenas o visualizador
    if (telaAtiva === 'visualizador' && cartaSelecionada) {
      return (
        <VisualizadorCarta 
          carta={cartaSelecionada}
          aoVoltar={voltarParaPrincipal}
        />
      );
    }
    
    // Caso contrário, mostra o conteúdo baseado na aba
    switch (abaAtiva) {
      case 'home':
        return (
          <div className={styles.conteudoPagina} key="home">
            <GradeCartas aoSelecionarCarta={irParaVisualizacao} />
          </div>
        );
      case 'dashboard':
        return (
          <div className={styles.conteudoPagina} key="dashboard">
            <Dashboard 
              nomeUsuario={usuario.nome}
            />
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
      {/* Header com perfil e carteira - sempre mostra exceto no visualizador */}
      {!(telaAtiva === 'visualizador' && cartaSelecionada) && (
        <header className={styles.header} data-main-header>
          <div className={styles.headerContent}>
            <PerfilUsuario 
              nome={usuario.nome}
            />
            
            {/* Pesquisa de cartas logo abaixo do perfil */}
            <PesquisaCartas 
              aoSelecionarCarta={aoSelecionarCartaPesquisa}
              placeholder="Encontre sua carta favorita..."
            />
          </div>
        </header>
      )}

      {/* Conteúdo principal */}
      <main className={styles.main}>
        {renderizarConteudo()}
      </main>

      {/* Menu inferior - sempre visível */}
      <MenuInferior 
        abaAtiva={abaAtiva}
        aoTrocarAba={aoTrocarAba}
      />
    </div>
  );
}
