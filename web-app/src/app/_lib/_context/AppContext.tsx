'use client';

import React, { useCallback } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { createContext, useEffect, useState } from 'react';
import { GET_USER, LOGIN_CHECK_USER } from '../_query/User';
import {
  createAuthCookies,
  decodeCurrentUserCookie,
  removeCurrentUserCookie,
} from '../_cookie/CookieActions';
import { useRouter } from 'next/navigation';
import { PROJECT_ROUTE } from '../_router/Routes';
import { toast } from 'react-toastify';
import { GET_USER_MUTATION_VARIABLES, GET_USER_TYPE } from '../_type/UserTypes';
import { JWTPayload } from 'jose';
import { CUSTOM_ERROR_MESSAGE } from '../_constant/Constants';

type AppContextType = {
  logIn: () => void;
  logInLoading: boolean;
  user: GET_USER_TYPE;
  userAuthenticated: boolean;
  setLinkClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [linkClicked, setLinkClicked] = useState(false);
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const router = useRouter();

  /**
   * Mutation utilisée pour récupérer un JWT Token.
   * Si ce token est récupéré, on crée un cookie d'authentification sécurisé.
   * On récupère ensuite l'objet User, puis on redirige l'utilisateur.
   */
  const [logIn, { loading: logInLoading }] = useMutation<
    any,
    GET_USER_MUTATION_VARIABLES
  >(LOGIN_CHECK_USER, {
    notifyOnNetworkStatusChange: true,
    onCompleted: async (data) => {
      try {
        if (data.loginCheckUser) {
          const token = data.loginCheckUser.user.token;
          if (token) {
            const userId = data.loginCheckUser.user.id;
            const cookieData = {
              id: userId,
              token: token,
            };
            await createAuthCookies(cookieData);
            setUserAuthenticated(true);
            const userProfile = await getLoginUser({
              context: { headers: { authorization: `Bearer ${token}` } },
              variables: { id: userId },
            });
            if (userProfile) {
              router.push(PROJECT_ROUTE.HOME);
            }
          }
        }
      } catch (error) {
        console.error('AppContext - l.67 :', error);
        toast.error(CUSTOM_ERROR_MESSAGE);
      }
    },
  });

  const [user, setUser] = useState<GET_USER_TYPE | null>(null);

  /**
   * Cette query récupère l'objet User après soumission du formulaire de connexion.
   */
  const [getLoginUser] = useLazyQuery(GET_USER, {
    notifyOnNetworkStatusChange: true,
    onCompleted: async (data) => {
      try {
        if (data.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.error('AppContext - l.86 :', error);
        toast.error(CUSTOM_ERROR_MESSAGE);
      }
    },
    onError: (error) => {
      console.error('AppContext - l.91 :', error);
      toast.error(CUSTOM_ERROR_MESSAGE);
    },
  });

  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  /**
   * Cette query récupère l'objet User si l'utilisateur est déjà connecté,
   * et accède à une page directement via une URL.
   */
  const [getUser] = useLazyQuery(GET_USER, {
    notifyOnNetworkStatusChange: true,
    context: { headers: { authorization: `Bearer ${token}` } },
    variables: { id: userId },
    onCompleted: async (data) => {
      try {
        if (data.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.error('AppContext - l.113 :', error);
        toast.error(CUSTOM_ERROR_MESSAGE);
      }
    },
    onError: (error) => {
      console.error('AppContext - l.118 :', error);
      toast.error(CUSTOM_ERROR_MESSAGE);
    },
  });

  const setUserQueryStates = useCallback(
    async (currentUser: JWTPayload): Promise<void> => {
      setToken(currentUser.token as string);
      setUserId(currentUser.id as string);
    },
    []
  );

  /**
   * Après chaque accès à une page, on récupère l'objet User si l'utilisateur
   * est authentifié.
   */
  const checkAuthAndGetUser = useCallback(async (): Promise<void> => {
    try {
      const currentUser = await decodeCurrentUserCookie();

      if (!currentUser) {
        await removeCurrentUserCookie();
      }

      const isTokenExpired =
        currentUser && new Date() > new Date(currentUser.expiredAt as string);

      if (currentUser && !isTokenExpired) {
        setUserAuthenticated(true);

        if (!user) {
          await setUserQueryStates(currentUser);
          await getUser();
        }
      } else {
        setUserAuthenticated(false);
      }
    } catch (error) {
      console.error('AppContext - l.157 :', error);
      toast.error(CUSTOM_ERROR_MESSAGE);
    }
  }, [user, setUserQueryStates, getUser]);

  useEffect(() => {
    checkAuthAndGetUser();
    setLinkClicked(false);
  }, [linkClicked, checkAuthAndGetUser]);

  return (
    <AppContext.Provider
      value={{
        logIn,
        logInLoading,
        userAuthenticated,
        user,
        setLinkClicked,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
