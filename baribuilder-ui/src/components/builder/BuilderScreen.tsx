import gql from 'graphql-tag';
import * as React from 'react';
import {Component} from 'react';
import {Query} from 'react-apollo';
import BuilderScreenPure from './BuilderScreenPure';

const GET_PREFETCH_QUERY = gql`
    query GetCatalogProducts {
        allCatalogProducts {
            # Prefetch data that'll be needed for allClientCatalogProducts TODO replace with fragments
            __typename
            id
            
            category
            listings {
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
    }
`;

// TODO rename this so appropriate for re-use
export const GET_PREFETCH_QUERY_CLIENT = gql`
  query GetClientCatalogProducts {
      allClientCatalogProducts @client {
          # Prefetch data that'll be needed for individual ClientCatalogProducts
          __typename
          catalogProductId
          
          cost {
              money
              frequency
          }
          projectedRegimenCost {
              numRemainingProducts
              money
              frequency
          }
          quantity {
              amount
              units
              frequency
          }
          matchScore
      }
  }
`;

interface IState {
  showMyProducts: boolean;
  showMyRegimen: boolean;
}

export const ROOT_CATEGORY = 'ALL_PRODUCTS';

class BuilderScreenContainer extends Component<{}, Readonly<IState>> {
  constructor(props: {}) {
    super(props);
    this.state = {
      showMyProducts: false,
      showMyRegimen: false,
    };
    this.setShowMyProducts = this.setShowMyProducts.bind(this);
    this.setShowMyRegimen = this.setShowMyRegimen.bind(this);
  }

  setShowMyProducts(showMyProducts: boolean) {
    this.setState({showMyProducts});
  }

  setShowMyRegimen(showMyRegimen: boolean) {
    this.setState({showMyRegimen});
  }

  render() {
    // TODO eventually abstract these away into simple wrapper components
    return (
      <Query query={GET_PREFETCH_QUERY}>
        {
          ({loading, error, data}) => {
            if (loading || !data) {
              return null;
            }
            return (
              <Query query={GET_PREFETCH_QUERY_CLIENT}>
                {
                  (props) => {
                    if (props.loading || !props.data) {
                      return null;
                    }
                    return (
                      <BuilderScreenPure
                        showMyProducts={this.state.showMyProducts}
                        setShowMyProducts={this.setShowMyProducts}
                        showMyRegimen={this.state.showMyRegimen}
                        setShowMyRegimen={this.setShowMyRegimen}
                      />
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

export default BuilderScreenContainer;
