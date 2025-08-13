import { Inter } from 'next/font/google';

import './globals.css';

// Components:
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { ServerStatusWatcher } from '@/components/ServerStatusWatcher';

// Interfaces:
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sistema de Administração',
  description: 'Sistema de administração para aplicativo mobile'
  // icons: {
  //   // ícone padrão usado como favicon
  //   icon: '/icon.png',
  //   // atalho (alguns navegadores usam esse rel)
  //   shortcut: '/icon.png'
  // }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='pt-BR'>
      <head>{/* <link rel='icon' href='/icon.png' /> */}</head>

      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
          <Toaster />

          <ServerStatusWatcher>
            <AuthProvider>{children}</AuthProvider>
          </ServerStatusWatcher>
        </ThemeProvider>
      </body>
    </html>
  );
}
