'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { SignInFormTypes } from '../_lib/FormTypes';
import { useContext, useState } from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';
import Select from 'react-select';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import CountryData from '../_lib/CountryData';
import { PROJECT_ROUTE } from '@/app/_lib/_router/Routes';
import { AppContext } from '@/app/_lib/_context/AppContext';
import { useRouter } from 'next/navigation';

export default function SignInForm() {
  const setLinkClicked = useContext(AppContext)
    ?.setLinkClicked as React.Dispatch<React.SetStateAction<boolean>>;
  const [country, setCountry] = useState('');
  const router = useRouter();
  console.log(country);

  const countries = CountryData.countries.map((country) => ({
    value: country.country,
    label: `${country.flag} ${country.country}`,
  }));

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
      <div className="flex flex-col text-center text-gray-600 mb-14">
        <p className="font-nothing-you-could-do font-bold lg:text-lg">
          Proposez vos recettes favorites, donnez votre avis et bien plus encore
          en rejoignant la famille Salt & Pepper...
        </p>
      </div>
      <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-6 lg:space-y-0">
          <div className="mb-2 css-signin-input">
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

          <div className="mb-2 css-signin-input">
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
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-6 lg:space-y-0">
          <div className="mb-2 css-signin-input">
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

          <div className="mb-2 css-signin-input">
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
              className="-z-10"
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
        <div className="flex flex-col lg:flex-row lg:justify-center space-y-6 lg:w-full">
          <div className="mb-2 css-signin-input lg:w-1/2">
            <label className="block text-sm lg:text-base font-medium leading-6 text-gray-500">
              Pays
            </label>
            <Select
              className="block w-full border-b-2 px-2.5 py-2.5 bg-sp-primary-50 transition-colors border-b-sp-primary-400 hover:border-b-sp-primary-300 focus:border-b-sp-primary-300 shadow-sm outline-none"
              onChange={(e) => setCountry(e?.value as string)}
              styles={{
                control: () => ({
                  display: 'flex',
                  border: 'none',
                  cursor: 'pointer',
                }),
              }}
              placeholder="Choisissez un pays"
              options={countries}
            />
            {errors.email && (
              <span className="text-xs lg:text-sm text-red-600">
                Le pays est obligatoire
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-4 items-center pt-5">
          <input type="checkbox" className="w-4 h-4" />
          <p className="text-sm lg:text-base text-justify text-gray-600">
            J&lsquo;accepte les Conditions Générales d&lsquo;Utilisation et
            reconnais avoir été informé que mes données personnelles seront
            utilisées tel que détaillé dans la{' '}
            <button
              className="underline"
              onClick={(e) => {
                e.preventDefault();
                setLinkClicked(true);
                router.replace(PROJECT_ROUTE.POLITIQUE_DE_CONFIDENTIALITE);
              }}
            >
              politique de confidentialité
            </button>
            .
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <input type="checkbox" className="w-4 h-4" />
          <p className="text-sm lg:text-base text-justify text-gray-600">
            J&lsquo;accepte que Salt & Pepper m&lsquo;envoie des newsletters
            personnalisées et mesure mes interactions avec celles-ci.
          </p>
        </div>

        <div>
          <button
            className="flex w-1/3 m-auto mt-10 justify-center rounded-full bg-sp-primary-400 px-3.5 py-2 text-sm lg:text-base font-semibold leading-6 text-white shadow-sm transition-colors  hover:bg-sp-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit"
          >
            S&lsquo;inscrire
          </button>
        </div>
      </form>
      <div className="mt-10">
        <p className="text-xs text-justify text-gray-500">
          En tant que responsable du site de recettes &ldquo;Salt &
          Pepper,&ldquo; nous traitons vos données pour gérer votre compte,
          améliorer nos services, respecter les obligations légales, et
          personnaliser les contenus et publicités. Nous pouvons vous envoyer
          des communications commerciales personnalisées avec votre
          consentement, révocable via notre module de paramétrage des cookies.
          Vous avez le droit d&lsquo;accéder, rectifier, ou effacer vos données,
          limiter le traitement, vous opposer à certains traitements, et
          demander la portabilité de vos données. Contactez-nous à{' '}
          <a
            className="underline"
            href="mailto:contact.salt-and-pepper@vdub-dev.fr"
          >
            contact.salt-and-pepper@vdub-dev.fr
          </a>{' '}
          pour exercer vos droits. En cas de désaccord, vous pouvez déposer une
          réclamation auprès de la CNIL. Consultez notre{' '}
          <button
            className="underline"
            onClick={() => {
              setLinkClicked(true);
              router.replace(PROJECT_ROUTE.POLITIQUE_DE_CONFIDENTIALITE);
            }}
          >
            politique de confidentialité
          </button>{' '}
          sur notre site pour plus d&lsquo;informations.
        </p>
      </div>
    </div>
  );
}
