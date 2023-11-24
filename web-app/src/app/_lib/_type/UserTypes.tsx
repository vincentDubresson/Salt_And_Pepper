export type GET_USER_TYPE = {
  __typename?: 'User' | undefined;
  id: string;
  firstname: string;
  lastname: string;
  slug: string;
  email: string;
  roles: [string];
  address1?: string | undefined;
  address2?: string | undefined;
  zipCode?: string | undefined;
  city?: string | undefined;
  country: string;
  phoneNumber?: string | undefined;
  birthDate: Date;
  pictureName: string;
  isEnable: boolean;
  acceptNewsletter: boolean;
  createdAt: Date;
  updatedAt: Date;
} | null;

export type GET_USER_MUTATION_VARIABLES = {
  email: String;
  plainMessage: String;
};

export type CREATE_USER_MUTATION_VARIABLES = {
  firstname: string;
  lastname: string;
  email: string;
  plainPassword: string;
  isAdmin: boolean;
  country: string;
  isEnable: boolean;
  acceptNewsletter: boolean;
};
