'use client';

import { useState } from 'react';
import MainLogo from '../../../public/pictures/logo/salt_and_pepper_logo.png';
import SignInLogInButtonGroup from './_components/SignInLogInButtonGroup';

export default function Home() {
  const [isSignInButtonFocused, setIsSignInButtonFocused] = useState(true);

  function onLogInButtonFocus(logInFocused: boolean) {
    setIsSignInButtonFocused(logInFocused);
  }

  return (
    <div className="flex flex-col justify-start items-center w-11/12 sm:w-4/5 lg:w-2/3 mx-auto mt-28 lg:mt-40">
      <img
        className="w-32 sm:w-40 lg:w-48 m-auto pb-3"
        src={MainLogo.src}
        alt="Salt & Pepper Logo"
      />
      <div className="flex w-full pb-20">
        <SignInLogInButtonGroup onLogInButtonFocus={onLogInButtonFocus} />
      </div>
      {isSignInButtonFocused ? <p>login</p> : <p>signin</p>}
    </div>
  );
}
