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
      acceptNewsletter
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser(
    $firstname: String!
    $lastname: String!
    $email: String!
    $plainPassword: String!
    $isAdmin: Boolean!
    $address1: String
    $address2: String
    $zipCode: Int
    $city: String
    $country: String!
    $phoneNumber: String
    $birthDate: String
    $isEnable: Boolean!
    $pictureName: String
    $acceptNewsletter: Boolean!
  ) {
    createUser(
      input: {
        firstname: $firstname
        lastname: $lastname
        email: $email
        plainPassword: $plainPassword
        isAdmin: $isAdmin
        address1: $address1
        address2: $address2
        zipCode: $zipCode
        city: $city
        country: $country
        phoneNumber: $phoneNumber
        birthDate: $birthDate
        isEnable: $isEnable
        pictureName: $pictureName
        acceptNewsletter: $acceptNewsletter
      }
    ) {
      user {
        id
        firstname
        lastname
      }
    }
  }
`;
