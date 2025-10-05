# 🎴 Cardly

> **Um aplicativo moderno para acompanhar cotações de cartas Pokémon TCG**

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React Query](https://img.shields.io/badge/React%20Query-5.0-red?style=for-the-badge&logo=react-query)](https://tanstack.com/query)
[![CSS Modules](https://img.shields.io/badge/CSS-Modules-green?style=for-the-badge&logo=css3)](https://github.com/css-modules/css-modules)

## 🚀 **Sobre o Projeto**

Cardly é uma aplicação mobile-first desenvolvida em **Next.js** que permite aos usuários acompanhar cotações de cartas Pokémon TCG em tempo real. Com uma interface moderna e intuitiva, o app oferece uma experiência fluida para colecionadores e traders.

### ✨ **Principais Funcionalidades**

- 📱 **Design Mobile-First**: Interface otimizada para dispositivos móveis
- 🔍 **Pesquisa Inteligente**: Busca de cartas com autocomplete e debounce
- 💰 **Cotações em Tempo Real**: Acompanhe preços e variações do mercado
- 🎯 **Cache Inteligente**: Sistema de cache otimizado com React Query
- 🎨 **Interface Moderna**: Design elegante com animações suaves
- 🌐 **Integração com APIs**: Conectado à PokeAPI para dados reais

## 🛠️ **Stack Tecnológica**

### **Frontend**
- **Next.js 15.5.4** - Framework React com App Router
- **TypeScript** - Tipagem estática para maior segurança
- **CSS Modules** - Estilização componentizada e scoped
- **React Query** - Gerenciamento de estado e cache de APIs

### **APIs Integradas**
- **PokeAPI** - Dados oficiais dos Pokémons
- **Sistema de Cache** - Otimização de performance

### **Arquitetura**
- **Componentização** - Componentes reutilizáveis em português
- **Services Layer** - Separação clara de responsabilidades
- **Custom Hooks** - Lógica reutilizável com React Query
- **TypeScript Types** - Tipagem completa da aplicação

## 📁 **Estrutura do Projeto**

```
src/
├── app/                    # App Router do Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página inicial
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── PerfilUsuario/     # Perfil e carteira do usuário
│   ├── PesquisaCartas/    # Sistema de busca
│   ├── GradeCartas/       # Grid de cartas populares
│   └── MenuInferior/      # Navegação inferior
├── services/              # Camada de serviços
│   └── pokemonService.ts  # Integração com PokeAPI
├── hooks/                 # Custom hooks React Query
│   └── usePokemon.ts      # Hooks para dados Pokémon
└── types/                 # Definições TypeScript
    ├── pokemon.ts         # Tipos para cartas TCG
    └── pokeapi.ts         # Tipos da PokeAPI
```

## 🏃‍♂️ **Como Executar**

### **Pré-requisitos**
- Node.js 18+ 
- npm, yarn, pnpm ou bun

### **Instalação**

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/cardly.git

# Entre na pasta do projeto
cd cardly

# Instale as dependências
npm install
# ou
yarn install
```

### **Desenvolvimento**

```bash
# Inicie o servidor de desenvolvimento
npm run dev

# Acesse http://localhost:3000
```

### **Build de Produção**

```bash
# Gere o build otimizado
npm run build

# Inicie o servidor de produção
npm start
```

## 🎯 **Funcionalidades Implementadas**

### ✅ **Concluído**
- [x] Setup inicial do Next.js com TypeScript
- [x] Sistema de componentes com CSS Modules
- [x] Integração com React Query para cache
- [x] Pesquisa de cartas com autocomplete
- [x] Grade de cartas populares
- [x] Menu de navegação inferior animado
- [x] Integração com PokeAPI
- [x] Design responsivo mobile-first
- [x] Animações suaves de transição

### 🚧 **Em Desenvolvimento**
- [ ] Dashboard com estatísticas
- [ ] Sistema de coleção pessoal
- [ ] Perfil do usuário completo
- [ ] Notificações de preços
- [ ] Histórico de cotações

### 🔮 **Futuras Features**
- [ ] Login e autenticação
- [ ] Lista de desejos
- [ ] Comparador de preços
- [ ] Sistema de alertas
- [ ] Integração com marketplaces

## 🎨 **Design System**

### **Cores Principais**
- **Primária**: `#2563eb` (Azul)
- **Secundária**: `#64748b` (Cinza)
- **Sucesso**: `#16a34a` (Verde)
- **Erro**: `#dc2626` (Vermelho)

### **Tipografia**
- **Fonte**: Geist (Vercel Font)
- **Mobile-first**: Design otimizado para telas pequenas
- **Responsivo**: Breakpoints bem definidos

## 📊 **Performance**

- ⚡ **Cache Inteligente**: React Query com 10min de cache
- 🚀 **Debounce**: Pesquisa otimizada com 300ms de delay
- 📱 **Mobile Optimized**: Bundle otimizado para dispositivos móveis
- 🎯 **Code Splitting**: Carregamento otimizado de componentes

## 🤝 **Contribuição**

Contribuições são sempre bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 **Licença**

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 **Autor**

Desenvolvido com ❤️ por **Bryan**

---

<div align="center">
  <strong>🎴 Cardly - Sua central de cotações Pokémon TCG</strong>
</div>
