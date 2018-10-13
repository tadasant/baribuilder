import {Grid} from '@material-ui/core';
import {keyBy} from 'lodash';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import styled from 'styled-components';
import Sketch from '../../app/style/SketchVariables';
import {GetCatalogProducts_allCatalogProducts} from '../../typings/gql/GetCatalogProducts';
import {
  GetClientCatalogProducts_allClientCatalogProducts,
  GetClientCatalogProducts_searchQuery
} from '../../typings/gql/GetClientCatalogProducts';
import {SORTING_STRATEGY} from './BuilderScreen';
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
  searchQuery: GetClientCatalogProducts_searchQuery;
  allCatalogProducts: GetCatalogProducts_allCatalogProducts[];
  clientCatalogProducts: GetClientCatalogProducts_allClientCatalogProducts[];
  selectedCategory: string;
}

const TabGrid = styled(Grid)`
  background-color: white;
  box-shadow: -2px 0px 4px 0px ${Sketch.color.accent.grey};
  max-height: 100vh;
  position: sticky;
  top: 0;
`;

const filterClientCatalogProducts = (
  clientCatalogProducts: GetClientCatalogProducts_allClientCatalogProducts[],
  searchQuery: GetClientCatalogProducts_searchQuery | undefined,
  allCatalogProducts: GetCatalogProducts_allCatalogProducts[] | undefined
): GetClientCatalogProducts_allClientCatalogProducts[] => {
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

const BuilderScreenPure: SFC<IProps> = props => {
  const {showMyProducts, showMyRegimen} = props;
  const numColumnsForFilter = showMyProducts && showMyRegimen ? null : 2;
  // @ts-ignore can't figure out my math
  const numColumnsForMain: 10 | 7 | 6 | 5 = 10 - (showMyProducts ? 3 : 0) - (showMyRegimen ? 4 : 0) + (showMyProducts && showMyRegimen ? 2 : 0);
  const isMyRegimenOnRight = !showMyProducts && showMyRegimen;

  const filteredClientCatalogProducts = filterClientCatalogProducts(props.clientCatalogProducts, props.searchQuery, props.allCatalogProducts);

  return (
    <Fragment>
      <BuilderHeader
        {...props}
        isMyRegimenOnRight={isMyRegimenOnRight}
        selectedCategory={props.selectedCategory}
        filteredClientCatalogProducts={filteredClientCatalogProducts}
      />
      <Grid container spacing={0}>
        {
          numColumnsForFilter === null ? null : (
            <Grid item lg={numColumnsForFilter}>
              <BuilderFilterPanel selectedCategory={props.selectedCategory}/>
            </Grid>
          )
        }
        {/* @ts-ignore Can't figure out my math*/}
        <Grid item lg={numColumnsForMain}>
          <BuilderMainPanel
            selectedCategory={props.selectedCategory}
            key={props.selectedCategory}
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

export default BuilderScreenPure;
