import { useState } from 'react';

export default function SignInLogInButtonGroup({
  onLogInButtonFocus,
}: {
  onLogInButtonFocus: any;
}) {
  const [signInFocused, setSignInFocused] = useState(false);
  const [logInFocused, setLogInFocused] = useState(true);

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <>
      <button
        className={classNames(
          logInFocused ? 'bg-sp-primary-400 text-sp-primary-50' : '',
          signInFocused
            ? 'hover:bg-sp-primary-200 hover:border-sp-primary-200'
            : '',
          'w-1/2 text-sm text-gray-500 font-bold border-y border-s border-sp-primary-300 rounded-s-md py-3 transition-colors'
        )}
        onClick={() => {
          setLogInFocused(!logInFocused);
          setSignInFocused(!signInFocused);
          onLogInButtonFocus(true);
        }}
      >
        Se connecter
      </button>
      <button
        className={classNames(
          signInFocused ? 'bg-sp-primary-400 text-sp-primary-50' : '',
          logInFocused
            ? 'hover:bg-sp-primary-200 hover:border-sp-primary-200'
            : '',
          'w-1/2 text-sm text-gray-500 font-bold border-y border-e border-sp-primary-300 rounded-e-md py-3 transition-colors'
        )}
        onClick={() => {
          setLogInFocused(!logInFocused);
          setSignInFocused(!signInFocused);
          onLogInButtonFocus(false);
        }}
      >
        S&lsquo;inscrire
      </button>
    </>
  );
}
