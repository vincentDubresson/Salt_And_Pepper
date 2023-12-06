'use client';

import { useState } from 'react';
import { EDGE_RECIPES_TYPE } from './_lib/_type/RecipeTypes';
import { GET_LAST_FOUR_RECIPES } from './_lib/_query/Recipe';
import { useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import Spinner from './_components/Spinner/Spinner';
import LastFourRecipes from './_components/Homepage/LastFourRecipes';

export default function Home() {
  const [lastFourRecipes, setLastFourRecipes] = useState<EDGE_RECIPES_TYPE>();

  const { loading } = useQuery(GET_LAST_FOUR_RECIPES, {
    notifyOnNetworkStatusChange: true,
    onCompleted(data) {
      try {
        if (data.lastFourRecipes.edges) {
          setLastFourRecipes(data.lastFourRecipes.edges);
        }
      } catch (error) {
        toast.warn('Aucune recette trouvée.');
      }
    },
  });
  return loading ? (
    <Spinner />
  ) : (
    <div className="w-11/12 sm:w-4/5 lg:w-2/3 mx-auto mt-28 lg:mt-40">
      <LastFourRecipes recipes={lastFourRecipes as EDGE_RECIPES_TYPE} />
    </div>
  );
}
