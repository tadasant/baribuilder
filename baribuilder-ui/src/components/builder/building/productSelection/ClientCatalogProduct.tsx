import {Grid} from '@material-ui/core';
import gql from 'graphql-tag';
import * as React from 'react';
import {SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {compose, pure} from "recompose";
import styled from 'styled-components';
import Sketch from '../../../../app/style/SketchVariables';
import {GetCatalogProduct, GetCatalogProductVariables} from '../../../../typings/gql/GetCatalogProduct';
import {EmptyRow} from '../../../style/Layout';
import {Caption, Subcaption} from '../../../style/Typography';
import CatalogProductAddPanel from './children/CatalogProductAddPanel';
import CatalogProductPrice from './children/CatalogProductPrice';
import MainProductImage from './children/MainProductImage';

interface IProps {
  id: string
}

const GET_CATALOG_PRODUCT = gql`
    query GetCatalogProduct($id: ID) {
        CatalogProduct(id: $id) {
            id # ensure cache hit

            name
            brand
        }
    }
`;

type QueryOutputProps = ChildDataProps<IProps, GetCatalogProduct, GetCatalogProductVariables>;

const data = graphql<IProps, GetCatalogProduct, GetCatalogProductVariables, QueryOutputProps>(GET_CATALOG_PRODUCT, {
  options: ({id}) => ({
    variables: {id},
  }),
});

const enhance = compose<IProps & QueryOutputProps, IProps>(
  data,
  pure,
);


const LeftBorderGrid = styled(Grid)`
  border-left: 1px solid ${Sketch.color.accent.grey};
`;

const MainImage = styled(MainProductImage)`
  max-height: 100px;
`;

// Pure
const ProductPure: SFC<IProps & QueryOutputProps> = ({id, data: {CatalogProduct}}) => {
  if (CatalogProduct) {
    return (
      <Grid container direction='row'>
        <EmptyRow mobile='-20px'/>
        <Grid container direction='row'>
          <Grid item lg={9} container>
            <Grid item lg={12}>
              <Caption dark>{CatalogProduct.name}</Caption>
              &nbsp;<Subcaption dark>{CatalogProduct.brand}</Subcaption>
            </Grid>
            <EmptyRow/>
            <Grid item lg={4}>
              <MainImage productId={id}/>
            </Grid>
            <Grid item lg={8} container justify='center'>
              <CatalogProductPrice catalogProductId={id}/>
            </Grid>
          </Grid>
          <LeftBorderGrid item lg={3}>
            <CatalogProductAddPanel catalogProductId={id}/>
          </LeftBorderGrid>
        </Grid>
        <EmptyRow mobile='-20px'/>
      </Grid>
    )
  }
  return null;
};

export default enhance(ProductPure);
