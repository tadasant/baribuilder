import {Grid} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import gql from 'graphql-tag';
import * as React from 'react';
import {Component, SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {RouteComponentProps, withRouter} from 'react-router';
import {compose, lifecycle, withProps} from 'recompose';
import styled from 'styled-components';
import {GetCatalogProductVariables} from '../../typings/gql/GetCatalogProduct';
import {GetCatalogProducts} from '../../typings/gql/GetCatalogProducts';
import {CATEGORY} from '../../typings/gql/globalTypes';
import {navbarHeight} from '../navbar/Navbar';
import CatalogScreenPure from './CatalogScreenPure';

export const GET_CATALOG_PRODUCTS = gql`
    query GetCatalogProducts {
        allCatalogProducts {
            id

            name
            brand
            category
            form
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
            costEffectivenessRating
            defaultQuantity {
                remainingUnfilledIngredientCount
            }
        }
        goalIngredients @client {
            ingredientRanges {
                ingredientTypeName
            }
        }
    }
`;

type QueryOutputProps = ChildDataProps<{}, GetCatalogProducts, GetCatalogProductVariables>;

export interface IFilters {
  FORM: string[]
  BRAND: string[]
}

interface IState {
  showMyProducts: boolean;
  showMyRegimen: boolean;
  sortingStrategy: SORTING_STRATEGY;
  hasOpenedMyProducts: boolean;
  filters: IFilters;
}

export type TSetFiltersFunc = (variant: keyof IFilters, value: string[] | undefined) => void;

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
  COST_EFFECTIVENESS_DESC = "COST_EFFECTIVENESS_DESC",
  FILL_DESC = "FILL_DESC",
}

export const sortStrategyDisplayByEnum: { [x in SORTING_STRATEGY]: string } = {
  [SORTING_STRATEGY.COST_ASC]: 'Cost (low to high)',
  [SORTING_STRATEGY.COST_EFFECTIVENESS_DESC]: 'Cost effectiveness (high to low)',
  [SORTING_STRATEGY.FILL_DESC]: 'Fill % (high to low)'
};

const getSelectedCategory = (pathname: string) => {
  const pathnameTokens = pathname.split('/');
  const selectedCategory = pathnameTokens[pathnameTokens.length - 1].toUpperCase();
  if (!Object.values(CATEGORY).includes(selectedCategory) && selectedCategory !== ROOT_CATEGORY) {
    return null;
  }
  return selectedCategory;
};

class CatalogScreen extends Component<QueryOutputProps & RouteComponentProps & IDerivedProps, Readonly<IState>> {
  constructor(props: QueryOutputProps & RouteComponentProps & IDerivedProps) {
    super(props);
    this.state = {
      showMyProducts: false,
      showMyRegimen: true,
      sortingStrategy: props.goalsSet ? SORTING_STRATEGY.COST_EFFECTIVENESS_DESC : SORTING_STRATEGY.COST_ASC,
      hasOpenedMyProducts: false,
      filters: {
        FORM: [],
        BRAND: [],
      },
    };
    this.setShowMyProducts = this.setShowMyProducts.bind(this);
    this.setShowMyRegimen = this.setShowMyRegimen.bind(this);
    this.handleAddToRegimen = this.handleAddToRegimen.bind(this);
    this.setSortingStrategy = this.setSortingStrategy.bind(this);
    this.setFilters = this.setFilters.bind(this);
  }

  setShowMyProducts(showMyProducts: boolean) {
    this.setState(prevState => ({
      showMyProducts,
      hasOpenedMyProducts: showMyProducts || prevState.hasOpenedMyProducts,
    }));
  }

  setShowMyRegimen(showMyRegimen: boolean) {
    this.setState({showMyRegimen});
  }

  handleAddToRegimen() {
    this.setState(prevState => ({
      showMyProducts: prevState.hasOpenedMyProducts ? prevState.showMyProducts : true,
      hasOpenedMyProducts: true,
    }));
  }

  setSortingStrategy(sortingStrategy: SORTING_STRATEGY) {
    this.setState({
      sortingStrategy
    })
  }

  setFilters: TSetFiltersFunc = (variant, value) => {
    this.setState((prevState => ({
      filters: {
        ...prevState.filters,
        [variant]: value || []
      }
    })))
  };

  render() {
    const {data: {loading, allCatalogProducts, allClientCatalogProducts, searchQuery}} = this.props;
    if (loading || !allCatalogProducts || !allClientCatalogProducts || !searchQuery) {
      return null;
    }

    const selectedCategory = getSelectedCategory(this.props.location.pathname);
    if (!selectedCategory) {
      this.props.history.push('/not-found');
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
        setSortingStrategy={this.setSortingStrategy}
        onAddToRegimen={this.handleAddToRegimen}
        goalsSet={this.props.goalsSet}
        setFilters={this.setFilters}
        activeFilters={this.state.filters}
      />
    );
  }
}

const withData = graphql<{}, GetCatalogProducts>(GET_CATALOG_PRODUCTS);

const enhance = compose<QueryOutputProps & RouteComponentProps & IDerivedProps, {}>(
  withData,
  withRouter,
  withProps((props: QueryOutputProps & RouteComponentProps) => {
    const goalsSet = !props.data.loading && props.data.goalIngredients ? Boolean(props.data.goalIngredients.ingredientRanges.length) : false;
    // Force re-construct when goals are set
    return {key: goalsSet ? 'goalsSet' : 'goalsNotSet', goalsSet};
  }),
  lifecycle({
    componentDidMount() {
      window.scrollTo(0, 0);
    }
  }),
);

interface IDerivedProps {
  goalsSet: boolean;
}

export default enhance(CatalogScreen);
