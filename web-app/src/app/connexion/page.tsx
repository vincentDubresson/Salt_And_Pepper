'use client';

import { useState } from 'react';
import MainLogo from '../../../public/pictures/logo/salt_and_pepper_logo.png';

export default function Home() {
  const [signInFocused, setSignInFocused] = useState(false);
  const [logInFocused, setLogInFocused] = useState(true);

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <div className="flex flex-col justify-start items-center w-11/12 sm:w-4/5 lg:w-2/3 mx-auto mt-28 lg:mt-40">
      <img
        className="w-32 sm:w-40 lg:w-48 m-auto pb-3"
        src={MainLogo.src}
        alt="Salt & Pepper Logo"
      />
      <div className="flex w-full">
        <button
          className={classNames(
            logInFocused ? 'bg-sp-primary-400 text-sp-primary-50' : '',
            signInFocused ? 'hover:bg-sp-primary-200 hover:border-sp-primary-200' : '',
            'w-1/2 text-sm text-gray-500 font-bold border-y border-s border-sp-primary-300 rounded-s-md py-3 transition-colors'
          )}
          onClick={() => {
            setLogInFocused(!logInFocused);
            setSignInFocused(!signInFocused);
          }}
        >
          Se connecter
        </button>
        <button
          className={classNames(
            signInFocused ? 'bg-sp-primary-400 text-sp-primary-50' : '',
            logInFocused ? 'hover:bg-sp-primary-200 hover:border-sp-primary-200' : '',
            'w-1/2 text-sm text-gray-500 font-bold border-y border-e border-sp-primary-300 rounded-e-md py-3 transition-colors'
          )}
          onClick={() => {
            setLogInFocused(!logInFocused);
            setSignInFocused(!signInFocused);
          }}
        >
          S&lsquo;inscrire
        </button>
      </div>
    </div>
  );
}
