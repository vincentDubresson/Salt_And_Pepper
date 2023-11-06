'use client';

import { createContext } from 'react';

type AppContextType = {
  test: string;
};

export const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({ children }: {children: any}) => {
  const test = 'test';

  return (
    <AppContext.Provider value={{test}}>
      {children}
    </AppContext.Provider>
  );
};