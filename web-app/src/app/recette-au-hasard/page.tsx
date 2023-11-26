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

export default function RandomRecipe() {
  const [recipe, setRecipe] = useState<any>(null);

  console.log(recipe);

  /* TODO: Finir la query */
  const { loading } = useQuery(GET_RANDOM_RECIPE, {
    notifyOnNetworkStatusChange: true,
    onCompleted(data) {
      if (data) {
        setRecipe(data.randomRecipe);
      }
    },
  });

  return loading ? (
    <Spinner />
  ) : (
    <div className="flex flex-col w-11/12 sm:w-4/5 lg:w-1/2 mx-auto mt-28 lg:mt-40">
      <div className="mb-8">
        <Breadcrumb recipe={recipe} />
      </div>

      {/* TODO: Mettre en place le système de favoris sur le titre */}
      <div className="flex justify-center items-center gap-2 mb-8">
        <h1 className="text-xl font-bold">{recipe?.label}</h1>
        <StarBorderIcon className="text-gray-300" />
      </div>

      <div className="mb-12">
        {recipe && <Carousel recipePictures={recipe?.imageRecipes.edges} />}
      </div>

      <div className="flex justify-center gap-4 pb-8 border-b border-sp-primary-300 text-sm">
        <Resume recipe={recipe} />
      </div>

      {recipe?.description && (
        <div className="mt-8 pb-8 border-b border-sp-primary-300">
          <p className="font-nothing-you-could-do text-sm font-bold text-justify">
            {recipe.description}
          </p>
        </div>
      )}

      <div>
        <Ingredients recipe={recipe} />
      </div>
    </div>
  );
}
