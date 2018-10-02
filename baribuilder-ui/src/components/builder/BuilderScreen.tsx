import {Grid} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import gql from 'graphql-tag';
import * as React from 'react';
import {Component, SFC} from 'react';
import {Query} from 'react-apollo';
import styled from 'styled-components';
import {navbarHeight} from '../Navbar';
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
            defaultQuantity {
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
  sortingStrategy: SORTING_STRATEGY;
}

export const ROOT_CATEGORY = 'ALL_PRODUCTS';

const LargePaddedSpinner = styled(CircularProgress)`
  padding: 16px;
`;

const CenteredSpinner: SFC = () => (
  <Grid container justify='center'>
    <Grid item>
      <LargePaddedSpinner size={`calc(100vh - ${navbarHeight} - 32px)`}/>
    </Grid>
  </Grid>
);

export enum SORTING_STRATEGY {
  COST_ASC = "COST_ASC",
}

class BuilderScreenContainer extends Component<{}, Readonly<IState>> {
  constructor(props: {}) {
    super(props);
    this.state = {
      showMyProducts: false,
      showMyRegimen: true,
      sortingStrategy: SORTING_STRATEGY.COST_ASC,
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
              return loading ? <CenteredSpinner /> : null;
            }
            return (
              <Query query={GET_PREFETCH_QUERY_CLIENT}>
                {
                  (props) => {
                    if (props.loading || !props.data) {
                      return props.loading ? <CenteredSpinner /> : null;
                    }
                    return (
                      <BuilderScreenPure
                        showMyProducts={this.state.showMyProducts}
                        setShowMyProducts={this.setShowMyProducts}
                        showMyRegimen={this.state.showMyRegimen}
                        setShowMyRegimen={this.setShowMyRegimen}
                        sortingStrategy={this.state.sortingStrategy}
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
