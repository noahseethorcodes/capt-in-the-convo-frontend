import type { Metadata } from "next";
import "@/app/globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import TopBanner from '@/app/components/TopBanner';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/app/theme';
import { Toaster } from "react-hot-toast";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'CAPTInTheConvo',
  description: 'A Forum for CAPTains',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Toaster />
            <TopBanner />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
