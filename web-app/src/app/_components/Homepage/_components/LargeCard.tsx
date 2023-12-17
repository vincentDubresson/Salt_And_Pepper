import {
  EDGE_RECIPE_TYPE,
  PICTURE_RECIPE_TYPE,
} from '@/app/_lib/_type/RecipeTypes';
import PictureService from '@/app/_service/PictureService';
import { useEffect, useState } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DateService from '@/app/_service/DateService';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import EuroIcon from '@mui/icons-material/Euro';

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
    <div className="flex flex-col items-center rounded-lg transition">
      <button className="flex flex-col items-start w-full max-w-120 sm:max-w-160 lg:max-w-120 h-full">
        <div className="flex justify-center items-center max-w-full relative overflow-hidden rounded-lg h-60 sm:h-80">
          <img
            className="min-h-full object-cover rounded-lg hover:scale-110 transform transition-all duration-500 ease-in-out object-center"
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
        <p className="hidden sm:block font-nothing-you-could-do font-bold text-justify">
          {recipe?.node.description}
        </p>
        <div className="hidden lg:flex py-4 gap-3">
          <div className="flex items-center gap-2">
            <AccessTimeIcon className="text-sp-primary-400" />
            <p>
              {DateService.sommeHeuresMinutesFormatees(
                recipe?.node.preparationTime as string,
                recipe?.node.restingTime as string,
                recipe?.node.cookingTime as string
              )}
            </p>
          </div>
          <p>-</p>
          <div className="flex items-center gap-2">
            <SignalCellularAltIcon className="text-sp-primary-400" />
            <p>{recipe?.node.difficulty.label}</p>
          </div>
          <p>-</p>
          <div className="flex items-center gap-2">
            <EuroIcon className="text-sp-primary-400" />
            <p>{recipe?.node.cost.label}</p>
          </div>
        </div>
        <div className="text-base flex items-center gap-2 mt-auto">
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
