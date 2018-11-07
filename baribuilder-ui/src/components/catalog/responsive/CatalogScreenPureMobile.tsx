import * as React from 'react';
import {Fragment, SFC} from 'react';
import {ICatalogScreenPureProps} from '../CatalogScreen';
import BuilderFilterPanel from '../children/BuilderFilterPanel';
import BuilderMainPanel from '../children/BuilderMainPanel';
import BuilderMyProducts from '../children/BuilderMyProducts';
import BuilderMyRegimen from '../children/BuilderMyRegimen';
import {CATALOG_TAB} from './CatalogScreenMobile';

interface IProps extends ICatalogScreenPureProps {
  activeTab: CATALOG_TAB;
  setActiveTab: (value: CATALOG_TAB) => CATALOG_TAB;
}

const CatalogScreenPureMobile: SFC<IProps> = props => {
  return (
    <Fragment>
      {/* catalog tab bars here TODO */}
      <BuilderFilterPanel
        selectedCategory={props.selectedCategory}
        activeFilters={props.activeFilters}
        setFilters={props.setFilters}
      />
      <BuilderMainPanel
        selectedCategory={props.selectedCategory}
        key={props.selectedCategory}
        sortingStrategy={props.sortingStrategy}
        filteredClientCatalogProducts={props.filteredClientCatalogProducts}
      />
      <BuilderMyRegimen/>
      <BuilderMyProducts/>
    </Fragment>
  );
};

export default CatalogScreenPureMobile;
