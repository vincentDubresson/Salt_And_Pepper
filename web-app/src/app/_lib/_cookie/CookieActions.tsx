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

  cookies().set('jwtToken', token, cookieOptions);
};
