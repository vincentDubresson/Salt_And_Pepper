import { EDGE_RECIPES_TYPE } from '@/app/_lib/_type/RecipeTypes';
import PictureService from '@/app/_service/PictureService';

export default function FourCardsGroup({
  recipes,
}: {
  recipes: EDGE_RECIPES_TYPE;
}) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:flex sm:flex-col sm:justify-start max-w-120 sm:max-w-160 m-auto">
        {recipes?.map((recipe) => (
          <div
            key={recipe.node.id}
            className="rounded-lg transition sm:h-36 sm:last:hidden"
          >
            <button className="relative flex flex-col sm:flex-row items-start w-full h-full overflow-hidden">
              <div className="relative overflow-hidden rounded-lg h-36 w-full sm:w-40">
                <img
                  className="min-h-full object-cover rounded-lg hover:scale-110 transform transition-all duration-500 ease-in-out object-center"
                  src={
                    recipe.node.imageRecipes.edges[0]?.node.isApiPicture
                      ? process.env.NEXT_PUBLIC_API_RECIPE_PICTURE_URL +
                        PictureService.getPictureUrl(
                          recipe.node.imageRecipes.edges[0]?.node.pictureName
                        )
                      : process.env.NEXT_PUBLIC_WEB_APP_RECIPE_PICTURE_URL +
                        PictureService.getPictureUrl(
                          recipe.node.imageRecipes.edges[0]?.node.pictureName
                        )
                  }
                  alt="première image de la recette"
                />
              </div>
              <div className="flex-1 flex flex-col justify-start gap-1 mt-2 sm:mt-0 sm:ml-2 sm:h-36">
                <p className="p-1 w-fit m-w-100 text-xs sm:text-sm rounded text-left font-medium leading-tight bg-sp-primary-250 text-gray-50 truncate">
                  {recipe?.node.subCategory.category.label} {'>'}{' '}
                  {recipe?.node.subCategory.label}
                </p>
                <p className="text-base text-left sm:line-clamp-1">
                  {recipe.node.label}
                </p>
                <p className="hidden sm:line-clamp-2 font-nothing-you-could-do font-bold text-justify">
                  {recipe?.node.description}
                </p>
                <div className="text-base flex items-center gap-2 mt-auto">
                  <img
                    className="rounded-lg w-6 h-6"
                    src={
                      recipe.node.user.isApiPicture
                        ? process.env.NEXT_PUBLIC_API_USER_PICTURE_URL +
                          PictureService.getPictureUrl(
                            recipe.node.user.pictureName
                          )
                        : process.env.NEXT_PUBLIC_WEB_APP_USER_PICTURE_URL +
                          PictureService.getPictureUrl(
                            recipe.node.user.pictureName
                          )
                    }
                    alt="icone de l'auteur de la recette"
                  />
                  <small className="">
                    {recipe.node.user.firstname} {recipe.node.user.lastname}
                  </small>
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
