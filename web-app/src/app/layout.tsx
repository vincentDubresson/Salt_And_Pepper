'use client';

import React from 'react';
import { AppContextProvider } from './context/AppContext';
import createApolloClient from './client/ApolloClient';
import { ApolloProvider } from '@apollo/client';

import './globals.scss';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = createApolloClient();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloProvider client={client}>
          <AppContextProvider>
            {children}
          </AppContextProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
