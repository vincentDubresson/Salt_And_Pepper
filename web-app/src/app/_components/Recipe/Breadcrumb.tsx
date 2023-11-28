import { AppContext } from '@/app/_lib/_context/AppContext';
import { PROJECT_ROUTE } from '@/app/_lib/_router/Routes';
import { RECIPE_TYPE } from '@/app/_lib/_type/RecipeTypes';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';

export default function Breadcrumb({ recipe }: { recipe: RECIPE_TYPE }) {
  const setLinkClicked = useContext(AppContext)
    ?.setLinkClicked as React.Dispatch<React.SetStateAction<boolean>>;
  const router = useRouter();

  return (
    <p>
      {/* TODO: Ajouter les liens au fil d'ariane */}
      <button
        className="text-gray-500 hover:text-sp-primary-400 transition-colors cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          setLinkClicked(true);
          router.replace(PROJECT_ROUTE.HOME);
        }}
      >
        Accueil
      </button>{' '}
      <span className="text-sp-primary-400">&gt;</span>{' '}
      <button
        className="text-gray-500 hover:text-sp-primary-400 transition-colors cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          setLinkClicked(true);
          router.replace(PROJECT_ROUTE.RECETTE_AU_HASARD);
        }}
      >
        Recette au hasard
      </button>{' '}
      <span className="text-sp-primary-400">&gt;</span>{' '}
      <button
        className="text-gray-500 hover:text-sp-primary-400 transition-colors cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          setLinkClicked(true);
          router.replace(PROJECT_ROUTE.HOME);
        }}
      >
        {recipe?.subCategory.category.label}
      </button>{' '}
      <span className="text-sp-primary-400">&gt;</span>{' '}
      <button
        className="text-gray-500 hover:text-sp-primary-400 transition-colors cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          setLinkClicked(true);
          router.replace(PROJECT_ROUTE.HOME);
        }}
      >
        {recipe?.subCategory.label}
      </button>{' '}
      <span className="text-sp-primary-400">&gt;</span>{' '}
      <span className="text-gray-500">{recipe?.label}</span>
    </p>
  );
}
