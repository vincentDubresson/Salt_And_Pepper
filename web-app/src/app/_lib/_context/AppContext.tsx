'use client';

import { useLazyQuery, useMutation } from '@apollo/client';
import { createContext, useEffect, useState } from 'react';
import { GET_USER, LOGIN_CHECK_USER } from '../_queries/User';
import {
  createCurrentUserCookie,
  createJwtCookie,
} from '../_cookie/CookieActions';
import { useRouter } from 'next/navigation';
import { PROJECT_ROUTE } from '../_router/routes';
import Cookies from 'js-cookie';

type AppContextType = {
  logIn: any;
  logInLoading: boolean;
  user: any;
  userAuthenticated: boolean;
  setLinkClicked: any;
};

export const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({ children }: { children: any }) => {
  const [linkClicked, setLinkClicked] = useState(false);
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const router = useRouter();

  /**
   * AUTH
   */
  const [logIn, { loading: logInLoading }] = useMutation(LOGIN_CHECK_USER, {
    notifyOnNetworkStatusChange: true,
    onCompleted: async (data) => {
      if (data.loginCheckUser) {
        const token = data.loginCheckUser.user.token;
        if (token) {
          const userId = data.loginCheckUser.user.id;
          await createJwtCookie(token);
          await createCurrentUserCookie(data.loginCheckUser.user);
          setUserAuthenticated(true);
          const userProfile = await getUser({
            context: { headers: { authorization: `Bearer ${token}` } },
            variables: { id: userId },
          });
          if (userProfile) {
            router.push(PROJECT_ROUTE.HOME);
          }
        }
      }
    },
  });

  const [user, setUser] = useState([]);

  const [getUser] = useLazyQuery(GET_USER, {
    notifyOnNetworkStatusChange: true,
    onCompleted: async (data) => {
      if (data.user) {
        setUser(data.user);
      }
    },
  });

  useEffect(() => {
    const currentUser = Cookies.get('currentUser');
    console.log('currentUser', currentUser);
    const isTokenExpired =
      currentUser && new Date() > new Date(JSON.parse(currentUser)?.expiredAt);
    console.log('isTokenExpired', isTokenExpired);
    if (currentUser && !isTokenExpired) {
      setUserAuthenticated(true);
    } else {
      setUserAuthenticated(false);
    }
    setLinkClicked(false);
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
