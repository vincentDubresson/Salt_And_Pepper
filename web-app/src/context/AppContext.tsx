'use client';

import { GET_RECIPES } from '@/query/Recipe';
import { useQuery } from '@apollo/client';
import { createContext, useState } from 'react';

type AppContextType = {
  recipesLoading: boolean;
  recipes: any[];
};

export const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({ children }: {children: any}) => {
  const [recipes, setRecipes] = useState([]);

  /**
   * GET_RECIPES
   */
  const { loading: recipesLoading } = useQuery(GET_RECIPES, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setRecipes(data.recipes);
    },
  });

  return (
    <AppContext.Provider value={{
      recipesLoading,
      recipes,
    }}>
      {children}
    </AppContext.Provider>
  );
};