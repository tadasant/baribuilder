/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEnumValuesOfCategoriesAndForms
// ====================================================

export interface GetEnumValuesOfCategoriesAndForms_CATEGORY_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface GetEnumValuesOfCategoriesAndForms_CATEGORY {
  __typename: "__Type";
  enumValues: GetEnumValuesOfCategoriesAndForms_CATEGORY_enumValues[] | null;
}

export interface GetEnumValuesOfCategoriesAndForms_FORMS_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface GetEnumValuesOfCategoriesAndForms_FORMS {
  __typename: "__Type";
  enumValues: GetEnumValuesOfCategoriesAndForms_FORMS_enumValues[] | null;
}

export interface GetEnumValuesOfCategoriesAndForms {
  CATEGORY: GetEnumValuesOfCategoriesAndForms_CATEGORY | null;
  FORMS: GetEnumValuesOfCategoriesAndForms_FORMS | null;
}
