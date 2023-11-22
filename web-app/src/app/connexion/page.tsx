'use client';

import { useState } from 'react';
import MainLogo from '../../../public/pictures/logo/salt_and_pepper_logo.png';
import SignInLogInButtonGroup from './_components/SignInLogInButtonGroup';
import LogInForm from './_components/LogInForm';
import SignInForm from './_components/SignInForm';

export default function Home() {
  const [isSignInButtonFocused, setIsSignInButtonFocused] = useState(true);

  function onLogInButtonFocus(isLogInFocused: boolean) {
    setIsSignInButtonFocused(isLogInFocused);
  }

  return (
    <div className="flex flex-col justify-start items-center w-11/12 sm:w-4/5 lg:w-2/3 mx-auto mt-28 lg:mt-40">
      <img
        className="w-32 sm:w-40 lg:w-48 m-auto pb-3"
        src={MainLogo.src}
        alt="Salt & Pepper Logo"
      />
      <div className="flex w-full xl:w-4/5 pb-20">
        <SignInLogInButtonGroup onLogInButtonFocus={onLogInButtonFocus} />
      </div>
      {isSignInButtonFocused ? (
        <div className="flex w-full sm:w-2/3 md:w-1/2 xl:w-2/5 pb-20">
          <LogInForm />
        </div>
      ) : (
        <div className="flex w-full sm:w-2/3 md:w-1/2 lg:w-4/5 xl:w-3/5 pb-20">
          <SignInForm />
        </div>
      )}
    </div>
  );
}
