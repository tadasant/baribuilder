import {AppBar, Tab, Tabs} from '@material-ui/core';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import styled from 'styled-components';
import {media} from '../../style/Core';
import {ICatalogScreenPureProps} from '../CatalogScreen';
import {prettifyEnumString} from '../children/FilterPanel';
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
      {/*<BuilderFilterPanel*/}
      {/*selectedCategory={props.selectedCategory}*/}
      {/*activeFilters={props.activeFilters}*/}
      {/*setFilters={props.setFilters}*/}
      {/*/>*/}
      {/*<ProductPanel*/}
      {/*selectedCategory={props.selectedCategory}*/}
      {/*key={props.selectedCategory}*/}
      {/*sortingStrategy={props.sortingStrategy}*/}
      {/*filteredClientCatalogProducts={props.filteredClientCatalogProducts}*/}
      {/*/>*/}
      {/*<MyRegimenPanel/>*/}
      {/*<BuilderMyProducts/>*/}
    </Fragment>
  );
};

export default CatalogScreenPureMobile;
