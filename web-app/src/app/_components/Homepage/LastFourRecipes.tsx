import {
  EDGE_RECIPES_TYPE,
  EDGE_RECIPE_TYPE,
} from '@/app/_lib/_type/RecipeTypes';
import { useEffect, useState } from 'react';
import MainLogo from '../../../../public/pictures/logo/salt_and_pepper_logo.png';
import LargeCard from './_components/LargeCard';
import FourCardsGroup from './_components/FourCardsGroup';

export default function LastFourRecipes({
  recipes,
}: {
  recipes: EDGE_RECIPES_TYPE;
}) {
  const [firstRecipe, setFirstRecipe] = useState<EDGE_RECIPE_TYPE>();
  const [otherRecipes, setOtherRecipes] = useState<EDGE_RECIPES_TYPE>();

  useEffect(() => {
    if (recipes && recipes.length > 0) {
      setFirstRecipe(recipes[0] as EDGE_RECIPE_TYPE);
      setOtherRecipes(recipes.slice(1) as EDGE_RECIPES_TYPE);
    }
  }, [recipes]);

  return (
    <>
      <img
        className="w-32 sm:w-40 lg:w-48 m-auto pb-3"
        src={MainLogo.src}
        alt="Salt & Pepper Logo"
      />

      <h1 className="text-center font-nothing-you-could-do text-3xl font-bold mb-8">
        Les dernières recettes
      </h1>

      <LargeCard recipe={firstRecipe as EDGE_RECIPE_TYPE} />

      <FourCardsGroup recipes={otherRecipes as EDGE_RECIPES_TYPE} />
    </>
  );
}
