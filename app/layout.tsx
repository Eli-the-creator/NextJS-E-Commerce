import '@/styles/globals.css';
import { Providers } from '@/components/providers';
import { SiteBlob } from '@/components/site-blob';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { siteConfig } from '@/config/site';
import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: '/favicon.ico',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            fontSans.variable,
          )}
        >
          <Providers>
            <div className="relative flex min-h-screen flex-col">
              <div className="flex-1">
                <SiteHeader />
                <SiteBlob />
                {children}
                <SiteFooter />
              </div>
            </div>
          </Providers>
        </body>
      </html>
    </>
  );
}
