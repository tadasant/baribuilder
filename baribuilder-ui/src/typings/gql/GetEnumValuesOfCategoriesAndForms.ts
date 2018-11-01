/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEnumValuesOfCategoriesAndForms
// ====================================================

export interface GetEnumValuesOfCategoriesAndForms_CATEGORIES_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface GetEnumValuesOfCategoriesAndForms_CATEGORIES {
  __typename: "__Type";
  enumValues: GetEnumValuesOfCategoriesAndForms_CATEGORIES_enumValues[] | null;
}

export interface GetEnumValuesOfCategoriesAndForms_FORMS_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface GetEnumValuesOfCategoriesAndForms_FORMS {
  __typename: "__Type";
  enumValues: GetEnumValuesOfCategoriesAndForms_FORMS_enumValues[] | null;
}

export interface GetEnumValuesOfCategoriesAndForms_BRANDS_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface GetEnumValuesOfCategoriesAndForms_BRANDS {
  __typename: "__Type";
  enumValues: GetEnumValuesOfCategoriesAndForms_BRANDS_enumValues[] | null;
}

export interface GetEnumValuesOfCategoriesAndForms {
  CATEGORIES: GetEnumValuesOfCategoriesAndForms_CATEGORIES | null;
  FORMS: GetEnumValuesOfCategoriesAndForms_FORMS | null;
  BRANDS: GetEnumValuesOfCategoriesAndForms_BRANDS | null;
}
