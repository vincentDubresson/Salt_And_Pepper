import { gql } from '@apollo/client';

export const LOGIN_CHECK_USER = gql`
  mutation LoginCheckUser($email: String!, $plainPassword: String!) {
    loginCheckUser(input: { email: $email, plainPassword: $plainPassword }) {
      user {
        token
        id
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      firstname
      lastname
      slug
      email
      roles
      address1
      address2
      zipCode
      city
      country
      phoneNumber
      birthDate
      pictureName
      isEnable
      isFirstConnexion
      createdAt
      updatedAt
    }
  }
`;
