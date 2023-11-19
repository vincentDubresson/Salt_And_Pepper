'use client';

import React from 'react';
import { AppContextProvider } from './_lib/_context/AppContext';
import createApolloClient from './_lib/_client/ApolloClient';
import { ApolloProvider } from '@apollo/client';

import Header from '@/app/_components/Header/Header';
import Footer from '@/app/_components/Footer/Footer';
import { ToastContainer } from 'react-toastify';

import './globals.scss';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = createApolloClient();

  return (
    <html className="scroll-smooth" lang="en">
      <body className="relative -z-10">
        <ApolloProvider client={client}>
          <AppContextProvider>
            <Header />
            {children}
            <Footer />
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </AppContextProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
