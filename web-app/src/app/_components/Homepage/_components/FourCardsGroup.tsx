import { EDGE_RECIPES_TYPE } from '@/app/_lib/_type/RecipeTypes';
import PictureService from '@/app/_service/PictureService';

export default function FourCardsGroup({
  recipes,
}: {
  recipes: EDGE_RECIPES_TYPE;
}) {
  console.log(recipes);

  return (
    <div>
      <div className="grid grid-cols-2 gap-5">
        {recipes?.map((recipe) => (
          <div
            key={recipe.node.id}
            className="rounded-lg pb-3 hover:shadow transition"
          >
            <button className="flex flex-col items-start w-full h-full">
              <div className="relative overflow-hidden rounded-lg h-36">
                <img
                  className="rounded-lg hover:scale-110 transform transition-all duration-500 ease-in-out object-center"
                  src={
                    recipe.node.imageRecipes.edges[0]?.node.isApiPicture
                      ? process.env.NEXT_PUBLIC_API_RECIPE_PICTURE_URL +
                        PictureService.getPictureUrl(recipe.node.imageRecipes.edges[0]?.node.pictureName)
                      : process.env.NEXT_PUBLIC_WEB_APP_RECIPE_PICTURE_URL +
                        PictureService.getPictureUrl(recipe.node.imageRecipes.edges[0]?.node.pictureName)
                  }
                  alt="première image de la recette"
                />
              </div>
              <p className="text-base text-left">{recipe.node.label}</p>
              <div className="text-base flex items-center gap-2">
                <img
                  className="rounded-lg w-6 h-6"
                  src={
                    recipe.node.user.isApiPicture
                      ? process.env.NEXT_PUBLIC_API_USER_PICTURE_URL +
                        PictureService.getPictureUrl(recipe.node.user.pictureName)
                      : process.env.NEXT_PUBLIC_WEB_APP_USER_PICTURE_URL +
                        PictureService.getPictureUrl(recipe.node.user.pictureName)
                  }
                  alt="icone de l'auteur de la recette"
                />
                <small className="">
                  {recipe.node.user.firstname} {recipe.node.user.lastname}
                </small>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
