'use server';

import { cookies } from 'next/headers';
import { decodeJwt, jwtVerify } from 'jose';

export const createJwtCookie = async (token: string) => {
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 1);

  const cookieOptions = {
    secure: true,
    httpOnly: true,
    expires: expirationDate,
  };

  cookies().set('jwtToken', token, cookieOptions);
};

export const getJwtCookie = async () => {
  return cookies().get('jwtToken');
};

export const getJwtCookieValue = async () => {
  return cookies().get('jwtToken')?.value;
};

export const isJwtCookieSet = async () => {
  return cookies().get('jwtToken') !== undefined;
};

export const removeJwtCookie = async () => {
  cookies().delete('jwtToken');
};

export const getJwtSecretKey = async () => {
  const secret = process.env.NEXT_PUBLIC_JWT_PASSPHRASE;
  if (!secret) {
    throw new Error('JWT Secret key is not matched');
  }
  return new TextEncoder().encode(secret);
};

export async function getJwtUsername(token: string) {
  const claims = decodeJwt(token);
  console.log(claims);

  return claims.username;
}
/* 
export async function verifyJwtToken(token: string) {

  console.log('token', token);
  const secret = await getJwtSecretKey();
  console.log('secret', secret);
  const { payload } = await jwtVerify(token, secret, {
    issuer: 'urn:example:issuer',
    audience: 'urn:example:audience',
  });
  console.log('payload', payload);
  return payload;
} */
