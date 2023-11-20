'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { SignInFormTypes } from '../_lib/FormTypes';
import { useState } from 'react';

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormTypes>();

  const onSubmit: SubmitHandler<SignInFormTypes> = async () => {};

  /*   const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(''); */
  const [hidePassword, setHidePassword] = useState(true);

  const handlePassword = (passwordValue) => {
    const strengthChecks = {
      length: 0,
      hasUpperCase: false,
      hasLowerCase: false,
      hasDigit: false,
      hasSpecialChar: false,
    };

    strengthChecks.length = passwordValue.length >= 8 ? true : false;
    strengthChecks.hasUpperCase = /[A-Z]+/.test(passwordValue);
    strengthChecks.hasLowerCase = /[a-z]+/.test(passwordValue);
    strengthChecks.hasDigit = /[0-9]+/.test(passwordValue);
    strengthChecks.hasSpecialChar = /[^A-Za-z0-9]+/.test(passwordValue);

    let verifiedList = Object.values(strengthChecks).filter((value) => value);

    let strength =
      verifiedList.length == 5
        ? 'Strong'
        : verifiedList.length >= 2
          ? 'Medium'
          : 'Weak';

    setPassword(passwordValue);
    setProgress(`${(verifiedList.length / 5) * 100}%`);
    setMessage(strength);

    console.log('verifiedList: ', `${(verifiedList.length / 5) * 100}%`);
  };

  const getActiveColor = (type) => {
    if (type === 'Strong') return 'password-strong';
    if (type === 'Medium') return 'password-medium';
    return 'password-weak';
  };

  return (
    <>
      <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-6">
          <div className="mb-2">
            <label className="block text-sm lg:text-base font-medium leading-6 text-gray-500">
              Prénom
            </label>
            <input
              className="block w-full border-b-2 px-2.5 py-2.5 bg-sp-primary-50 transition-colors border-b-sp-primary-400 hover:border-b-sp-primary-300 focus:border-b-sp-primary-300 shadow-sm outline-none"
              {...register('firstname', { required: true })}
            />
            {errors.email && (
              <span className="text-xs lg:text-sm text-red-600">
                Le prénom est obligatoire
              </span>
            )}
          </div>

          <div className="mb-2">
            <label className="block text-sm lg:text-base font-medium leading-6 text-gray-500">
              Nom
            </label>
            <input
              className="block w-full border-b-2 px-2.5 py-2.5 bg-sp-primary-50 transition-colors border-b-sp-primary-400 hover:border-b-sp-primary-300 focus:border-b-sp-primary-300 shadow-sm outline-none"
              {...register('lastname', { required: true })}
            />
            {errors.email && (
              <span className="text-xs lg:text-sm text-red-600">
                Le nom est obligatoire
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-6">
          <div className="mb-2">
            <label className="block text-sm lg:text-base font-medium leading-6 text-gray-500">
              Adresse e-mail
            </label>
            <input
              className="block w-full border-b-2 px-2.5 py-2.5 bg-sp-primary-50 transition-colors border-b-sp-primary-400 hover:border-b-sp-primary-300 focus:border-b-sp-primary-300 shadow-sm outline-none"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <span className="text-xs lg:text-sm text-red-600">
                L&lsquo;adresse e-mail est obligatoire
              </span>
            )}
          </div>

          <div className="mb-2">
            <label className="block text-sm lg:text-base font-medium leading-6 text-gray-500">
              Mot de passe
            </label>

            <div className="flex">
              <input
                className="block w-full border-b-2 px-2.5 py-2.5 bg-sp-primary-50 transition-colors border-b-sp-primary-400 hover:border-b-sp-primary-300 focus:border-b-sp-primary-300 shadow-sm outline-none"
                {...register('plainPassword', { required: true })}
              />
              <a
                href="#"
                className="toggle-btn"
                onClick={() => {
                  setHidePassword(!hidePassword);
                }}
              >
                <span
                  className="material-icons eye-icon"
                  style={{ color: !hidePassword ? '#FF0054' : '#c3c3c3' }}
                >
                  visibility
                </span>
              </a>
            </div>

            {errors.email && (
              <span className="text-xs lg:text-sm text-red-600">
                Le mot de passe est obligatoire
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-6">
          <div className="mb-2">
            <label className="block text-sm lg:text-base font-medium leading-6 text-gray-500">
              Pays
            </label>
            <input
              className="block w-full border-b-2 px-2.5 py-2.5 bg-sp-primary-50 transition-colors border-b-sp-primary-400 hover:border-b-sp-primary-300 focus:border-b-sp-primary-300 shadow-sm outline-none"
              {...register('country', { required: true })}
            />
            {errors.email && (
              <span className="text-xs lg:text-sm text-red-600">
                Le pays est obligatoire
              </span>
            )}
          </div>
        </div>

        <div>
          <button
            className="flex m-auto mt-10 justify-center rounded-full bg-sp-primary-400 px-3.5 py-2 text-sm lg:text-base font-semibold leading-6 text-white shadow-sm transition-colors  hover:bg-sp-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit"
          >
            S&lsquo;inscrire
          </button>
        </div>
      </form>
    </>
  );
}
