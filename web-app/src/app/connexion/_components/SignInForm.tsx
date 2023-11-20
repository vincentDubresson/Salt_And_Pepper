'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { SignInFormTypes } from '../_lib/FormTypes';
import { useState } from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

export default function SignInForm() {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormTypes>();

  const onSubmit: SubmitHandler<SignInFormTypes> = async () => {};

  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <div className="flex flex-col w-full">
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
              Mot de passe *
            </label>

            <div className="flex mb-3 border-b-2 border-b-sp-primary-400 hover:border-b-sp-primary-300">
              <input
                type={hidePassword ? 'password' : 'text'}
                className="block w-full px-2.5 py-2.5 bg-sp-primary-50 transition-colors focus:border-b-sp-primary-300 shadow-sm outline-none"
                {...register('plainPassword', {
                  required: true,
                  onChange(event) {
                    setPassword(event.target.value);
                  },
                })}
              />
              <button
                className="px-3"
                onClick={(e) => {
                  e.preventDefault();
                  setHidePassword(!hidePassword);
                }}
              >
                {hidePassword ? (
                  <VisibilityOffOutlinedIcon className="text-gray-600" />
                ) : (
                  <RemoveRedEyeOutlinedIcon className="text-gray-600" />
                )}
              </button>
            </div>
            <PasswordStrengthBar
              password={password}
              scoreWords={[
                'Très faible',
                'Faible',
                'Moyen',
                'Fort',
                'Très fort',
              ]}
              minLength={4}
              shortScoreWord={'Très faible'}
            />
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
    </div>
  );
}