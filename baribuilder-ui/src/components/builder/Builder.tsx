import gql from 'graphql-tag';
import * as React from 'react';
import {Component} from 'react';
import {Query} from 'react-apollo';
import BuilderPure from './BuilderPure';

const GET_PREFETCH_QUERY = gql`
    query GetCatalogProducts {
        allCatalogProducts {
            # Prefetch data that'll be needed TODO replace with fragments
            # Needed for avoiding cache miss, but seems to fail to optimize?
            id
            listings {
                __typename
                price {
                    __typename
                    amount
                }
                numServings
            }
            images {
                __typename
                url
            }
            serving {
                __typename
                size
                units
                ingredients {
                    __typename
                    quantity {
                        __typename
                        amount
                        units
                    }
                    ingredientType {
                        __typename
                        name
                    }
                }
            }
        }
    }
`;

interface IState {
  disableHeader: boolean;
  showMyProducts: boolean;
}

class BuilderContainer extends Component<{}, Readonly<IState>> {
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
    return (
      <Query query={GET_PREFETCH_QUERY}>
        {
          ({loading, error, data}) => {
            if (loading || !data) {
              return null;
            }
            return (
              <BuilderPure
                disableHeader={this.state.disableHeader}
                setDisableHeader={this.setDisableHeader}
                showMyProducts={this.state.showMyProducts}
                setShowMyProducts={this.setShowMyProducts}
              />
            )
          }
        }
      </Query>
    );
  }
}

export default BuilderContainer;
