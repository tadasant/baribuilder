import {Button, Grid, Typography} from '@material-ui/core';
import {fade} from '@material-ui/core/styles/colorManipulator';
import gql from "graphql-tag";
import * as React from 'react';
import {SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {compose, pure} from 'recompose';
import styled from 'styled-components';
import Sketch from '../../../app/style/SketchVariables';
import {GetProductsForBuilderHeader} from '../../../typings/gql/GetProductsForBuilderHeader';
import {SetBuilderStateFunction} from '../BuilderScreenPure';

export const builderHeaderHeight = '48px';

interface IProps {
  setShowMyProducts: SetBuilderStateFunction;
  showMyProducts: boolean;
  setShowMyRegimen: SetBuilderStateFunction;
  showMyRegimen: boolean;
}

// GraphQL HOC props (output)
type DataOutputProps = ChildDataProps<IProps, GetProductsForBuilderHeader>;

// TODO eventually pass filters & selected category into this query
const data = graphql<{}, GetProductsForBuilderHeader>(gql`
    query GetProductsForBuilderHeader {
        allCatalogProducts {
            id
        }
    }
`);

const enhance = compose<DataOutputProps, IProps>(
  data,
  pure,
);

const FixedGrid = styled(Grid)`
  && {
    height: ${builderHeaderHeight};
    border-bottom: 1px solid ${Sketch.color.accent.grey};
  }
`;

const PaddedTypography = styled(Typography)`
  && {
    margin-left: 10px;
  }
`;

const NavTabGrid = styled(Grid)`
  && {
    height: 100%;
    box-shadow: -2px 0px 4px 0px ${Sketch.color.accent.grey};
  }
`;

const NavTabButton = styled(Button)`
  && {
    height: 100%;
    background-color: ${Sketch.color.secondary.blue};
    color: ${Sketch.color.accent.white};
    border-radius: 0px;
    text-transform: unset;
    
    :hover {
      background-color: ${fade(Sketch.color.secondary.blue, .8)};
    }
  }
`;

const NavTabButtonActive = styled(NavTabButton)`
  && {
    background-color: white;
    color: ${Sketch.color.accent.black};
    
    :hover {
      background-color: ${fade(Sketch.color.accent.grey, .8)};
    }
  }
`;

// Pure
const BuilderHeaderPure: SFC<DataOutputProps & IProps> = props => {
  const {data: {allCatalogProducts, loading}, showMyProducts, showMyRegimen} = props;

  const productCount = allCatalogProducts && !loading ? allCatalogProducts.length : undefined;

  let spacingColumnCount: 1 | 2 | 3 | 4 = 4; // !showMyProducts && !showMyRegimen
  if (showMyProducts && !showMyRegimen) {
    spacingColumnCount = 3;
  } else if (showMyProducts && showMyRegimen) {
    spacingColumnCount = 1;
  } else if (!showMyProducts && showMyRegimen) {
    spacingColumnCount = 2;
  }
  const isMyRegimenOnRight = !showMyProducts && showMyRegimen;

  return (
    <FixedGrid container direction='row'>
      <Grid item lg={4} container alignItems='center'>
        <Grid item>
          <PaddedTypography variant='body1'>
            Showing{productCount ? ` ${productCount} ` : ' '}results
          </PaddedTypography>
        </Grid>
      </Grid>
      <Grid item lg={spacingColumnCount}/>
      {isMyRegimenOnRight ? null : <MyRegimenTabHeader {...props}/>}
      <MyProductsTabHeader {...props}/>
      {isMyRegimenOnRight ? <MyRegimenTabHeader {...props}/> : null}
    </FixedGrid>
  )
};

const MyProductsTabHeader: SFC<IProps> = ({setShowMyProducts, showMyProducts}) => {
  const handleMyProductsClick = () => setShowMyProducts(!showMyProducts);
  if (showMyProducts) {
    return (
      <NavTabGrid item lg={3}>
        <NavTabButtonActive fullWidth onClick={handleMyProductsClick}>My Products</NavTabButtonActive>
      </NavTabGrid>
    );
  }
  return (
    <NavTabGrid item lg={2}>
      <NavTabButton fullWidth onClick={handleMyProductsClick}>My Products</NavTabButton>
    </NavTabGrid>
  );
};

const MyRegimenTabHeader: SFC<IProps> = ({setShowMyRegimen, showMyRegimen}) => {
  const handleMyRegimenClick = () => setShowMyRegimen(!showMyRegimen);
  if (showMyRegimen) {
    return (
      <NavTabGrid item lg={4}>
        <NavTabButtonActive fullWidth onClick={handleMyRegimenClick}>My Regimen</NavTabButtonActive>
      </NavTabGrid>
    );
  }
  return (
    <NavTabGrid item lg={2}>
      <NavTabButton fullWidth onClick={handleMyRegimenClick}>My Regimen</NavTabButton>
    </NavTabGrid>
  );
};

export default enhance(BuilderHeaderPure);
