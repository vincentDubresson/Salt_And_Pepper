export type PICTURE_RECIPE_TYPE = {
  __typename?: 'ImageRecipeEdge' | undefined;
  node: {
    __typename?: 'ImageRecipe' | undefined;
    id: string;
    pictureName: string;
    sort: number;
    isApiPicture: boolean;
  };
};

export type PICTURES_RECIPE_TYPE = Array<{
  __typename?: 'ImageRecipeEdge' | undefined;
  node: {
    __typename?: 'ImageRecipe' | undefined;
    id: string;
    pictureName: string;
    sort: number;
    isApiPicture: boolean;
  };
}>;

export type RECIPE_TYPE = {
  __typename?: 'Recipe' | undefined;
  id: string;
  label: string;
  slug: string;
  description: string;
  servingNumber: number;
  servingUnit: string;
  preparationTime: string;
  cookingTime: string;
  restingTime: string;
  createdAt: string;
  updatedAt: string;
  subCategory: {
    __typename?: 'SubCategory' | undefined;
    id: string;
    label: string;
    category: {
      __typename?: 'Category' | undefined;
      id: string;
      label: string;
    };
  };
  cookingType: {
    __typename?: 'CookingType' | undefined;
    id: string;
    label: string;
  };
  difficulty: {
    __typename?: 'Difficulty' | undefined;
    id: string;
    label: string;
  };
  cost: {
    __typename?: 'Cost' | undefined;
    id: string;
    label: string;
  };
  user: {
    __typename?: 'User' | undefined;
    id: string;
    firstname: string;
    lastname: string;
    isApiPicture: boolean;
    pictureName: string;
  };
  ingredientRecipes: {
    __typename?: 'IngredientRecipe' | undefined;
    edges: Array<{
      __typename?: 'IngredientEdge' | undefined;
      node: {
        __typename?: 'Ingredient' | undefined;
        id: string;
        quantity: number;
        sort: number;
      };
    }>;
  };
  stepRecipes: {
    __typename?: 'StepRecipe' | undefined;
    edges: Array<{
      __typename?: 'StepEdge' | undefined;
      node: {
        __typename?: 'Step' | undefined;
        id: string;
        description: string;
        sort: number;
      };
    }>;
  };
  imageRecipes: {
    __typename?: 'ImageRecipe' | undefined;
    edges: Array<{
      __typename?: 'ImageRecipeEdge' | undefined;
      node: {
        __typename?: 'ImageRecipe' | undefined;
        id: string;
        pictureName: string;
        sort: number;
        isApiPicture: boolean;
      };
    }>;
  };
};

export type EDGE_RECIPE_TYPE = {
  __typename?: 'EdgeRecipe' | undefined;
  node: {
    __typename?: 'Recipe' | undefined;
    id: string;
    label: string;
    slug: string;
    description: string;
    servingNumber: number;
    servingUnit: string;
    preparationTime: string;
    cookingTime: string;
    restingTime: string;
    createdAt: string;
    updatedAt: string;
    subCategory: {
      __typename?: 'SubCategory' | undefined;
      id: string;
      label: string;
      category: {
        __typename?: 'Category' | undefined;
        id: string;
        label: string;
      };
    };
    cookingType: {
      __typename?: 'CookingType' | undefined;
      id: string;
      label: string;
    };
    difficulty: {
      __typename?: 'Difficulty' | undefined;
      id: string;
      label: string;
    };
    cost: {
      __typename?: 'Cost' | undefined;
      id: string;
      label: string;
    };
    user: {
      __typename?: 'User' | undefined;
      id: string;
      firstname: string;
      lastname: string;
      isApiPicture: boolean;
      pictureName: string;
    };
    ingredientRecipes: {
      __typename?: 'IngredientRecipe' | undefined;
      edges: Array<{
        __typename?: 'IngredientEdge' | undefined;
        node: {
          __typename?: 'Ingredient' | undefined;
          id: string;
          quantity: number;
          sort: number;
        };
      }>;
    };
    stepRecipes: {
      __typename?: 'StepRecipe' | undefined;
      edges: Array<{
        __typename?: 'StepEdge' | undefined;
        node: {
          __typename?: 'Step' | undefined;
          id: string;
          description: string;
          sort: number;
        };
      }>;
    };
    imageRecipes: {
      __typename?: 'ImageRecipe' | undefined;
      edges: Array<{
        __typename?: 'ImageRecipeEdge' | undefined;
        node: {
          __typename?: 'ImageRecipe' | undefined;
          id: string;
          pictureName: string;
          sort: number;
          isApiPicture: boolean;
        };
      }>;
    };
  };
};

