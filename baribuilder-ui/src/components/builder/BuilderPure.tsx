import * as React from 'react';
import {Fragment, SFC} from 'react';
import Header from '../Header';
import BuilderHeader from './building/BuilderHeader';

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
      {/*<BuilderLeftPanel />*/}
      {/*<ProductSelection/>*/}
    </Fragment>
  );
};

export default BuilderPure;
