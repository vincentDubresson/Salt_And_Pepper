import DateService from '@/app/_service/DateService';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import EuroIcon from '@mui/icons-material/Euro';
import { RECIPE_TYPE } from '@/app/_lib/_type/RecipeTypes';

export default function Resume({
  recipe,
}: {
  recipe: RECIPE_TYPE | undefined;
}) {
  return (
    <>
      <div className="flex items-center gap-2">
        <AccessTimeIcon className="text-sp-primary-400" />
        <p>
          {DateService.sommeHeuresMinutesFormatees(
            recipe?.preparationTime as string,
            recipe?.restingTime as string,
            recipe?.cookingTime as string
          )}
        </p>
      </div>
      <p>-</p>
      <div className="flex items-center gap-2">
        <SignalCellularAltIcon className="text-sp-primary-400" />
        <p>{recipe?.difficulty.label}</p>
      </div>
      <p>-</p>
      <div className="flex items-center gap-2">
        <EuroIcon className="text-sp-primary-400" />
        <p>{recipe?.cost.label}</p>
      </div>
    </>
  );
}
