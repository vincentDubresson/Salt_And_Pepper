'use client';

import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_RANDOM_RECIPE } from '../_lib/_query/Recipe';
import Spinner from '../_components/Spinner/Spinner';

export default function RandomRecipe() {
  const [recipe, setRecipe] = useState<any>(null);

  const { loading } = useQuery(GET_RANDOM_RECIPE, {
    notifyOnNetworkStatusChange: true,
    onCompleted(data) {
      if (data) {
        console.log(data);
        setRecipe(data.randomRecipe);
      }
    },
  });

  return loading ? (
    <Spinner />
  ) : (
    <div className="w-11/12 sm:w-4/5 lg:w-2/3 mx-auto mt-28 lg:mt-40">
      
      <h1 className="text-center text-3xl font-bold">{recipe?.label}</h1>
    </div>
  );
}
