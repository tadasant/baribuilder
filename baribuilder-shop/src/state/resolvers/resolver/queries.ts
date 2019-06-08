import gql from 'graphql-tag';

// TODO in most cases, probably shouldn't be sharing queries. One component - one query. Do research.

// Should contain entire aggregate
export const GOAL_INGREDIENTS_QUERY = gql`
    query GetGoalIngredients {
        goalIngredients @client {
            ingredientRanges {
                ingredientTypeName
                minimumAmount
                maximumAmount
                units
                frequency
            }
        }
    }
`;

export const PRODUCT_INGREDIENTS_QUERY = (id: string) => gql`
    query GetProductIngredients {
        CatalogProduct(id: "${id}") {
            id

            serving {
                ingredients {
                    quantity {
                        amount
                        units
                    }
                    ingredientType {
                        name
                    }
                }
            }
        }
    }
`;

export const ALL_PRODUCTS_INGREDIENTS_QUERY = gql`
    query GetAllProductsIngredients {
        allCatalogProducts {
            __typename
            id

            serving {
                ingredients {
                    quantity {
                        amount
                        units
                    }
                    ingredientType {
                        name
                    }
                }
            }
        }
    }
`;

export const CURRENT_REGIMEN_PRODUCTS_QUERY = gql`
    query GetCurrentRegimenProducts {
        currentRegimen @client {
            products {
                catalogProductId
                quantity {
                    amount
                    frequency
                    units
                }
                cost {
                    money
                    frequency
                }
            }
        }
    }
`;

// Should contain entire aggregate TODO probably dedupe w/ above
export const CURRENT_REGIMEN_QUERY = gql`
    query GetCurrentRegimen {
        currentRegimen @client {
            products {
                catalogProductId
                quantity {
                    amount
                    units
                    frequency
                }
                cost {
                    money
                    frequency
                }
            }
        }
    }
`;