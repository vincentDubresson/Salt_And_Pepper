import { gql } from '@apollo/client';

export const GET_RECIPES = gql`
  query GetRecipes {
    recipes {
      edges {
        node {
          id
          label
          slug
          description
          servingNumber
          servingUnit
          preparationTime
          cookingTime
          restingTime
          createdAt
          updatedAt
          subCategory {
            id
            label
            category {
              id
              label
            }
          }
          cookingType {
            id
            label
          }
          difficulty {
            id
            label
          }
          cost {
            id
            label
          }
          user {
            id
            firstname
            lastname
          }
          ingredientRecipes {
            edges {
              node {
                id
                quantity
                sort
                unity {
                  id
                }
                ingredient {
                  id
                }
              }
            }
          }
          stepRecipes {
            edges {
              node {
                id
                description
                sort
              }
            }
          }
          imageRecipes {
            edges {
              node {
                id
                pictureName
                sort
                isApiPicture
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_RANDOM_RECIPE = gql`
  query GetRandomRecipe {
    randomRecipe {
      id
      label
      slug
      description
      servingNumber
      servingUnit
      preparationTime
      cookingTime
      restingTime
      createdAt
      updatedAt
      subCategory {
        id
        label
        category {
          id
          label
        }
      }
      cookingType {
        id
        label
      }
      difficulty {
        id
        label
      }
      cost {
        id
        label
      }
      user {
        id
        firstname
        lastname
        pictureName
      }
      stepRecipes {
        edges {
          node {
            id
            description
            sort
          }
        }
      }
      imageRecipes {
        edges {
          node {
            id
            pictureName
            sort
            isApiPicture
          }
        }
      }
      ingredientRecipes {
        edges {
          node {
            id
            quantity
            sort
            unity {
              id
              label
              abreviation
            }
            ingredient {
              id
              label
            }
          }
        }
      }
    }
  }
`;
