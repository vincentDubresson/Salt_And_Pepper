# Api Platform GraphQL Queries and Mutations

- [User - Queries](#user---queries)
- [User - Mutations](#user---mutations)
- [Category - Queries](#category---queries)
- [SubCategory - Queries](#subcategory---queries)

## User - Queries

### GetUsers

```
query GetUsers {
  users {
    edges {
      node {
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
        imageName
        isEnable
        isFirstConnexion
    	createdAt
        updatedAt
      }
    }
  }
}
```
```json
{
  "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2OTgwMDU0NDMsImV4cCI6MTY5ODAwOTA0Mywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoidmluY2VudC5kdWJyZXNzb25AbGl2ZS5mciJ9.fVbOeSLssWSXdsaYP1OE_Jr9qzQiYwWaUuM3OmsQ-K40G_oPXqfi80dOVmgfjAzEln50PHt2GHE7oBMDpBxmuBtIJRElznGIIoEuuZ7F_adb0KcZJFTxQIssdaxBRzPBqu1YgF10aOk6hmWOBa1XTbEz8tUaFxWGYqJm3hKmO5mLash-Bjiz7ywetOKBMH6Apr1lTd5mwKLu6BigOxNQZTiobff5q3CXkreQfNxvc61lTGJbZgXMNx2hWcCVIFD-DnMQvOW-wq7Ty6OL7hpjDMKqRTzX1N2oJvp87x-XMoHh1cY_vTsRKK0Y4eaQ7sSBwiB35EWvO3zDCJfLnZqdqw"
}
```

### GetUser

```
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
        imageName
        isEnable
        isFirstConnexion
    		createdAt
        updatedAt
  }
}
```
```json
{
  "id": "/api/users/<id>"
}
```

## User - Mutations

### CreateUser

```
mutation CreateUser(
  $firstname: String!, $lastname: String!, $email: String!,
  $plainPassword: String!, $isAdmin: Boolean!, $address1: String,
  $address2: String, $zipCode: Int, $city: String, $country: String!,
  $phoneNumber: String, $birthDate: String, $isEnable: Boolean!,
  $imageName: String, $isFirstConnexion: Boolean!
) {
  createUser(
    input: {
      firstname: $firstname, lastname: $lastname, email: $email,
      plainPassword: $plainPassword, isAdmin: $isAdmin, address1: $address1,
      address2: $address2, zipCode: $zipCode, city: $city, country: $country,
      phoneNumber: $phoneNumber, birthDate: $birthDate, isEnable: $isEnable,
      imageName: $imageName, isFirstConnexion: $isFirstConnexion
    }
  ) {
    user {
      id
      firstname
      lastname
    }
  }
}
```
```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "johndoe@test.fr",
  "plainPassword": "Azerty69!",
  "isAdmin": false,
  "address1": null,
  "address2": null,
  "zipCode": null,
  "city": null,
  "country": "France",
  "phoneNumber": null,
  "birthDate": null,
  "isEnable": false,
  "imageName": null,
  "isFirstConnexion": true
}
```

### UpdateUser

```
mutation UpdateUser(
  $id: ID!, $firstname: String!, $lastname: String!, $email: String!,
  $plainPassword: String, $isAdmin: Boolean!, $address1: String,
  $address2: String, $zipCode: Int, $city: String, $country: String!,
  $phoneNumber: String, $birthDate: String, $isEnable: Boolean!,
  $imageName: String, $isFirstConnexion: Boolean!
) {
  updateUser(
    input: {
      id: $id, firstname: $firstname, lastname: $lastname, email: $email,
      plainPassword: $plainPassword, isAdmin: $isAdmin, address1: $address1,
      address2: $address2, zipCode: $zipCode, city: $city, country: $country,
      phoneNumber: $phoneNumber, birthDate: $birthDate, isEnable: $isEnable,
      imageName: $imageName, isFirstConnexion: $isFirstConnexion
    }
  ) {
    user {
      id
      firstname
      lastname
    }
  }
}
```
```json
{
  "id": "/api/users/<id>",
  "firstname": "John",
  "lastname": "Doe",
  "email": "johndoe@test.fr",
  "plainPassword": null,
  "isAdmin": false,
  "address1": null,
  "address2": null,
  "zipCode": null,
  "city": null,
  "country": "France",
  "phoneNumber": null,
  "birthDate": null,
  "isEnable": false,
  "imageName": null,
  "isFirstConnexion": true
}
```

### DeleteUser

```
mutation DeleteUser($id: ID!, $clientMutationId: String!) {
  deleteUser(input: {id: $id, clientMutationId: $clientMutationId}) {
    clientMutationId
  }
}
```
```json
{
  "id": "/api/users/<id>",
  "clientMutationId": "<id>"
}
```

### LoginCheckUser

```
mutation LoginCheckUser($email: String!, $plainPassword: String!) {
  loginCheckUser(input: { email: $email, plainPassword: $plainPassword }) {
    user {
      token
    }
  }
}
```
```json
{
  "email": "vincent.dubresson@live.fr",
  "plainPassword": "password"
}
```

## Category - Queries

### GetCategories

```
query GetCategories {
  categories {
    edges {
      node {
        id
        label
        slug
        sort
      }
    }
  }
}
```

### GetCategory

```
query GetCategory($id: ID!) {
  category(id: $id) {
    id
    label
    slug
    sort
  }
}
```
```json
{
  "id": "/api/categories/<id>"
}
```

### SubCategory - Queries

### GetSubCategories

```
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
```

### GetSubCategory

```
query GetSubCategory($id: ID!) {
  subCategory(id: $id) {
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
```
```json
{
  "id": "/api/sub_categories/<id>"
}
```