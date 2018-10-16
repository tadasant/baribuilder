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
import CatalogScreenPure from './CatalogScreenPure';

export const CATALOG_PRODUCTS_QUERY = gql`
    query GetCatalogProducts {
        allCatalogProducts {
            id

            name
            brand
            category
        }
        searchQuery @client {
            value
        }
        allClientCatalogProducts @client {
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

class CatalogScreen extends Component<RouteComponentProps, Readonly<IState>> {
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

    return (
      <Query query={CATALOG_PRODUCTS_QUERY}>
        {({data: {allCatalogProducts, allClientCatalogProducts, searchQuery}, loading}) => {
          if (loading || !allCatalogProducts || !allClientCatalogProducts) {
            return null;
          }
          return (
            <CatalogScreenPure
              selectedCategory={selectedCategory}
              allCatalogProducts={allCatalogProducts}
              clientCatalogProducts={allClientCatalogProducts}
              searchQuery={searchQuery}
              showMyProducts={this.state.showMyProducts}
              setShowMyProducts={this.setShowMyProducts}
              showMyRegimen={this.state.showMyRegimen}
              setShowMyRegimen={this.setShowMyRegimen}
              sortingStrategy={this.state.sortingStrategy}
            />
          );
        }}
      </Query>

    )
  }
}

export default withRouter(CatalogScreen);
