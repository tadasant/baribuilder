import gql from 'graphql-tag';
import * as React from 'react';
import {Component} from 'react';
import {Query} from 'react-apollo';
import {CenteredSpinner} from '../components/catalog/CatalogScreen';
import BuilderAppPure from './BuilderAppPure';

export const PREFETCH_CATALOG_PRODUCTS_QUERY = gql`
    query PrefetchCatalogProducts {
        allCatalogProducts {
            # Prefetch data that'll be needed for allClientCatalogProducts
            __typename
            id

            name
            brand
            category
            listings {
                url
                price {
                    amount
                }
                numServings
            }
            images {
                url
            }
            serving {
                size
                units
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
        allIngredientTypes {
            name
            defaultUnits
            synonyms
        }
    }
`;

export const PREFETCH_CLIENT_CATALOG_PRODUCTS_QUERY = gql`
    query PrefetchClientCatalogProducts {
        allClientCatalogProducts @client {
            # Prefetch data that'll be needed for individual ClientCatalogProducts
            __typename
            catalogProductId

            cost {
                money
                frequency
            }
            projectedRegimenCost {
                money
                frequency
            }
            defaultQuantity {
                amount
                units
                frequency
                remainingUnfilledIngredientCount
            }
            matchScore
        }
        searchQuery @client {
            value
        }
        goalIngredients @client {
            unfilledIngredientCount
        }
    }
`;

class BuilderApp extends Component {
  render() {
    return (
      <Query query={PREFETCH_CATALOG_PRODUCTS_QUERY}>
        {
          ({loading, error, data}) => {
            if (loading || !data || !data.allCatalogProducts) {
              return loading ? <CenteredSpinner/> : null;
            }
            return (
              <Query query={PREFETCH_CLIENT_CATALOG_PRODUCTS_QUERY}>
                {
                  (props) => {
                    if (props.loading || !props.data || !props.data.searchQuery || !props.data.allClientCatalogProducts) {
                      return props.loading ? <CenteredSpinner/> : null;
                    }
                    return (
                      <BuilderAppPure/>
                    )
                  }
                }
              </Query>
            )
          }
        }
      </Query>
    );
  }
}

export default BuilderApp;
