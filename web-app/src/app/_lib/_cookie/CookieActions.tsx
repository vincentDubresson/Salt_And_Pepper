'use server';

import { cookies } from 'next/headers';

export const createJwtCookie = async (token: string) => {
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 1);

  const cookieOptions = {
    secure: true,
    httpOnly: true,
    expires: expirationDate,
  };

  cookies().set('authToken', token, cookieOptions);
};

export const createCurrentUserCookie = async (user: any) => {
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 1);

  const cookieOptions = {
    secure: true,
    expires: expirationDate,
  };

  user.expiredAt = expirationDate;

  cookies().set('currentUser', JSON.stringify(user), cookieOptions);
};

export const removeJwtCookie = async () => {
  cookies().delete('authToken');
};

export const removeCurrentUserCookie = async () => {
  cookies().delete('currentUser');
};

export const getJwtCookie = async () => {
  return cookies().get('authToken');
};

export const getCurrentUserCookie = () => {
  const currentUser = cookies().get('currentUser')?.value;
  return currentUser ? JSON.parse(currentUser) : null;
};
