'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'

interface QueryProviderProps {
  children: ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
  // Criar uma nova instância do QueryClient no lado do cliente
  const [queryClient] = useState(
    () =>
      new QueryClient({
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
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}