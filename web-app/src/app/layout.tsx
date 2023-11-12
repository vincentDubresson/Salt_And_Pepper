'use client';

import React from 'react';
import { AppContextProvider } from '../context/AppContext';
import createApolloClient from '../client/ApolloClient';
import { ApolloProvider } from '@apollo/client';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

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
