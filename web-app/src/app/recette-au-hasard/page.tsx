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
import {
  CUSTOM_ERROR_MESSAGE,
  RECIPE_TITLE,
} from '../_lib/_constant/Constants';
import { RECIPE_TYPE } from '../_lib/_type/RecipeTypes';
import { toast } from 'react-toastify';
import Description from '../_components/Recipe/Description';

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
    onError() {
      toast.error(CUSTOM_ERROR_MESSAGE);
    },
  });

  return loading ? (
    <Spinner />
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
