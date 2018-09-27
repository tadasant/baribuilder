import {Grid} from '@material-ui/core';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import styled from 'styled-components';
import Sketch from '../../app/style/SketchVariables';
import BuilderFilterPanel from './building/BuilderFilterPanel';
import BuilderHeader from './building/BuilderHeader';
import BuilderMainPanel from './building/BuilderMainPanel';
import BuilderMyProducts from './building/BuilderMyProducts';

export type SetBuilderStateFunction = (value: boolean) => void;

interface IProps {
  showMyProducts: boolean;
  setShowMyProducts: SetBuilderStateFunction;
  showMyRegimen: boolean;
  setShowMyRegimen: SetBuilderStateFunction;
}

const TabGrid = styled(Grid)`
  background-color: white;
  box-shadow: -2px 0px 4px 0px ${Sketch.color.accent.grey};
  height: 100vh;
  overflow-y: scroll;
  position: sticky;
  top: 0;
`;

const BuilderScreenPure: SFC<IProps> = props => {
  const {showMyProducts, showMyRegimen} = props;
  const numColumnsForFilter = showMyProducts && showMyRegimen ? null : 2;
  // @ts-ignore can't figure out my math
  const numColumnsForMain: 10 | 7 | 6 | 5 = 10 - (showMyProducts ? 3 : 0) - (showMyRegimen ? 4 : 0) + (showMyProducts && showMyRegimen ? 2 : 0);
  return (
    <Fragment>
      <BuilderHeader {...props} />
      <Grid container spacing={0}>
        {
          numColumnsForFilter === null ? null : (
            <Grid item lg={numColumnsForFilter}>
              <BuilderFilterPanel/>
            </Grid>
          )
        }
        {/* @ts-ignore Can't figure out my math*/}
        <Grid item lg={numColumnsForMain}>
          <BuilderMainPanel/>
        </Grid>
        {
          !showMyRegimen ? null :
            <TabGrid item lg={4}>
              <BuilderMyProducts/>
            </TabGrid>
        }
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
