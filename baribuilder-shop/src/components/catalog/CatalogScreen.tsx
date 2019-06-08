import {Grid, Hidden} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import gql from 'graphql-tag';
import {keyBy} from 'lodash';
import * as React from 'react';
import {Component, Fragment, SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {RouteComponentProps, withRouter} from 'react-router';
import {compose, lifecycle, withProps} from 'recompose';
import styled from 'styled-components';
import {GetCatalogProductVariables} from '../../typings/gql/GetCatalogProduct';
import {
  GetCatalogProducts,
  GetCatalogProducts_allCatalogProducts,
  GetCatalogProducts_allClientCatalogProducts,
  GetCatalogProducts_searchQuery
} from '../../typings/gql/GetCatalogProducts';
import {CATEGORY} from '../../typings/gql/globalTypes';
import {navbarHeight} from '../navbar/Navbar';
import {prettifyEnumString} from './children/FilterPanel';
import CatalogScreenDesktop from './responsive/CatalogScreenDesktop';
import CatalogScreenMobile from './responsive/CatalogScreenMobile';

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
  sortingStrategy: SORTING_STRATEGY;
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
      <LargePaddedSpinner size={`calc(100vmin - ${navbarHeight} - 32px)`}/>
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

// search query, filters, and category
const filterClientCatalogProducts = (
  clientCatalogProducts: GetCatalogProducts_allClientCatalogProducts[],
  searchQuery: GetCatalogProducts_searchQuery | undefined,
  allCatalogProducts: GetCatalogProducts_allCatalogProducts[] | undefined,
  selectedCategory: string,
  filters: IFilters,
): GetCatalogProducts_allClientCatalogProducts[] => {
  const catalogProductsById = keyBy(allCatalogProducts, product => product.id);
  const conditionFunctions: Array<(productId: string) => boolean> = [];

  // category
  conditionFunctions.push(
    productId => selectedCategory === ROOT_CATEGORY || catalogProductsById[productId].category === selectedCategory
  );

  // search
  if (searchQuery && searchQuery.value) {
    const lowercaseSearchQuery = searchQuery.value.toLowerCase();
    conditionFunctions.push(
      productId => catalogProductsById[productId].name.toLowerCase().includes(lowercaseSearchQuery) ||
        prettifyEnumString(catalogProductsById[productId].brand).toLowerCase().includes(lowercaseSearchQuery)
    )
  }

  // filters
  if (filters.FORM.length > 0) {
    conditionFunctions.push(
      productId => filters.FORM.includes(catalogProductsById[productId].form)
    )
  }
  if (filters.BRAND.length > 0) {
    conditionFunctions.push(
      productId => filters.BRAND.includes(catalogProductsById[productId].brand)
    )
  }

  return clientCatalogProducts.filter(product =>
    conditionFunctions.every(f => f(product.catalogProductId))
  );
};

class CatalogScreen extends Component<QueryOutputProps & RouteComponentProps & IDerivedProps, Readonly<IState>> {
  constructor(props: QueryOutputProps & RouteComponentProps & IDerivedProps) {
    super(props);
    this.state = {
      sortingStrategy: props.goalsSet ? SORTING_STRATEGY.COST_EFFECTIVENESS_DESC : SORTING_STRATEGY.COST_ASC,
      filters: {
        FORM: [],
        BRAND: [],
      },
    };
    this.setSortingStrategy = this.setSortingStrategy.bind(this);
    this.setFilters = this.setFilters.bind(this);
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

    const filteredClientCatalogProducts = filterClientCatalogProducts(allClientCatalogProducts, searchQuery, allCatalogProducts, selectedCategory, this.state.filters);

    const propsForPure: ICatalogScreenPureProps = {
      selectedCategory,
      allCatalogProducts,
      filteredClientCatalogProducts,
      searchQuery,
      sortingStrategy: this.state.sortingStrategy,
      setSortingStrategy: this.setSortingStrategy,
      goalsSet: this.props.goalsSet,
      setFilters: this.setFilters,
      activeFilters: this.state.filters,
    };

    return (
      <Fragment>
        <Hidden mdDown>
          <CatalogScreenDesktop {...propsForPure} />
        </Hidden>
        <Hidden lgUp>
          <CatalogScreenMobile {...propsForPure} />
        </Hidden>
      </Fragment>
    );
  }
}

export interface ICatalogScreenPureProps {
  sortingStrategy: SORTING_STRATEGY;
  setSortingStrategy: (strategy: SORTING_STRATEGY) => void;
  searchQuery: GetCatalogProducts_searchQuery;
  allCatalogProducts: GetCatalogProducts_allCatalogProducts[];
  filteredClientCatalogProducts: GetCatalogProducts_allClientCatalogProducts[];
  selectedCategory: string;
  goalsSet: boolean;
  activeFilters: IFilters;
  setFilters: TSetFiltersFunc;
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
