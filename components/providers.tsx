'use client';

import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from 'use-shopping-cart';

interface Props {
  children: React.ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <CartProvider
      currency="USD"
      shouldPersist
      cartMode="checkout-session"
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!}
    >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Toaster />
        {children}
      </ThemeProvider>
    </CartProvider>
  );
}
