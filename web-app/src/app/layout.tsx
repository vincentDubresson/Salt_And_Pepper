'use client';

import React from 'react';
import { AppContextProvider } from './_lib/_context/AppContext';
import createApolloClient from './_lib/_client/ApolloClient';
import { ApolloProvider } from '@apollo/client';

import Header from '@/app/_components/Header/Header';
import Footer from '@/app/_components/Footer/Footer';

import './globals.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = createApolloClient();

  return (
    <html className="scroll-smooth" lang="en">
      <body>
        <ApolloProvider client={client}>
          <AppContextProvider>
            <Header />
            {children}
            <Footer />
          </AppContextProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
