import {AppBar, Grid, Tab, Tabs} from '@material-ui/core';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import styled from 'styled-components';
import SearchBox from '../../navbar/SearchBox';
import {media} from '../../style/Core';
import {EmptyRow} from '../../style/Layout';
import {ICatalogScreenPureProps} from '../CatalogScreen';
import FilterPanel, {prettifyEnumString} from '../children/FilterPanel';
import MyProductPanel from '../children/MyProductPanel';
import MyRegimenPanel from '../children/MyRegimenPanel';
import ProductPanel from '../children/ProductPanel';
import {CATALOG_TAB} from './CatalogScreenMobile';

interface IProps extends ICatalogScreenPureProps {
  activeTab: CATALOG_TAB;
  setActiveTab: (value: CATALOG_TAB) => CATALOG_TAB;
}

const HeaderTab = styled(Tab)`
  && {
    font-size: 0.5rem;
  
    ${media.tablet`
        font-size: inherit;
    `}
  }
`;

const CatalogScreenPureMobile: SFC<IProps> = props => {
  return (
    <Fragment>
      <AppBar position='static' color='default'>
        <Tabs
          value={props.activeTab}
          indicatorColor='primary'
          onChange={(event, value) => props.setActiveTab(value)}
          fullWidth>
          {Object.keys(CATALOG_TAB).map(tabName => (
            <HeaderTab
              label={prettifyEnumString(tabName)}
              value={tabName}
            />
          ))}
        </Tabs>
      </AppBar>
      {
        props.activeTab === CATALOG_TAB.CATALOG
          ? (
            <>
              <Grid container>
                <EmptyRow/>
                <Grid item xs={1}/>
                <Grid item xs={10}>
                  <SearchBox key={props.searchQuery ? props.searchQuery.value : ''} dark/>
                </Grid>
                <Grid item xs={1}/>
              </Grid>
              <ProductPanel
                selectedCategory={props.selectedCategory}
                key={props.selectedCategory}
                sortingStrategy={props.sortingStrategy}
                filteredClientCatalogProducts={props.filteredClientCatalogProducts}
              />
            </>
          )
          : null
      }
      {
        props.activeTab === CATALOG_TAB.MY_PRODUCTS
          ? (
            <MyProductPanel/>
          )
          : null
      }
      {
        props.activeTab === CATALOG_TAB.FILTERS
          ? (
            <FilterPanel
              selectedCategory={props.selectedCategory}
              activeFilters={props.activeFilters}
              setFilters={props.setFilters}
            />
          )
          : null
      }
      {
        props.activeTab === CATALOG_TAB.MY_REGIMEN
          ? (
            <MyRegimenPanel/>
          )
          : null
      }
    </Fragment>
  );
};

export default CatalogScreenPureMobile;
