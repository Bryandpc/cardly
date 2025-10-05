import { QueryClient } from '@tanstack/react-query'

// Configuração do QueryClient para gerenciamento de cache
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache por 5 minutos
      staleTime: 1000 * 60 * 5,
      // Manter cache por 10 minutos após ficar inativo
      gcTime: 1000 * 60 * 10,
      // Revalidar quando a janela ganhar foco
      refetchOnWindowFocus: true,
      // Retry automático em caso de erro
      retry: 2,
    },
  },
})