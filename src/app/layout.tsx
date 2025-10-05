import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../styles/toast.css";
import { QueryProvider } from '@/components/providers/query-provider';
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cardly - Cartas TCG Pokémon",
  description: "Aplicação para coleção e análise de cartas TCG Pokémon com foco em responsividade mobile",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <QueryProvider>
          {children}
        </QueryProvider>
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 3000,
          }}
        />
      </body>
    </html>
  );
}
