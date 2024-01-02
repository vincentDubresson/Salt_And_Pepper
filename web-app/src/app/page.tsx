'use client';

import { useState } from 'react';
import { EDGE_RECIPES_TYPE } from './_lib/_type/RecipeTypes';
import { GET_LAST_FOUR_RECIPES } from './_lib/_query/Recipe';
import { useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import Spinner from './_components/Spinner/Spinner';
import LastFourRecipes from './_components/Homepage/LastFourRecipes';
import { FULL_SUB_CATEGORY_TYPES } from './_lib/_type/SubCategoryTypes';
import { GET_FULL_SUB_CATEGORIES } from './_lib/_query/SubCategory';

export default function Home() {
  const [lastFourRecipes, setLastFourRecipes] = useState<EDGE_RECIPES_TYPE>();
  const [subCategories, setSubCategories] = useState<FULL_SUB_CATEGORY_TYPES>();

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

  useQuery(GET_FULL_SUB_CATEGORIES, {
    notifyOnNetworkStatusChange: true,
    onCompleted(data) {
      try {
        if (data.subCategories) {
          setSubCategories(data.subCategories.edges);
        }
      } catch (error) {
        toast.warn('Aucune sous-catégorie trouvée.');
      }
    },
  });

  console.log(subCategories);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <div className="w-11/12 sm:w-4/5 lg:w-2/3 mx-auto mt-28 lg:mt-40">
        <LastFourRecipes recipes={lastFourRecipes as EDGE_RECIPES_TYPE} />
      </div>

      <div className="relative mt-5 px-10 bg-sp-primary-100 -z-20">
        <p className="font-nothing-you-could-do text-center text-2xl sm:text-3xl font-bold pt-8 mb-8">
          Recettes par thème
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 pb-10">
          {subCategories
            ?.filter(
              (subCategory) => subCategory.node.category.label !== 'Les bases'
            )
            .map((subCategory) => (
              <button
                className="text-gray-600 hover:text-sp-primary-500 transition-colors text-left"
                key={subCategory.node.id}
              >
                {subCategory.node.label}
              </button>
            ))}
        </div>
      </div>
    </>
  );
}
