import gql from 'graphql-tag';

export const DESIRED_INGREDIENTS_QUERY = gql`
    query GetDesiredIngredients {
        desiredIngredients @client {
            ingredientRanges {
                ingredientTypeName
                minimum {
                    amount
                    units
                }
                maximum {
                    amount
                    units
                }
                frequency
            }
        }
    }
`;

export const PRODUCT_INGREDIENTS_QUERY = (id: string) => gql`
    query GetProductIngredients {
        CatalogProduct(id: "${id}") {
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