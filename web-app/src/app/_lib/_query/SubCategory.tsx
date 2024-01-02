import { gql } from '@apollo/client';

export const GET_LIGHT_SUB_CATEGORIES = gql`
  query GetSubCategories {
    subCategories {
      edges {
        node {
          id
          label
          slug
        }
      }
    }
  }
`;

export const GET_FULL_SUB_CATEGORIES = gql`
  query GetSubCategories {
    subCategories {
      edges {
        node {
          id
          label
          slug
          sort
          category {
            id
            label
            slug
            sort
          }
        }
      }
    }
  }
`;
