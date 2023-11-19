'use server';

import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

export const createAuthCookies = async (user: any) => {
  try {
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1);

    const cookieOptions = {
      secure: true,
      expires: expirationDate,
    };

    user.expiredAt = expirationDate;

    const secret = new TextEncoder().encode(
      process.env.NEXT_PUBLIC_JWT_PASSPHRASE as string
    );

    const alg = 'HS256';
    const token = await new SignJWT(user)
      .setProtectedHeader({ alg })
      .sign(secret);

    cookies().set('current_user', token, cookieOptions);
    cookies().set('logged_in', 'true', cookieOptions);
  } catch (error) {
    console.error('CookiesActions - l.30 :', error);
  }
};

export const removeCurrentUserCookie = async () => {
  try {
    const expirationDate = new Date();

    const cookieOptions = {
      secure: true,
      expires: expirationDate,
    };

    cookies().set('current_user', 'removed', cookieOptions);
    cookies().set('logged_in', 'false', cookieOptions);
  } catch (error) {
    console.error('CookiesActions - l.47 :', error);
  }
};

export const getCurrentUserCookie = () => {
  try {
    const currentUser = cookies().get('current_user')?.value;
    return currentUser ? JSON.parse(currentUser) : null;
  } catch (error) {
    console.error('CookiesActions - l.57 :', error);

    return null;
  }
};

export const decodeCurrentUserCookie = async () => {
  try {
    const secret = new TextEncoder().encode(
      process.env.NEXT_PUBLIC_JWT_PASSPHRASE as string
    );

    const jwt = cookies().get('current_user')?.value;

    if (jwt) {
      const { payload } = await jwtVerify(jwt, secret);
      return payload;
    }
  } catch (error) {
    console.error('CookiesActions - l.76 :', error);
  }

  return null;
};

export const isUserLogged = (): boolean => {
  try {
    const loggedInCookie = cookies().get('logged_in')?.value;
    return loggedInCookie ? true : false;
  } catch (error) {
    console.error('CookiesActions - l.88 :', error);

    return false;
  }
};
