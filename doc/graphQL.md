# Api Platform GraphQL Queries and Mutations

- [User - Queries](#user---queries)
- [User - Mutations](#user---mutations)
- [Category - Queries](#category---queries)
- [SubCategory - Queries](#subcategory---queries)
- [Ingredient - Queries](#ingredients---queries)
- [Unity - Queries](#unities---queries)
- [Cooking Types - Queries](#cooking-type---queries)
- [Difficulty - Queries](#difficulty---queries)
- [Coût - Queries](#cost---queries)
- [Recette - Queries](#recipe---queries)
- [Recette - Mutations](#recipe---mutations)

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
        acceptNewsletter
    	createdAt
        updatedAt
      }
    }
  }
}
```
```json
{
  "authorization": "Bearer <jwt_token>"
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
        acceptNewletter
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
```json
{
  "authorization": "Bearer <jwt_token>"
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
  $imageName: String, $acceptNewsletter: Boolean!
) {
  createUser(
    input: {
      firstname: $firstname, lastname: $lastname, email: $email,
      plainPassword: $plainPassword, isAdmin: $isAdmin, address1: $address1,
      address2: $address2, zipCode: $zipCode, city: $city, country: $country,
      phoneNumber: $phoneNumber, birthDate: $birthDate, isEnable: $isEnable,
      imageName: $imageName, acceptNewsletter: $acceptNewsletter
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
  "acceptNewsletter": true
}
```

### UpdateUser

```
mutation UpdateUser(
  $id: ID!, $firstname: String!, $lastname: String!, $email: String!,
  $plainPassword: String, $isAdmin: Boolean!, $address1: String,
  $address2: String, $zipCode: Int, $city: String, $country: String!,
  $phoneNumber: String, $birthDate: String, $isEnable: Boolean!,
  $imageName: String, $acceptNewsletter: Boolean!
) {
  updateUser(
    input: {
      id: $id, firstname: $firstname, lastname: $lastname, email: $email,
      plainPassword: $plainPassword, isAdmin: $isAdmin, address1: $address1,
      address2: $address2, zipCode: $zipCode, city: $city, country: $country,
      phoneNumber: $phoneNumber, birthDate: $birthDate, isEnable: $isEnable,
      imageName: $imageName, acceptNewsletter: $acceptNewsletter
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
  "acceptNewsletter": true
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

## Ingredient - Queries

### GetIngredients

```
query GetIngredients {
  ingredients {
    edges {
      node {
        id
        label
        slug
      }
    }
  }
}
```

### GetIngredient

```
query GetIngredient($id: ID!) {
  ingredient(id: $id) {
    id
    label
    slug
  }
}
```
```json
{
  "id": "/api/ingredients/<id>"
}
```

## Unity - Queries

### GetUnities

```
query GetUnities {
  unities {
    edges {
      node {
        id
        label
        abreviation
      }
    }
  }
}
```

### GetUnity

```
query GetUnity($id: ID!) {
  unity(id: $id) {
    id
    label
    abreviation
  }
}
```
```json
{
  "id": "/api/unities/<id>"
}
```

## Cooking Type - Queries

### GetCookingTypes

```
query GetCookingTypes {
  cookingTypes {
    edges {
      node {
        id
        label
        sort
      }
    }
  }
}
```

### GetCookingType

```
query GetCookingType($id: ID!) {
  cookingType(id: $id) {
    id
    label
    sort
  }
}
```
```json
{
  "id": "/api/cooking_types/<id>"
}
```

## Difficulty - Queries

### GetDifficulties

```
query GetDifficulties {
  difficulties {
    edges {
      node {
        id
        label
        sort
      }
    }
  }
}
```

### GetDifficulty

```
query GetDifficulty($id: ID!) {
  difficulty(id: $id) {
    id
    label
    sort
  }
}
```
```json
{
  "id": "/api/difficulties/<id>"
}
```

## Cost - Queries

### GetCosts

```
query GetCosts {
  costs {
    edges {
      node {
        id
        label
        sort
      }
    }
  }
}
```

### GetCost

```
query GetCost($id: ID!) {
  cost(id: $id) {
    id
    label
    sort
  }
}
```
```json
{
  "id": "/api/costs/<id>"
}
```

## Recipe - Queries

### GetRecipes

```
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
          edges{
            node {
              id
              pictureName
              sort
            }
          }
        }
      }
    }
  }
}
```

### GetRecipe

```
query GetRecipe($id: ID!) {
  recipe(id: $id) {
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
      edges{
        node {
          id
          pictureName
          sort
        }
      }
    }
  }
}
```

```json
{
  "id": "/api/recipes/<id>"
}
```

## Recipe - Mutations