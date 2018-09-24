import {Grid} from '@material-ui/core';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import Header from '../Header';
import BuilderHeader from './building/BuilderHeader';
import BuilderLeftPanel from './building/BuilderLeftPanel';
import BuilderMainPanel from './building/BuilderMainPanel';

export type SetBuilderStateFunction = (value: boolean) => void;

interface IProps {
  disableHeader: boolean;
  setDisableHeader: SetBuilderStateFunction;
  showMyProducts: boolean;
  setShowMyProducts: SetBuilderStateFunction;
}

const BuilderPure: SFC<IProps> = ({disableHeader, showMyProducts, setShowMyProducts}) => {
  return (
    <Fragment>
      <Header disableButtons={disableHeader} hideNavigation/>
      {/*<DesiredIngredientsModal />*/}
      <BuilderHeader setShowMyProducts={setShowMyProducts} showMyProducts={showMyProducts}/>
      <Grid container>
        <Grid item lg={4}>
          <BuilderLeftPanel/>
        </Grid>
        <Grid item lg={showMyProducts ? 5 : 8}>
          <BuilderMainPanel/>
        </Grid>
        {
          !showMyProducts ? null :
            <Grid item lg={3}>
              Current Regimen Products
              {/*<CurrentRegimenProducts />*/}
            </Grid>
        }
      </Grid>
    </Fragment>
  );
};

export default BuilderPure;
