import {Grid} from '@material-ui/core';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import Header from '../Header';
import BuilderHeader from './building/BuilderHeader';
import BuilderLeftPanel from './building/BuilderLeftPanel';

interface IProps {
  disableHeader: boolean;
  setDisableHeader: (value: boolean) => void;
}

const BuilderPure: SFC<IProps> = ({disableHeader}) => {
  return (
    <Fragment>
      <Header disableButtons={disableHeader} hideNavigation />
      {/*<DesiredIngredientsModal />*/}
      <BuilderHeader />
      <Grid container>
        <Grid item lg={4}>
          <BuilderLeftPanel />
        </Grid>
        <Grid item lg={8}>
          {/*<ProductSelection/>*/}
          Product Selection
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default BuilderPure;
