'use server';

import { cookies } from 'next/headers';
import { JWTPayload, SignJWT, jwtVerify } from 'jose';

type COOKIE_DATA_TYPE = { id: string; token: string; expiredAt?: Date };

export const createAuthCookies = async (
  user: COOKIE_DATA_TYPE
): Promise<void> => {
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

    const alg = process.env
      .NEXT_PUBLIC_COOKIE_ALGORITHM_HEADER_PARAMETER as string;
    const token = await new SignJWT(user)
      .setProtectedHeader({ alg })
      .sign(secret);

    cookies().set(
      process.env.NEXT_PUBLIC_CURRENT_USER_COOKIE_NAME as string,
      token,
      cookieOptions
    );
    cookies().set(
      process.env.NEXT_PUBLIC_LOGGED_IN_COOKIE_NAME as string,
      'true',
      cookieOptions
    );
  } catch (error) {
    console.error('CookiesActions - l.43 :', error);
    throw new Error(
      // eslint-disable-next-line quotes
      "Une erreur est survenu lors de la création des cookies d'authentification."
    );
  }
};

export const removeCurrentUserCookie = async (): Promise<void> => {
  try {
    const expirationDate = Date.now();

    const cookieOptions = {
      secure: true,
      expires: expirationDate,
    };

    cookies().set(
      process.env.NEXT_PUBLIC_CURRENT_USER_COOKIE_NAME as string,
      'removed',
      cookieOptions
    );
    cookies().set(
      process.env.NEXT_PUBLIC_LOGGED_IN_COOKIE_NAME as string,
      'false',
      cookieOptions
    );
  } catch (error) {
    console.error('CookiesActions - l.71 :', error);

    throw new Error(
      // eslint-disable-next-line quotes
      "Une erreur est survenu lors de la suppression des cookies d'authentification."
    );
  }
};

export const decodeCurrentUserCookie = async (): Promise<
  JWTPayload | undefined
> => {
  try {
    const secret = new TextEncoder().encode(
      process.env.NEXT_PUBLIC_JWT_PASSPHRASE as string
    );

    const currentUserCookie = cookies().get(
      process.env.NEXT_PUBLIC_CURRENT_USER_COOKIE_NAME as string
    );

    if (currentUserCookie) {
      const currentUserCookieData = currentUserCookie.value;
      const { payload } = await jwtVerify(currentUserCookieData, secret);
      return payload;
    }
  } catch (error) {
    console.error('CookiesActions - l.97 :', error);

    throw new Error(
      // eslint-disable-next-line quotes
      "Une erreur est survenu lors de la validation des cookies d'authentification."
    );
  }
};

export const isUserLogged = (): boolean | undefined => {
  try {
    const loggedInCookie = cookies().get(
      process.env.NEXT_PUBLIC_LOGGED_IN_COOKIE_NAME as string
    );

    if (loggedInCookie) {
      return loggedInCookie.value ? true : false;
    }
  } catch (error) {
    console.error('CookiesActions - l.115 :', error);

    throw new Error(
      // eslint-disable-next-line quotes
      "Une erreur est survenu lors de la récupération des cookies d'authentification."
    );
  }
};
