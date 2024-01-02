import { RECIPE_TYPE } from '@/app/_lib/_type/RecipeTypes';

export default function Description({
  recipe,
}: {
  recipe: RECIPE_TYPE | undefined;
}) {
  const url = process.env.NEXT_PUBLIC_API_USER_PICTURE_URL as string;
  const imageSource = (url + recipe?.user.pictureName) as string;
  return (
    <>
      <div className="flex flex-col items-center gap-2 m-auto pt-4">
        <img
          className="inline-block h-8 w-8 rounded-full ring-2 ring-white text-center"
          src={imageSource}
          alt=""
        />
        <p className="font-nothing-you-could-do">
          {recipe?.user.firstname} {recipe?.user.lastname}
        </p>
      </div>

      <div className="m-auto mt-8 pb-8">
        <p className="font-nothing-you-could-do text-sm lg:text-base font-bold text-justify">
          {recipe?.description}
        </p>
      </div>
    </>
  );
}