export type RECIPES_TYPE = Array<{
  __typename?: 'Recipe' | undefined;
  id: string;
  label: string;
  slug: string;
  description: string;
  servingNumber: number;
  servingUnit: string;
  preparationTime: string;
  cookingTime: string;
  restingTime: string;
  createdAt: string;
  updatedAt: string;
  subCategory: {
    __typename?: 'SubCategory' | undefined;
    id: string;
    label: string;
    category: {
      __typename?: 'Category' | undefined;
      id: string;
      label: string;
    };
  };
  cookingType: {
    __typename?: 'CookingType' | undefined;
    id: string;
    label: string;
  };
  difficulty: {
    __typename?: 'Difficulty' | undefined;
    id: string;
    label: string;
  };
  cost: {
    __typename?: 'Cost' | undefined;
    id: string;
    label: string;
  };
  user: {
    __typename?: 'User' | undefined;
    id: string;
    firstname: string;
    lastname: string;
    isApiPicture: boolean;
    pictureName: string;
  };
  ingredientRecipes: {
    __typename?: 'IngredientRecipe' | undefined;
    edges: Array<{
      __typename?: 'IngredientEdge' | undefined;
      node: {
        __typename?: 'Ingredient' | undefined;
        id: string;
        quantity: number;
        sort: number;
      };
    }>;
  };
  stepRecipes: {
    __typename?: 'StepRecipe' | undefined;
    edges: Array<{
      __typename?: 'StepEdge' | undefined;
      node: {
        __typename?: 'Step' | undefined;
        id: string;
        description: string;
        sort: number;
      };
    }>;
  };
  imageRecipes: {
    __typename?: 'ImageRecipe' | undefined;
    edges: Array<{
      __typename?: 'ImageRecipeEdge' | undefined;
      node: {
        __typename?: 'ImageRecipe' | undefined;
        id: string;
        pictureName: string;
        sort: number;
        isApiPicture: boolean;
      };
    }>;
  };
}>;

export type EDGE_RECIPES_TYPE = Array<{
  __typename?: 'EdgeRecipe' | undefined;
  node: {
    __typename?: 'Recipe' | undefined;
    id: string;
    label: string;
    slug: string;
    description: string;
    servingNumber: number;
    servingUnit: string;
    preparationTime: string;
    cookingTime: string;
    restingTime: string;
    createdAt: string;
    updatedAt: string;
    subCategory: {
      __typename?: 'SubCategory' | undefined;
      id: string;
      label: string;
      category: {
        __typename?: 'Category' | undefined;
        id: string;
        label: string;
      };
    };
    cookingType: {
      __typename?: 'CookingType' | undefined;
      id: string;
      label: string;
    };
    difficulty: {
      __typename?: 'Difficulty' | undefined;
      id: string;
      label: string;
    };
    cost: {
      __typename?: 'Cost' | undefined;
      id: string;
      label: string;
    };
    user: {
      __typename?: 'User' | undefined;
      id: string;
      firstname: string;
      lastname: string;
      isApiPicture: boolean;
      pictureName: string;
    };
    ingredientRecipes: {
      __typename?: 'IngredientRecipe' | undefined;
      edges: Array<{
        __typename?: 'IngredientEdge' | undefined;
        node: {
          __typename?: 'Ingredient' | undefined;
          id: string;
          quantity: number;
          sort: number;
        };
      }>;
    };
    stepRecipes: {
      __typename?: 'StepRecipe' | undefined;
      edges: Array<{
        __typename?: 'StepEdge' | undefined;
        node: {
          __typename?: 'Step' | undefined;
          id: string;
          description: string;
          sort: number;
        };
      }>;
    };
    imageRecipes: {
      __typename?: 'ImageRecipe' | undefined;
      edges: Array<{
        __typename?: 'ImageRecipeEdge' | undefined;
        node: {
          __typename?: 'ImageRecipe' | undefined;
          id: string;
          pictureName: string;
          sort: number;
          isApiPicture: boolean;
        };
      }>;
    };
  };
}>;