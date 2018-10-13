import {Grid} from '@material-ui/core';
import {keyBy} from 'lodash';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import {RouteComponentProps, withRouter} from 'react-router';
import styled from 'styled-components';
import Sketch from '../../app/style/SketchVariables';
import {CatalogProducts_allCatalogProducts} from '../../typings/gql/CatalogProducts';
import {GetCatalogProducts_allCatalogProducts} from '../../typings/gql/GetCatalogProducts';
import {
  GetClientCatalogProductsForProductSelection_allClientCatalogProducts,
  GetClientCatalogProductsForProductSelection_searchQuery
} from '../../typings/gql/GetClientCatalogProductsForProductSelection';
import {CATEGORY} from '../../typings/gql/globalTypes';
import {ROOT_CATEGORY, SORTING_STRATEGY} from './BuilderScreen';
import BuilderFilterPanel from './building/BuilderFilterPanel';
import BuilderHeader from './building/BuilderHeader';
import BuilderMainPanel from './building/BuilderMainPanel';
import BuilderMyProducts from './building/BuilderMyProducts';
import BuilderMyRegimen from './building/BuilderMyRegimen';

export type SetBuilderStateFunction = (value: boolean) => void;

interface IProps {
  showMyProducts: boolean;
  setShowMyProducts: SetBuilderStateFunction;
  showMyRegimen: boolean;
  setShowMyRegimen: SetBuilderStateFunction;
  sortingStrategy: SORTING_STRATEGY;
  searchQuery: GetClientCatalogProductsForProductSelection_searchQuery;
  allCatalogProducts: GetCatalogProducts_allCatalogProducts[];
  clientCatalogProducts: GetClientCatalogProductsForProductSelection_allClientCatalogProducts[];
}

const TabGrid = styled(Grid)`
  background-color: white;
  box-shadow: -2px 0px 4px 0px ${Sketch.color.accent.grey};
  max-height: 100vh;
  position: sticky;
  top: 0;
`;

const getSelectedCategory = (pathname: string) => {
  const pathnameTokens = pathname.split('/');
  const selectedCategory = pathnameTokens[pathnameTokens.length - 1].toUpperCase();
  if (!Object.values(CATEGORY).includes(selectedCategory) && selectedCategory !== ROOT_CATEGORY) {
    return null;
  }
  return selectedCategory;
};

const filterClientCatalogProducts = (
  clientCatalogProducts: GetClientCatalogProductsForProductSelection_allClientCatalogProducts[],
  searchQuery: GetClientCatalogProductsForProductSelection_searchQuery | undefined,
  allCatalogProducts: CatalogProducts_allCatalogProducts[] | undefined
): GetClientCatalogProductsForProductSelection_allClientCatalogProducts[] => {
  if (searchQuery && searchQuery.value) {
    const lowercaseSearchQuery = searchQuery.value.toLowerCase();
    const catalogProductsById = keyBy(allCatalogProducts, product => product.id);
    return clientCatalogProducts.filter(product => (
      catalogProductsById[product.catalogProductId].name.toLowerCase().includes(lowercaseSearchQuery) ||
      catalogProductsById[product.catalogProductId].brand.toLowerCase().includes(lowercaseSearchQuery)
    ));
  }
  return clientCatalogProducts;
};

const BuilderScreenPure: SFC<IProps & RouteComponentProps> = props => {
  const {showMyProducts, showMyRegimen} = props;
  const numColumnsForFilter = showMyProducts && showMyRegimen ? null : 2;
  // @ts-ignore can't figure out my math
  const numColumnsForMain: 10 | 7 | 6 | 5 = 10 - (showMyProducts ? 3 : 0) - (showMyRegimen ? 4 : 0) + (showMyProducts && showMyRegimen ? 2 : 0);
  const isMyRegimenOnRight = !showMyProducts && showMyRegimen;

  const selectedCategory = getSelectedCategory(props.location.pathname);
  if (!selectedCategory) {
    props.history.push('/not-found');
    return null;
  }

  const filteredClientCatalogProducts = filterClientCatalogProducts(props.clientCatalogProducts, props.searchQuery, props.allCatalogProducts);

  return (
    <Fragment>
      <BuilderHeader
        {...props}
        isMyRegimenOnRight={isMyRegimenOnRight}
        selectedCategory={selectedCategory}
        filteredClientCatalogProducts={filteredClientCatalogProducts}
      />
      <Grid container spacing={0}>
        {
          numColumnsForFilter === null ? null : (
            <Grid item lg={numColumnsForFilter}>
              <BuilderFilterPanel selectedCategory={selectedCategory}/>
            </Grid>
          )
        }
        {/* @ts-ignore Can't figure out my math*/}
        <Grid item lg={numColumnsForMain}>
          <BuilderMainPanel
            selectedCategory={selectedCategory}
            key={selectedCategory}
            sortingStrategy={props.sortingStrategy}
            filteredClientCatalogProducts={filteredClientCatalogProducts}
          />
        </Grid>
        {
          showMyRegimen && !isMyRegimenOnRight ? (
            <TabGrid item lg={4}>
              <BuilderMyRegimen/>
            </TabGrid>
          ) : null
        }
        {
          !showMyProducts ? null :
            <TabGrid item lg={3}>
              <BuilderMyProducts/>
            </TabGrid>
        }
        {
          showMyRegimen && isMyRegimenOnRight ? (
            <TabGrid item lg={4}>
              <BuilderMyRegimen/>
            </TabGrid>
          ) : null
        }
      </Grid>
    </Fragment>
  );
};

export default withRouter(BuilderScreenPure);
