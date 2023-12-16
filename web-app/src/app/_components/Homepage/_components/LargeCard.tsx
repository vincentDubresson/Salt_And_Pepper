import {
  EDGE_RECIPE_TYPE,
  PICTURE_RECIPE_TYPE,
} from '@/app/_lib/_type/RecipeTypes';
import PictureService from '@/app/_service/PictureService';
import { useEffect, useState } from 'react';

export default function LargeCard({ recipe }: { recipe: EDGE_RECIPE_TYPE }) {
  const [picture, setPicture] = useState<PICTURE_RECIPE_TYPE>();
  const [pictureName, setPictureName] = useState<string>('');

  useEffect(() => {
    if (recipe) {
      setPicture(recipe.node.imageRecipes.edges[0] as PICTURE_RECIPE_TYPE);
      setPictureName(recipe.node.imageRecipes.edges[0]?.node.pictureName);
    }
  }, [recipe]);

  console.log(recipe);

  return (
    <div className="rounded-lg pb-3 hover:shadow transition">
      <button className="flex flex-col items-start w-full h-full">
        <div className="relative overflow-hidden rounded-lg h-60">
          <img
            className="rounded-lg hover:scale-110 transform transition-all duration-500 ease-in-out object-center"
            src={
              picture?.node.isApiPicture
                ? process.env.NEXT_PUBLIC_API_RECIPE_PICTURE_URL +
                  PictureService.getPictureUrl(pictureName as string)
                : process.env.NEXT_PUBLIC_WEB_APP_RECIPE_PICTURE_URL +
                  PictureService.getPictureUrl(pictureName as string)
            }
            alt="première image de la recette"
          />
          <div>
            <p className="absolute top-0 left-0 m-2 p-1 rounded text-sm font-medium leading-tight bg-sp-primary-250 text-gray-50">
              {recipe?.node.subCategory.category.label} {'>'}{' '}
              {recipe?.node.subCategory.label}
            </p>
          </div>
        </div>
        <p className="text-base">{recipe?.node.label}</p>
        <div className="text-base flex items-center gap-2">
          <img
            className="rounded-lg w-6 h-6"
            src={
              recipe?.node.user.isApiPicture
                ? process.env.NEXT_PUBLIC_API_USER_PICTURE_URL +
                  PictureService.getPictureUrl(
                    recipe?.node.user.pictureName || ''
                  )
                : process.env.NEXT_PUBLIC_WEB_APP_USER_PICTURE_URL +
                  PictureService.getPictureUrl(
                    recipe?.node.user.pictureName || ''
                  )
            }
            alt="icone de l'auteur de la recette"
          />
          <small className="">
            {recipe?.node.user.firstname} {recipe?.node.user.lastname}
          </small>
        </div>
      </button>
    </div>
  );
}
