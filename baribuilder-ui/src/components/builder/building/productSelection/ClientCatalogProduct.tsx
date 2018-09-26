import {Grid} from '@material-ui/core';
import * as React from 'react';
import {SFC} from 'react';
import styled from 'styled-components';
import Sketch from '../../../../app/style/SketchVariables';
import {EmptyRow} from '../../../style/Layout';
import CatalogProductAddPanel from './children/CatalogProductAddPanel';
import CatalogProductPrice from './children/CatalogProductPrice';
import MainProductImage from './children/MainProductImage';

interface IProps {
  id: string
}

const LeftBorderGrid = styled(Grid)`
  border-left: 1px solid ${Sketch.color.accent.grey};
`;

const MainImage = styled(MainProductImage)`
  max-height: 100px;
`;

// Pure
const ProductPure: SFC<IProps> = ({id}) => {
  return (
    <Grid container direction='row'>
      <EmptyRow mobile='-20px'/>
      <Grid container direction='row'>
        <Grid item lg={3}>
          <MainImage productId={id}/>
        </Grid>
        <Grid item lg={6} container justify='center'>
          <CatalogProductPrice catalogProductId={id}/>
        </Grid>
        <LeftBorderGrid item lg={3}>
          <CatalogProductAddPanel catalogProductId={id}/>
        </LeftBorderGrid>
      </Grid>
      <EmptyRow mobile='-20px'/>
    </Grid>
  )
};

export default ProductPure;
