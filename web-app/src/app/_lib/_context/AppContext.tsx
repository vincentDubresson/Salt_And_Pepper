'use client';

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
import { GET_USER_TYPE } from '../_type/UserTypes';

type AppContextType = {
  logIn: any;
  logInLoading: boolean;
  user: GET_USER_TYPE;
  userAuthenticated: boolean;
  setLinkClicked: any;
};

export const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({ children }: { children: any }) => {
  const [linkClicked, setLinkClicked] = useState(false);
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const router = useRouter();

  /**
   * Mutation utilisée pour récupérer un JWT Token.
   * Si ce token est récupéré, on crée un cookie d'authentification sécurisé.
   * On récupère ensuite l'objet User, puis on redirige l'utilisateur.
   */
  const [logIn, { loading: logInLoading }] = useMutation(LOGIN_CHECK_USER, {
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
        console.error('AppContext - l.59 :', error);
        toast.error(
          'Une erreur est survenue. Merci de contacter l&lsquo;administrateur.'
        );
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
        console.error('AppContext - l.78 :', error);
        toast.error(
          'Une erreur est survenue. Merci de contacter l&lsquo;administrateur.'
        );
      }
    },
    onError: (error) => {
      console.error('AppContext - l.83 :', error);
      toast.error(
        'Une erreur est survenue. Merci de contacter l&lsquo;administrateur.'
      );
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
        console.error('AppContext - l.111 :', error);
        toast.error(
          'Une erreur est survenue. Merci de contacter l&lsquo;administrateur.'
        );
      }
    },
    onError: (error) => {
      console.error('AppContext - l.118 :', error);
      toast.error(
        'Une erreur est survenue. Merci de contacter l&lsquo;administrateur.'
      );
    },
  });

  const setUserQueryStates = async (currentUser: any) => {
    setToken(currentUser.token);
    setUserId(currentUser.id);
  };

  /**
   * Après chaque accès à une page, on récupère l'objet User si l'utilisateur
   * est authentifié.
   */
  const checkAuthAndGetUser = async () => {
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
      return true;
    } catch (error) {
      console.error('AppContext - l.158 :', error);
      toast.error(
        'Une erreur est survenue. Merci de contacter l&lsquo;administrateur.'
      );
    }
  };

  useEffect(() => {
    checkAuthAndGetUser();
    setLinkClicked(false);
    console.log(user);
  }, [linkClicked]);

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
