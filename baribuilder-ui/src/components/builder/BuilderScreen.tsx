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

const GET_PREFETCH_QUERY_CLIENT = gql`
  query GetClientCatalogProducts {
      allClientCatalogProducts @client {
          # Prefetch data that'll be needed for individual ClientCatalogProducts TODO replace with fragments
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
  disableHeader: boolean;
  showMyProducts: boolean;
}

class BuilderScreenContainer extends Component<{}, Readonly<IState>> {
  constructor(props: {}) {
    super(props);
    this.state = {
      disableHeader: false,
      showMyProducts: true,
    };
    this.setDisableHeader = this.setDisableHeader.bind(this);
    this.setShowMyProducts = this.setShowMyProducts.bind(this);
  }

  setDisableHeader(disableHeader: boolean) {
    this.setState({disableHeader});
  }

  setShowMyProducts(showMyProducts: boolean) {
    this.setState({showMyProducts});
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
                        disableHeader={this.state.disableHeader}
                        setDisableHeader={this.setDisableHeader}
                        showMyProducts={this.state.showMyProducts}
                        setShowMyProducts={this.setShowMyProducts}
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
