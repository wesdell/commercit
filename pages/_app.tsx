import type { AppProps } from 'next/app';

import { Toaster } from 'react-hot-toast';

import { CartProvider } from '@/context';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Toaster />
      <Component {...pageProps} />
    </CartProvider>
  );
}
