'use client';

import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({
  isAuthenticated: false,
  userToken: '',
});

export default function UserProvider({ children }: { children: any }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState('');

  useEffect(() => {
    const authenticateUser = async (login: string, password: string) => {
      try {
        const loginResponse = await fetch(
          'https://localhost:8000/api/login_check',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: login,
              password: password,
            }),
          }
        );

        if (!loginResponse.ok) {
          const errorData = await loginResponse.json();
          console.error('Login Error:', errorData);
          return;
        }

        const loginData = await loginResponse.json();
        console.log('Login Data:', loginData);
        setIsAuthenticated(true);
        setUserToken(loginData.token);

        const usersResponse = await fetch('https://localhost:8000/api/users', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${loginData.token}`,
          },
        });

        if (!usersResponse.ok) {
          const errorData = await usersResponse.json();
          console.error('Users Error:', errorData);
          return;
        }

        const usersData = await usersResponse.json();
        console.log('Users Data:', usersData);
      } catch (error) {
        console.error('Authentication Error:', error);
      }
    };

    authenticateUser('vincent.dubresson@live.fr', 'password');
  }, []); // Empty dependency array to run once on component mount

  return (
    <UserContext.Provider value={{ isAuthenticated, userToken }}>
      {children}
    </UserContext.Provider>
  );
}
