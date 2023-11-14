import { gql } from '@apollo/client';

export const LOGIN_CHECK_USER = gql`
  mutation LoginCheckUser($email: String!, $plainPassword: String!) {
    loginCheckUser(input: { email: $email, plainPassword: $plainPassword }) {
      user {
        token
        id
        email
      }
    }
  }
`;
