'use client';

import { createContext } from 'react';

export const UserContext = createContext({});

export default function UserProvider({ children }: { children: any}) {
  return (
    <UserContext.Provider value="dark">
      {children}
    </UserContext.Provider>
  );
}