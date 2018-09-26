import {Grid} from '@material-ui/core';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import styled from 'styled-components';
import Sketch from '../../app/style/SketchVariables';
import BuilderHeader from './building/BuilderHeader';
import BuilderLeftPanel from './building/BuilderLeftPanel';
import BuilderMainPanel from './building/BuilderMainPanel';
import BuilderMyProducts from './building/BuilderMyProducts';

export type SetBuilderStateFunction = (value: boolean) => void;

interface IProps {
  showMyProducts: boolean;
  setShowMyProducts: SetBuilderStateFunction;
}

const TabGrid = styled(Grid)`
  background-color: white;
  box-shadow: -1px 0px 4px 0px ${Sketch.color.accent.grey};
  height: 100vh;
  overflow-y: scroll;
  position: sticky;
  top: 0;
`;

const BuilderScreenPure: SFC<IProps> = ({showMyProducts, setShowMyProducts}) => {
  return (
    <Fragment>
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
            <TabGrid item lg={3}>
              <BuilderMyProducts/>
            </TabGrid>
        }
      </Grid>
    </Fragment>
  );
};

export default BuilderScreenPure;
