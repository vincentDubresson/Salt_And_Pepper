'use client';

import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_RANDOM_RECIPE } from '../_lib/_query/Recipe';
import Spinner from '../_components/Spinner/Spinner';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import Carousel from '../_components/Recipe/Carousel';
import Breadcrumb from '../_components/Recipe/Breadcrumb';
import Resume from '../_components/Recipe/Resume';
import Ingredients from '../_components/Recipe/Ingredients';
import Steps from '../_components/Recipe/Steps';
import Separator from '../_components/Recipe/Separator';
import { RECIPE_TITLE } from '../_lib/_constant/Constants';
import { RECIPE_TYPE } from '../_lib/_type/RecipeTypes';
import { toast } from 'react-toastify';
import Description from '../_components/Recipe/Description';
import MainLogo from '../../../public/pictures/logo/salt_and_pepper_logo.png';

export default function RandomRecipe() {
  const [recipe, setRecipe] = useState<RECIPE_TYPE>();

  const { loading } = useQuery(GET_RANDOM_RECIPE, {
    notifyOnNetworkStatusChange: true,
    onCompleted(data) {
      try {
        if (data.randomRecipe) {
          setRecipe(data.randomRecipe);
        }
      } catch (error) {
        toast.warn('Aucune recette trouvée.');
      }
    },
  });

  return loading ? (
    <Spinner />
  ) : !recipe ? (
    <div className="flex flex-col w-11/12 sm:w-4/5 lg:w-1/2 mx-auto mt-28 lg:mt-40">
      <img
        className="w-32 sm:w-40 lg:w-48 m-auto pb-3"
        src={MainLogo.src}
        alt="Salt & Pepper Logo"
      />
      <h1 className="font-nothing-you-could-do text-center text-xl sm:text-2xl lg:text-3xl font-bold py-3">
        Aucune recette trouvée.
      </h1>
    </div>
  ) : (
    <div className="flex flex-col w-11/12 sm:w-4/5 lg:w-1/2 mx-auto mt-28 lg:mt-40">
      <div className="mb-8 text-xs md:text-sm">
        <Breadcrumb recipe={recipe} />
      </div>

      {/* TODO: Mettre en place le système de favoris sur le titre */}
      <div className="flex justify-center items-center gap-2 mt-3 mb-12">
        <h1 className="text-xl md:text-2xl font-bold">{recipe?.label}</h1>
        <StarBorderIcon className="text-gray-300" />
      </div>

      <div className="mb-12">
        {recipe && <Carousel recipePictures={recipe?.imageRecipes.edges} />}
      </div>

      <div className="flex justify-center gap-4 pb-8 text-sm">
        <Resume recipe={recipe} />
      </div>

      {recipe?.description && (
        <>
          <Separator title={RECIPE_TITLE.description} />

          <Description recipe={recipe} />
        </>
      )}

      <Separator title={RECIPE_TITLE.ingredient} />

      <div className="mt-8 pb-8 text-sm lg:text-base">
        <Ingredients recipe={recipe} />
      </div>

      <Separator title={RECIPE_TITLE.step} />

      <div className="mt-8 pb-8 text-sm lg:text-base border-b-2 border-sp-primary-300">
        <Steps recipe={recipe} />
      </div>
    </div>
  );
}
