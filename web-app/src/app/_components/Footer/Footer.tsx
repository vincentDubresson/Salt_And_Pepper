import { ArrowUpIcon } from '@heroicons/react/24/outline';
import React from 'react';
import MainLightLogo from '../../../../public/pictures/logo/salt_and_pepper_logo_light.png';
import { useContext } from 'react';
import { AppContext } from '@/app/_lib/_context/AppContext';
import { useRouter } from 'next/navigation';
import { PROJECT_ROUTE } from '@/app/_lib/_router/Routes';

export default function Header() {
  const setLinkClicked = useContext(AppContext)
    ?.setLinkClicked as React.Dispatch<React.SetStateAction<boolean>>;
  const router = useRouter();

  return (
    <footer className="relative flex flex-col gap-y-6 justify-center items-center bg-sp-primary-400 mt-20 -z-10">
      {/* LOGO AND TEXT */}
      <div className="group absolute -top-5 flex justify-center items-center h-11 w-11 rounded-full bg-sp-primary-300 hover:bg-sp-primary-500 transition-colors">
        <a href="#top">
          <ArrowUpIcon className="h-6 w-6 text-gray-50" />
        </a>
      </div>
      <div className="w-5/6 sm:w-3/4 lg:w-3/5 xl:w-2/5 flex flex-col justify-center items-center border-b border-sp-primary-200 py-6">
        <img
          className="w-32 sm:w-44"
          src={MainLightLogo.src}
          alt="Salt & Pepper Logo"
        />
        <p className="font-nothing-you-could-do text-sm sm:text-lg lg:text-xl text-center font-bold text-sp-primary-50">
          Épicez votre quotidien avec Salt and Pepper : des recettes qui
          réveillent les papilles et enchantent les assiettes !
        </p>
      </div>

      {/* NEWSLETTER AND CONTACT */}
      <div className="w-5/6 sm:w-3/4 lg:w-3/5 xl:w-2/5 flex flex-col justify-center items-center border-b border-sp-primary-200 pb-6">
        <div className="lg:w-4/5 flex flex-col items-center gap-y-4">
          <p className="text-center lg:text-xl text-sp-primary-50 font-bold">
            NEWSLETTER
          </p>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="lg:w-3/4 flex rounded-sm border-b-2 border-b-sp-primary-50 hover:border-b-sp-primary-500 focus:border-b-sp-primary-500 bg-sp-primary-300 px-3.5 py-2 text-sp-primary-50 placeholder-gray-100 focus:outline-none shadow-sm text-sm lg:text-base transition-colors"
            placeholder="Votre adresse email"
          />
          <button
            type="submit"
            className="flex-none lg:w-1/3 rounded-full bg-sp-primary-250 hover:bg-sp-primary-600 transition-colors px-3.5 py-2.5 text-sm lg:text-base font-semibold text-white font shadow-sm"
          >
            Je m&lsquo;inscris
          </button>
          <p className="text-xs text-justify text-sp-primary-50">
            Nous sommes ravis de partager avec vous des recettes délicieuses,
            des conseils culinaires et des nouveautés exclusives. Votre adresse
            e-mail est précieuse, et nous vous assurons qu&lsquo;elle ne sera
            utilisée que pour vous envoyer notre newsletter. Nous respectons
            votre vie privée. Vous pouvez vous désabonner à tout moment.
            Consultez notre{' '}
            <button
              className="underline hover:text-sp-primary-200 transition-colors"
              onClick={() => {
                setLinkClicked(true);
                router.replace(PROJECT_ROUTE.POLITIQUE_DE_CONFIDENTIALITE);
              }}
            >
              politique de confidentialité
            </button>{' '}
            pour plus d&lsquo;informations.
          </p>
        </div>
      </div>
      {/* COPYRIGHT */}
      <div className="w-5/6 sm:w-3/4 lg:w-3/5 xl:w-2/5 flex justify-center py-2">
        <p className="text-xs text-sp-primary-50 text-center">
          Ce site a été conçu et développé avec gourmandise par vdub-dev.
        </p>
      </div>
    </footer>
  );
}
