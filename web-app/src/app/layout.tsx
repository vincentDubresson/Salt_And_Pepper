'use client';

import React from 'react';
import { AppContextProvider } from '../context/AppContext';
import createApolloClient from '../client/ApolloClient';
import { ApolloProvider } from '@apollo/client';

import Header from '@/components/Header/Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = createApolloClient();

  return (
    <html lang="en">
      <body>
        <ApolloProvider client={client}>
          <AppContextProvider>
            <Header />
              {children}
          </AppContextProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
