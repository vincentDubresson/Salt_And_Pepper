import { RECIPE_TYPE } from '@/app/_lib/_type/RecipeTypes';
import { useEffect, useState } from 'react';

export default function Ingredients({ recipe }: { recipe: RECIPE_TYPE }) {
  const [dynamicRecipe, setDynamicRecipe] = useState<RECIPE_TYPE>();
  const [servingNumber, setServingNumber] = useState<number>(0);
  const [dynamicServingNumber, setDynamicServingNumber] = useState<number>(0);

  const quantityAdjust = async (
    recipe: any,
    finalNbOfPerson: number,
    originNbOfPerson: number
  ) => {
    const factor = finalNbOfPerson / originNbOfPerson;

    const recipeCopy = {
      ...recipe,
      ingredientRecipes: {
        ...recipe.ingredientRecipes,
        edges: recipe.ingredientRecipes.edges.map((edge: any) => ({
          ...edge,
          node: {
            ...edge.node,
            quantity: Math.round(edge.node.quantity * factor * 2) / 2,
          },
        })),
      },
    };

    setDynamicRecipe(recipeCopy);
  };

  const changeDynamicServingNumber = async (number: number) => {
    setDynamicServingNumber(number);
  };

  const handleIncrement = async (recipe: any) => {
    let number = dynamicServingNumber + 1;

    await changeDynamicServingNumber(number);
    await quantityAdjust(recipe, number, servingNumber);
  };

  const handleDecrement = async (recipe: any) => {
    let number =
      dynamicServingNumber > 1
        ? dynamicServingNumber - 1
        : dynamicServingNumber;

    await changeDynamicServingNumber(number);
    await quantityAdjust(recipe, number, servingNumber);
  };

  useEffect(() => {
    setServingNumber(recipe?.servingNumber);
    setDynamicServingNumber(recipe?.servingNumber);
    setDynamicRecipe(recipe);
  }, [recipe?.servingNumber, recipe]);

  return (
    <div className="flex flex-col gap-8">
      <div className="inline-flex m-auto rounded-md shadow-md" role="group">
        <button
          type="button"
          className="px-4 py-2 text-lg font-medium text-gray-500 bg-white border border-gray-200 rounded-s-lg hover:bg-sp-primary-100 active:bg-sp-primary-200"
          onClick={() => {
            handleDecrement(recipe);
          }}
        >
          -
        </button>
        <div className="flex justify-center items-center gap-2 px-4 border-y border-gray-200">
          <span className="text-sp-primary-400">{dynamicServingNumber}</span>
          <span>{recipe?.servingUnit}</span>
        </div>
        <button
          type="button"
          className="px-4 py-2 text-lg font-medium text-gray-500 bg-white border border-gray-200 rounded-e-lg hover:bg-sp-primary-100 active:bg-sp-primary-200"
          onClick={() => {
            handleIncrement(recipe);
          }}
        >
          +
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {dynamicRecipe?.ingredientRecipes.edges.map((ingredient: any) => (
          <div
            key={ingredient.node.id}
            className="flex justify-start items-center gap-2"
          >
            <input className="cursor-pointer me-3" type="checkbox" />
            <span className="text-sp-primary-400">
              {ingredient.node.quantity >= 0.5
                ? (Math.round(ingredient.node.quantity * 2) / 2).toFixed(1)
                : 0.5}
            </span>
            <span>{ingredient.node.unity.abreviation}</span>
            <span>{ingredient.node.ingredient.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
