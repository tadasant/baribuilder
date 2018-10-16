import {Grid} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import gql from 'graphql-tag';
import * as React from 'react';
import {Component, SFC} from 'react';
import {Query} from 'react-apollo';
import {RouteComponentProps, withRouter} from 'react-router';
import styled from 'styled-components';
import {CATEGORY} from '../../typings/gql/globalTypes';
import {navbarHeight} from '../navbar/Navbar';
import BuilderScreenPure from './BuilderScreenPure';

// TODO I probably need to move this prefetching up to BuilderApp

export const PREFETCH_GET_CATALOG = gql`
    query GetCatalogProducts {
        allCatalogProducts {
            # Prefetch data that'll be needed for allClientCatalogProducts TODO replace with fragments
            __typename
            id

            name
            brand
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

export const PREFETCH_GET_CLIENT_CATALOG = gql`
    query GetClientCatalogProducts($category: CATEGORY!) {
        allClientCatalogProducts(category: $category) @client {
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
        searchQuery @client {
            value
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

export const CenteredSpinner: SFC = () => (
  <Grid container justify='center'>
    <Grid item>
      <LargePaddedSpinner size={`calc(100vh - ${navbarHeight} - 32px)`}/>
    </Grid>
  </Grid>
);

export enum SORTING_STRATEGY {
  COST_ASC = "COST_ASC",
}

const getSelectedCategory = (pathname: string) => {
  const pathnameTokens = pathname.split('/');
  const selectedCategory = pathnameTokens[pathnameTokens.length - 1].toUpperCase();
  if (!Object.values(CATEGORY).includes(selectedCategory) && selectedCategory !== ROOT_CATEGORY) {
    return null;
  }
  return selectedCategory;
};

class BuilderScreenContainer extends Component<RouteComponentProps, Readonly<IState>> {
  constructor(props: RouteComponentProps) {
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
    const selectedCategory = getSelectedCategory(this.props.location.pathname);
    if (!selectedCategory) {
      this.props.history.push('/not-found');
      return null;
    }

    // TODO eventually abstract these away into simple wrapper components
    const categoryVariable = selectedCategory === ROOT_CATEGORY ? undefined : selectedCategory;
    return (
      <Query query={PREFETCH_GET_CATALOG}>
        {
          ({loading, error, data}) => {
            if (loading || !data || !data.allCatalogProducts) {
              return loading ? <CenteredSpinner /> : null;
            }
            return (
              <Query query={PREFETCH_GET_CLIENT_CATALOG} variables={{category: categoryVariable}}>
                {
                  (props) => {
                    if (props.loading || !props.data || !props.data.searchQuery || !props.data.allClientCatalogProducts) {
                      return props.loading ? <CenteredSpinner /> : null;
                    }
                    return (
                      <BuilderScreenPure
                        selectedCategory={selectedCategory}
                        allCatalogProducts={data.allCatalogProducts}
                        clientCatalogProducts={props.data.allClientCatalogProducts}
                        searchQuery={props.data.searchQuery}
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

export default withRouter(BuilderScreenContainer);
