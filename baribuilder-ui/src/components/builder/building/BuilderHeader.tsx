import {Button, Grid, Typography} from '@material-ui/core';
import {fade} from '@material-ui/core/styles/colorManipulator';
import gql from "graphql-tag";
import * as React from 'react';
import {Fragment, SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {compose, pure} from 'recompose';
import styled from 'styled-components';
import Sketch from '../../../app/style/SketchVariables';
import {GetProductsForBuilderHeader} from '../../../typings/gql/GetProductsForBuilderHeader';
import {SetBuilderStateFunction} from '../BuilderPure';

export const builderHeaderHeight = '48px';

interface IProps {
  setShowMyProducts: SetBuilderStateFunction;
  showMyProducts: boolean;
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

const LeftMostNavTabGrid = styled(Grid)`
  && {
    height: 100%;
    box-shadow: -2px 0px 1px 0px ${Sketch.color.accent.grey};
  }
`;

const LeftMostNavTabButton = styled(Button)`
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

// Pure
const BuilderHeaderPure: SFC<DataOutputProps & IProps> = ({data: {allCatalogProducts, loading}, setShowMyProducts, showMyProducts}) => {
  const handleMyProductsClick = () => setShowMyProducts(!showMyProducts);
  const productCount = allCatalogProducts && !loading ? allCatalogProducts.length : undefined;
  return (
    <FixedGrid container direction='row'>
      <Grid item lg={4} container alignItems='center'>
        <Grid item>
          <PaddedTypography variant='body1'>
            Showing{productCount ? ` ${productCount} ` : ' '}results
          </PaddedTypography>
        </Grid>
      </Grid>
      {showMyProducts ?
        <Fragment>
          <Grid item lg={5}/>
          <LeftMostNavTabGrid item lg={3}>
            <LeftMostNavTabButton fullWidth onClick={handleMyProductsClick}>My Products</LeftMostNavTabButton>
          </LeftMostNavTabGrid>
        </Fragment>
        :
        <Grid item lg={8} container alignItems='flex-end' direction='column'>
          <LeftMostNavTabGrid item xs={12}>
            <LeftMostNavTabButton fullWidth onClick={handleMyProductsClick}>My Products</LeftMostNavTabButton>
          </LeftMostNavTabGrid>
        </Grid>
      }

    </FixedGrid>
  )
};

export default enhance(BuilderHeaderPure);
