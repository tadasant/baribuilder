import {Grid} from '@material-ui/core';
import gql from 'graphql-tag';
import {upperFirst} from 'lodash';
import * as React from 'react';
import {SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {compose, pure} from 'recompose';
import styled from 'styled-components';
import {GetCatalogProductForRegimenProduct} from '../../../../typings/gql/GetCatalogProductForRegimenProduct';
import {
  GetCurrentRegimenProducts_currentRegimen_products_cost,
  GetCurrentRegimenProducts_currentRegimen_products_quantity,
} from '../../../../typings/gql/GetCurrentRegimenProducts';
import {Body, BodyBold, Caption} from '../../../style/Typography';

interface IProps {
  catalogProductId: string;
  quantity: GetCurrentRegimenProducts_currentRegimen_products_quantity;
  cost: GetCurrentRegimenProducts_currentRegimen_products_cost;
}

const GET_CATALOG_PRODUCT_FOR_REGIMEN_PRODUCT = gql`
    query GetCatalogProductForRegimenProduct($id: ID) {
        CatalogProduct(id: $id) {
            __typename
            id
            
            name
            brand
        }
    }
`;

// GraphQL HOC props (output)
type DataOutputProps = ChildDataProps<IProps, GetCatalogProductForRegimenProduct>;

const data = graphql<IProps, GetCatalogProductForRegimenProduct>(GET_CATALOG_PRODUCT_FOR_REGIMEN_PRODUCT, {
  options: ({catalogProductId}) => ({
    variables: {id: catalogProductId},
  }),
});

const enhance = compose<IProps & DataOutputProps, IProps>(
  data,
  pure,
);

const CenteredTextGrid = styled(Grid)`
  text-align: center;
`;

// Pure
const RegimenProductPure: SFC<DataOutputProps> = ({data: {CatalogProduct, loading}, quantity}) => {
  if (CatalogProduct && !loading) {

    return (
      <Grid item container direction='row' alignItems='flex-start'>
        <CenteredTextGrid item lg={12}>
          <BodyBold dark>{CatalogProduct.name}</BodyBold>
        </CenteredTextGrid>
        <CenteredTextGrid item lg={12}>
          <Caption dark>{CatalogProduct.brand.split('_').map(s => upperFirst(s.toLowerCase())).join(' ')}</Caption>
        </CenteredTextGrid>
        <CenteredTextGrid item lg={12}>
          <Body dark>{quantity.amount}</Body>
        </CenteredTextGrid>
        <CenteredTextGrid item lg={12}>
          <Caption dark># daily servings</Caption>
        </CenteredTextGrid>
      </Grid>
    );
  }
  return null;
};

export default enhance(RegimenProductPure);
