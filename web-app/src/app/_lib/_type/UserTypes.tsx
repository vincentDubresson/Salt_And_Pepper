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
  isFirstConnexion: boolean;
  createdAt: Date;
  updatedAt: Date;
} | null;

export type GET_USER_MUTATION_VARIABLES = {
  email: String;
  plainMessage: String;
};
