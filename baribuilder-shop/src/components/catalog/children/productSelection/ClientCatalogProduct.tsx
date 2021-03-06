import {Grid, Hidden} from '@material-ui/core';
import gql from 'graphql-tag';
import * as React from 'react';
import {SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {compose, pure} from "recompose";
import styled from 'styled-components';
import Sketch from '../../../../app/style/SketchVariables';
import {GetCatalogProduct, GetCatalogProductVariables} from '../../../../typings/gql/GetCatalogProduct';
import {media} from '../../../style/Core';
import {EmptyRow} from '../../../style/Layout';
import {Caption} from '../../../style/Typography';
import {prettifyEnumString} from '../FilterPanel';
import CatalogContextPanel from './children/CatalogContextPanel';
import CatalogProductAddPanel from './children/CatalogProductAddPanel';
import MainProductImageWithPopover from './children/MainProductImageWithPopover';

interface IProps {
  id: string
  onAddToRegimen?: () => void
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
  ${media.tablet`
      border-left: 1px solid ${Sketch.color.accent.grey};
      padding-left: 16px;
      padding-right: 16px;
  `}
`;

const LeftAlignTextGrid = styled(Grid)`
  text-align: left;
`;

const ClientCatalogProduct: SFC<IProps & QueryOutputProps> = ({id, data: {CatalogProduct}, onAddToRegimen}) => {
  if (CatalogProduct) {
    return (
      <Grid container direction='row'>
        <EmptyRow mobile='-20px'/>
        <Grid container direction='row'>
          <LeftAlignTextGrid item xs={12}>
            <Caption dark>{CatalogProduct.name} ({prettifyEnumString(CatalogProduct.brand)})</Caption>
          </LeftAlignTextGrid>
          <Grid item xs={12} md={7} container alignItems='center'>
            <Grid item xs={4}>
              <MainProductImageWithPopover catalogProductId={id}/>
            </Grid>
            <Grid item xs={8} container justify='center'>
              <CatalogProductAddPanel catalogProductId={id} onAddToRegimen={onAddToRegimen}/>
            </Grid>
          </Grid>
          <Hidden mdUp>
            <EmptyRow/>
          </Hidden>
          <LeftBorderGrid item xs={12} md={5}>
            <CatalogContextPanel catalogProductId={id}/>
          </LeftBorderGrid>
        </Grid>
        <EmptyRow tablet='-20px'/>
      </Grid>
    )
  }
  return null;
};

export default enhance(ClientCatalogProduct);
