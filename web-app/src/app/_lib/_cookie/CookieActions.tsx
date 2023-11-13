'use server'

import { cookies } from 'next/headers';
import cookie from 'cookie';
 
export const createJwtCookie = async (token: string) => {
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1);

    const cookieOptions = {
      secure: true,
      httpOnly: true,
      expires: expirationDate,
    }

    const cookieString = cookie.serialize('jwtToken', token, cookieOptions);
    cookies().set('jwtToken', token, cookieOptions);
}
