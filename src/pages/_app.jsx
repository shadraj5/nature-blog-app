import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import React from 'react';
import dynamic from 'next/dynamic';
import { SnackbarProvider } from 'notistack';
import AuthContextProvider from '@/context/AuthContext';

const ProgressBar = dynamic(() => import('@/components/Nprogress'), {
  ssr: false
});

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <SnackbarProvider maxSnack={2}>
        <ProgressBar />
        <Component {...pageProps} />
      </SnackbarProvider>
    </AuthContextProvider>
  );
}
