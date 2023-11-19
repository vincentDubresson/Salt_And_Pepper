'use client';

import MainLogo from '../../../public/pictures/logo/salt_and_pepper_logo.png';

export default function Home() {
  return (
    <div className="flex flex-col justify-start w-11/12 sm:w-4/5 lg:w-2/3 mx-auto mt-28 lg:mt-40">
      <img
        className="w-32 sm:w-40 lg:w-48 m-auto pb-3"
        src={MainLogo.src}
        alt="Salt & Pepper Logo"
      />
      <h1 className="font-nothing-you-could-do text-center text-xl sm:text-2xl lg:text-3xl font-bold py-3">
        Politique de confidentialité
      </h1>
      <p className="text-sm sm:text-base text-center py-6">
        Dernière mise à jour : le 12/11/2023.
      </p>
      <p className="text-sm sm:text-base text-justify pt-6 pb-12">
        Bienvenue sur Salt & Pepper ! Chez nous, la confidentialité de vos
        données est une priorité absolue. Nous vous invitons à prendre
        connaissance de notre politique de confidentialité pour comprendre
        comment nous collectons, utilisons, divulguons et protégeons vos
        informations lorsque vous utilisez notre site Web, ainsi que les
        services connexes.
      </p>
      <h2 className="sm:text-lg font-bold pb-2">
        1. Informations que nous collectons
      </h2>
      <h3 className="text-sm sm:text-base italic pb-3">
        1.1 Informations fournies par l&lsquo;utilisateur
      </h3>
      <p className="text-sm sm:text-base text-justify pb-6">
        Lors de l&lsquo;inscription, nous collectons des informations telles que
        votre nom, votre adresse e-mail, et d&lsquo;autres données nécessaires à
        la création de votre compte. De plus, lors de la soumission de recettes,
        nous recueillons des détails tels que les ingrédients, les instructions,
        les photos, et d&lsquo;autres informations liées à la recette.
      </p>
      <h3 className="text-sm sm:text-base italic pb-3">
        1.2 Informations collectées automatiquement
      </h3>
      <p className="text-sm sm:text-base text-justify pb-12">
        Nous recueillons automatiquement des informations sur votre appareil,
        telles que votre adresse IP, le type de navigateur que vous utilisez, et
        des données de cookies, afin d&lsquo;améliorer votre expérience sur
        notre site.
      </p>
      <h2 className="sm:text-lg font-bold pb-2">
        2. Comment nous utilisons vos informations
      </h2>
      <h3 className="text-sm sm:text-base italic pb-3">
        2.1 Fourniture de services
      </h3>
      <p className="text-sm sm:text-base text-justify pb-6">
        Nous utilisons vos informations pour gérer votre compte utilisateur,
        faciliter la soumission et l&lsquo;affichage de recettes, ainsi que pour
        l&lsquo;envoi de newsletters et de mises à jour.
      </p>
      <h3 className="text-sm sm:text-base italic pb-3">
        2.2 Amélioration du service
      </h3>
      <p className="text-sm sm:text-base text-justify pb-12">
        Nous analysons les données collectées pour améliorer le contenu du site
        et personnaliser l&lsquo;expérience utilisateur en fonction de vos
        préférences.
      </p>
      <h2 className="sm:text-lg font-bold pb-2">
        3. Divulgation d&lsquo;informations
      </h2>
      <h3 className="text-sm sm:text-base italic pb-3">
        3.1 Partage avec des tiers
      </h3>
      <p className="text-sm sm:text-base text-justify pb-6">
        Nous ne vendons, n&lsquo;échangeons ni ne transférons vos informations
        personnelles identifiables à des tiers sans votre consentement, sauf
        dans le but de fournir des services spécifiques.
      </p>
      <h3 className="text-sm sm:text-base italic pb-3">
        3.2 Partage de recettes
      </h3>
      <p className="text-sm sm:text-base text-justify pb-12">
        Les recettes soumises peuvent être partagées publiquement sur le site, y
        compris le nom de l&lsquo;utilisateur, afin de promouvoir la communauté
        culinaire.
      </p>
      <h2 className="sm:text-lg font-bold pb-2">4. Sécurité</h2>
      <h3 className="text-sm sm:text-base italic pb-3">
        4.1 Mesures de sécurité
      </h3>
      <p className="text-sm sm:text-base text-justify pb-12">
        Nous mettons en œuvre des mesures de sécurité techniques et
        organisationnelles pour protéger vos informations personnelles contre
        tout accès non autorisé.
      </p>
      <h2 className="sm:text-lg font-bold pb-2">5. Cookies</h2>
      <h3 className="text-sm sm:text-base italic pb-3">
        5.1 Utilisation des cookies
      </h3>
      <p className="text-sm sm:text-base text-justify pb-12">
        Nous utilisons des cookies pour améliorer votre expérience sur le site,
        en adaptant le contenu à vos préférences et en facilitant la navigation.
      </p>
      <h2 className="sm:text-lg font-bold pb-2">6. Vos droits</h2>
      <h3 className="text-sm sm:text-base italic pb-3">
        6.1 Accès et contrôle
      </h3>
      <p className="text-sm sm:text-base text-justify pb-12">
        Vous avez le droit d&lsquo;accéder à vos données personnelles, de les
        corriger et de les supprimer. Vous pouvez également contrôler les
        informations que vous nous fournissez en mettant à jour votre profil
        utilisateur.
      </p>
      <h2 className="sm:text-lg font-bold pb-2">
        7. Modifications de la politique de confidentialité
      </h2>
      <h3 className="text-sm sm:text-base italic pb-3">7.1 Mises à jour</h3>
      <p className="text-sm sm:text-base text-justify pb-12">
        Nous nous réservons le droit de mettre à jour cette politique de
        confidentialité. Les utilisateurs seront informés des changements de
        manière proactive.
      </p>
      <h2 className="sm:text-lg font-bold pb-2">8. Contact</h2>
      <h3 className="text-sm sm:text-base italic pb-3">8.1 Coordonnées</h3>
      <p className="text-sm sm:text-base text-justify pb-12">
        Pour toute question ou préoccupation concernant notre politique de
        confidentialité, n&lsquo;hésitez pas à nous contacter à{' '}
        <a
          className="text-sp-primary-500 hover:text-sp-primary-400 transition-colors"
          href="mailto:contact.salt-and-pepper@vdub-dev.fr"
        >
          contact.salt-and-pepper@vdub-dev.fr
        </a>
        .
      </p>
      <p className="text-sm sm:text-base text-justify pb-6">
        Merci d&lsquo;avoir choisi Salt & Pepper pour explorer le monde
        culinaire avec nous !
      </p>
    </div>
  );
}
