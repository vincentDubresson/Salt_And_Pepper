import { RECIPE_TYPE } from '@/app/_lib/_type/RecipeTypes';
import DateService from '@/app/_service/DateService';

export default function Steps({ recipe }: { recipe: RECIPE_TYPE }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col bg-sp-primary-100 shadow-md">
        <p className="text-center py-3">
          Temps total :{' '}
          <span className="text-sp-primary-400">
            {' '}
            {DateService.sommeHeuresMinutesFormatees(
              recipe?.preparationTime,
              recipe?.restingTime,
              recipe?.cookingTime
            )}
          </span>
        </p>
        <div className="flex justify-center py-3 border-t border-sp-primary-200">
          <div className="flex w-1/3 flex-col justify-center items-center gap-2">
            <p>Préparation</p>
            <p className="text-sp-primary-400">
              {DateService.formatHeuresMinutes(recipe?.preparationTime)}
            </p>
          </div>
          <div className="flex w-1/3 flex-col justify-center items-center gap-2">
            <p>Repos</p>
            <p className="text-sp-primary-400">
              {DateService.formatHeuresMinutes(recipe?.restingTime)}
            </p>
          </div>
          <div className="flex w-1/3 flex-col justify-center items-center gap-2">
            <p>Cuisson</p>
            <p className="text-sp-primary-400">
              {DateService.formatHeuresMinutes(recipe?.cookingTime)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col text-justify gap-6 pt-8">
        {recipe?.stepRecipes.edges.map((step: any) => (
          <div
            key={step.node.id}
            className="flex justify-start items-start gap-2"
          >
            <span className="text-sp-primary-400">{step.node.sort}.</span>
            <span>{step.node.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
