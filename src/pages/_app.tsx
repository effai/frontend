import '@/styles/globals.css'
import { AppProps } from 'next/app';
import React from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/Header';
import { PostsProvider } from '@/context/PostsContext';

function MyApp({Component, pageProps}: AppProps) {
  return (
    <AuthProvider>
      <PostsProvider>
        
        <ToastContainer/>
        <Header/>
        <Component {...pageProps} />
      </PostsProvider>
    </AuthProvider>
  );
}

export default MyApp;
