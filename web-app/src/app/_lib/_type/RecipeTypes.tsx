export type PICTURES_RECIPE_TYPE = Array<{
  __typename?: 'ImageRecipeEdge' | undefined;
  node: {
    __typename?: 'ImageRecipe' | undefined;
    id: string;
    pictureName: string;
    sort: number;
  };
}>;

export type RECIPE_TYPE = {
  __typename?: 'Recipe' | undefined;
  id: string;
  label: string;
  slug: string;
};
