'use client';

import { GET_RECIPES } from '@/app/_lib/_queries/Recipe';
import { useQuery } from '@apollo/client';
import { createContext, useEffect, useState } from 'react';
import { getJwtCookieValue, getJwtSecretKey, getJwtUsername, verifyJwtToken } from '../_cookie/CookieActions';

type AppContextType = {
  userAuthenticated: boolean;
  setJwtUsername: any;
  recipesLoading: boolean;
  recipes: any[];
};

export const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({ children }: { children: any }) => {
  const [recipes, setRecipes] = useState([]);
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [jwtUsername, setJwtUsername] = useState<string | null>(null);
  const [checkJwtUsername, setCheckJwtUsername] = useState<string | null>(null);

  console.log(jwtUsername, checkJwtUsername);

  /**
   * CHECK USER AUTHENTICATED
   */
  const checkUserAuthenticated = async () => {
    const token = await getJwtCookieValue();
    if (!token) {
      setUserAuthenticated(false);
      setJwtUsername(null);
      setCheckJwtUsername(null);
      return;
    }

    const userName = await getJwtUsername(token);

    if (userName as string && !jwtUsername) {
      setCheckJwtUsername(userName as string);
    } else {
      setUserAuthenticated(false);
      setJwtUsername(null);
      setCheckJwtUsername(null);
      return;
    }

    if (checkJwtUsername === jwtUsername) {
      setUserAuthenticated(true);
      return;
    }

/*     const payload = await verifyJwtToken(token as string);
    console.log('payload', payload);
    if (!payload) {
      setUserAuthenticated(false);
      return;
    } */

    setUserAuthenticated(false);
    return;
  };

  /**
   * GET_RECIPES
   */
  const { loading: recipesLoading } = useQuery(GET_RECIPES, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setRecipes(data.recipes.edges);
    },
  });

  useEffect(() => {
    checkUserAuthenticated();
  }, []);

  return (
    <AppContext.Provider
      value={{
        userAuthenticated,
        setJwtUsername,
        recipesLoading,
        recipes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
