import gql from 'graphql-tag';

export const DESIRED_INGREDIENTS_QUERY = gql`
    query GetDesiredIngredients {
        desiredIngredients @client {
            ingredientRanges {
                ingredientType {
                    name
                }
                minimumIngredientQuantity {
                    amount
                    units
                }
                maximumIngredientQuantity {
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
        Product(id: "${id}") {
            nutritionFacts {
                ingredients {
                    ingredientQuantity {
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
        allProducts {
            id
            nutritionFacts {
                ingredients {
                    ingredientQuantity {
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
                id
                quantity {
                    number
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