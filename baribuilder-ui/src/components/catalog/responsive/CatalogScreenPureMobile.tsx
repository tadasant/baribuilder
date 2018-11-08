import {AppBar, Grid, Tab, Tabs} from '@material-ui/core';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import styled from 'styled-components';
import Sketch from '../../../app/style/SketchVariables';
import {CenteredTextGrid} from '../../goals/GoalsScreenPure';
import SearchBox from '../../navbar/SearchBox';
import {media} from '../../style/Core';
import {EmptyRow} from '../../style/Layout';
import {Body} from '../../style/Typography';
import {ICatalogScreenPureProps} from '../CatalogScreen';
import FilterPanel, {prettifyEnumString} from '../children/FilterPanel';
import FilterDescription from '../children/header/FilterDescription';
import MyProductPanel from '../children/MyProductPanel';
import MyRegimenPanel from '../children/MyRegimenPanel';
import ProductPanel from '../children/ProductPanel';
import {CATALOG_TAB} from './CatalogScreenMobile';

interface IProps extends ICatalogScreenPureProps {
  activeTab: CATALOG_TAB;
  setActiveTab: (value: CATALOG_TAB) => CATALOG_TAB;
}

const StickyAppBar = styled(AppBar)`
  && {
    position: sticky;
    top: 0;
    z-index: 1;
  }
`;

const HeaderTab = styled(Tab)`
  && {
    font-size: 0.5rem;
  
    ${media.tablet`
        font-size: inherit;
    `}
  }
`;

const PaddedCaptionSizedBody = styled(Body)`
  && {
    font-size: ${Sketch.typography.caption.fontSize};
    box-decoration-break: clone;
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const CatalogScreenPureMobile: SFC<IProps> = props => {
  const handleChangeTab = (event: any, value: CATALOG_TAB) => {
    props.setActiveTab(value);
    window.scrollTo(0, 0);
  };
  return (
    <Fragment>
      <StickyAppBar color='default'>
        <Tabs
          value={props.activeTab}
          indicatorColor='primary'
          onChange={handleChangeTab}
          fullWidth>
          {Object.keys(CATALOG_TAB).map(tabName => (
            <HeaderTab
              label={prettifyEnumString(tabName)}
              value={tabName}
            />
          ))}
        </Tabs>
      </StickyAppBar>
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
                <EmptyRow/>
                <Grid item xs={1}/>
                <CenteredTextGrid item xs={10}>
                  <PaddedCaptionSizedBody dark>
                    <FilterDescription
                      filteredClientCatalogProducts={props.filteredClientCatalogProducts}
                    />
                  </PaddedCaptionSizedBody>
                </CenteredTextGrid>
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
            <MyProductPanel showCheckout/>
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
            <MyRegimenPanel />
          )
          : null
      }
    </Fragment>
  );
};

export default CatalogScreenPureMobile;
