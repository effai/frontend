import "@/styles/globals.css"
import { AppProps } from 'next/app';
import React from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/Header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ToastContainer />
      <Header/>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
