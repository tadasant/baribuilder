import {Grid} from '@material-ui/core';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import styled from 'styled-components';
import Sketch from '../../../app/style/SketchVariables';
import {ICatalogScreenPureProps} from '../CatalogScreen';
import BuilderFilterPanel from '../children/BuilderFilterPanel';
import BuilderHeader from '../children/BuilderHeader';
import BuilderMainPanel from '../children/BuilderMainPanel';
import BuilderMyProducts from '../children/BuilderMyProducts';
import BuilderMyRegimen from '../children/BuilderMyRegimen';

export type SetBuilderStateFunction = (value: boolean) => void;

interface IProps {
  showMyProducts: boolean;
  setShowMyProducts: SetBuilderStateFunction;
  showMyRegimen: boolean;
  setShowMyRegimen: SetBuilderStateFunction;
  onAddToRegimen: () => void;
}

const TabGrid = styled(Grid)`
  background-color: white;
  box-shadow: -2px 0px 4px 0px ${Sketch.color.accent.grey};
  max-height: 100vh;
  position: sticky;
  top: 0;
`;

const CatalogScreenPureDesktop: SFC<IProps & ICatalogScreenPureProps> = props => {
  const {showMyProducts, showMyRegimen} = props;
  const numColumnsForFilter = 2;
  // @ts-ignore can't figure out my math
  const numColumnsForMain: 10 | 8 | 6 | 4 = 10 - (showMyProducts ? 2 : 0) - (showMyRegimen ? 4 : 0);
  const isMyRegimenOnRight = !showMyProducts && showMyRegimen;

  return (
    <Fragment>
      <BuilderHeader
        {...props}
        isMyRegimenOnRight={isMyRegimenOnRight}
        selectedCategory={props.selectedCategory}
        filteredClientCatalogProducts={props.filteredClientCatalogProducts}
      />
      <Grid container spacing={0}>
        {
          numColumnsForFilter === null ? null : (
            <Grid item lg={numColumnsForFilter}>
              <BuilderFilterPanel
                selectedCategory={props.selectedCategory}
                activeFilters={props.activeFilters}
                setFilters={props.setFilters}
              />
            </Grid>
          )
        }
        {/* @ts-ignore Can't figure out my math*/}
        <Grid item lg={numColumnsForMain}>
          <BuilderMainPanel
            selectedCategory={props.selectedCategory}
            key={props.selectedCategory}
            sortingStrategy={props.sortingStrategy}
            filteredClientCatalogProducts={props.filteredClientCatalogProducts}
            onAddToRegimen={props.onAddToRegimen}
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
            <TabGrid item lg={2}>
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

export default CatalogScreenPureDesktop;
