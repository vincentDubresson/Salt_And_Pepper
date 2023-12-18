export type LIGHT_SUB_CATEGORY_TYPES = Array<{
  node: {
    __typename?: 'SubCategory' | undefined;
    id: string;
    label: string;
    slug: string;
  }
}>;

export type FULL_SUB_CATEGORY_TYPES = Array<{
  node: {
    __typename?: 'SubCategory' | undefined;
    id: string;
    label: string;
    slug: string;
    sort: number;
    category: {
      __typename?: 'Category' | undefined;
      id: string;
      label: string;
      slug: string;
      sort: number;
    };
  }
}>;

