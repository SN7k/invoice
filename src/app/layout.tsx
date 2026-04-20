import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/context/theme-context';
import SecurityGuard from '@/components/security/security-guard';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SmartBill Admin Panel | SNK DevWorks',
  description: 'A polished admin dashboard built with Next.js. Copyright by SNK DevWorks.',
  applicationName: 'SmartBill Admin Panel',
  creator: 'SNK DevWorks',
  publisher: 'SNK DevWorks',
  authors: [{ name: 'SNK DevWorks' }],
  other: {
    copyright: 'Copyright by SNK DevWorks'
  }
};

const themeInitScript = `
(() => {
  const storageKey = 'invoice-theme-preference';
  const root = document.documentElement;

  let preference = 'system';
  try {
    const saved = window.localStorage.getItem(storageKey);
    if (saved === 'dark' || saved === 'light' || saved === 'system') {
      preference = saved;
    }
  } catch {
    preference = 'system';
  }

  const prefersDark =
    typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = preference === 'dark' || (preference === 'system' && prefersDark);

  root.classList.toggle('dark', isDark);
  root.style.colorScheme = isDark ? 'dark' : 'light';
})();
`;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <SecurityGuard />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
