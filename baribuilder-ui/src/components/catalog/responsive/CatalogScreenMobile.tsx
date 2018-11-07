import * as React from 'react';
import {SFC} from 'react';
import {compose, withState} from 'recompose';
import {ICatalogScreenPureProps} from '../CatalogScreen';
import CatalogScreenPureMobile from './CatalogScreenPureMobile';

export enum CATALOG_TAB {
  CATALOG = "CATALOG",
  FILTERS = "FILTERS",
  MY_REGIMEN = "MY_REGIMEN",
  MY_PRODUCTS = "MY_PRODUCTS",
}

interface IPropsState {
  activeTab: CATALOG_TAB,
  setActiveTab: (value: CATALOG_TAB) => CATALOG_TAB,
}

const CatalogScreenMobile: SFC<ICatalogScreenPureProps & IPropsState> = props => {
  return (
    <CatalogScreenPureMobile {...props} />
  );
};

const enhance = compose(
  withState<{}, CATALOG_TAB, 'activeTab', 'setActiveTab'>(
    'activeTab',
    'setActiveTab',
    CATALOG_TAB.CATALOG,
  ),
);

export default enhance(CatalogScreenMobile);
