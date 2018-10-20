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
import {Caption} from '../../../style/Typography';
import {prettifyEnumString} from '../BuilderFilterPanel';
import CatalogContextPanel from './children/CatalogContextPanel';
import CatalogProductAddPanel from './children/CatalogProductAddPanel';
import MainProductImageWithPopover from './children/MainProductImageWithPopover';

interface IProps {
  id: string
}

const GET_CATALOG_PRODUCT = gql`
    query GetCatalogProduct($id: ID) {
        CatalogProduct(id: $id) {
            id # ensure cache hit

            name
            brand
            packages {
                listings {
                    affiliateLink {
                        url
                    }
                }
            }
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
  padding-left: 16px;
  padding-right: 16px;
`;

// Pure
const ClientCatalogProduct: SFC<IProps & QueryOutputProps> = ({id, data: {CatalogProduct}}) => {
  // TODO work correctly with multiple packages (but actually replace w/ my own detail page)
  if (CatalogProduct && CatalogProduct.packages && CatalogProduct.packages.length === 1 && CatalogProduct.packages[0].listings) {
    const {listings} = CatalogProduct.packages[0];
    if (!listings) {
      // TypeScript doesn't handle this correctly otherwise
      return null;
    }
    const {affiliateLink} = listings[0];
    if (!affiliateLink) {
      // TypeScript doesn't handle this correctly otherwise
      return null;
    }

    return (
      <Grid container direction='row'>
        <EmptyRow mobile='-20px'/>
        <Grid container direction='row'>
          <Grid item lg={12}>
            {/* TODO remove url bit when local detail page complete */}
            <a href={affiliateLink.url} target='__blank' rel='noopener nofollower norefer'>
              <Caption dark>{CatalogProduct.name} ({prettifyEnumString(CatalogProduct.brand)})</Caption>
            </a>
          </Grid>
          <Grid item lg={7} container alignItems='center'>
            <Grid item lg={4}>
              <MainProductImageWithPopover catalogProductId={id}/>
            </Grid>
            <Grid item lg={8} container justify='center'>
              <CatalogProductAddPanel catalogProductId={id}/>
            </Grid>
          </Grid>
          <LeftBorderGrid item lg={5}>
            <CatalogContextPanel catalogProductId={id}/>
          </LeftBorderGrid>
        </Grid>
        <EmptyRow mobile='-20px'/>
      </Grid>
    )
  }
  return null;
};

export default enhance(ClientCatalogProduct);
