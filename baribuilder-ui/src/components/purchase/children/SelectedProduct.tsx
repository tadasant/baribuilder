import {Grid} from '@material-ui/core';
import gql from 'graphql-tag';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import styled from 'styled-components';
import {GetSelectedProduct} from '../../../typings/gql/GetSelectedProduct';
import {prettifyEnumString} from '../../builder/building/BuilderFilterPanel';
import MainProductImage from '../../builder/building/productSelection/children/MainProductImage';
import {Body, Subcaption} from '../../style/Typography';

interface IProps {
  catalogProductId: string;
}

const GET_SELECTED_PRODUCT_LISTING = gql`
    query GetSelectedProduct($catalogProductId: ID) {
        CatalogProduct(id: $catalogProductId) {
            __typename
            id

            name
            brand
            listings {
                url
            }
        }
        currentRegimen @client {
            products {
                catalogProductId
                quantity {
                    amount
                    frequency
                    units
                }
            }
        }
    }
`;

type QueryOutputProps = ChildDataProps<IProps, GetSelectedProduct>;

const CenteredTextGrid = styled(Grid)`
  text-align: center;
`;

const MainImage = styled(MainProductImage)`
  height: 200px;
`;

const SelectedProduct: SFC<QueryOutputProps & IProps> = ({data: {CatalogProduct, currentRegimen, loading}, catalogProductId}) => {
  if (CatalogProduct && CatalogProduct.listings && currentRegimen && !loading) {
    const regimenProduct = currentRegimen.products.find(product => product.catalogProductId === catalogProductId);
    const quantityCaption = regimenProduct
      ? `${regimenProduct.quantity.amount} ${regimenProduct.quantity.units.toLowerCase()} ${regimenProduct.quantity.frequency.toLowerCase()}`
      : null;
    return (
      <Fragment>
        <CenteredTextGrid item lg={3}>
          <MainImage productId={catalogProductId}/>
          <Subcaption dark>{quantityCaption}</Subcaption>
        </CenteredTextGrid>
        <Grid item container direction='column' lg={9} justify='center'>
          <Grid item>
            <Body dark>{CatalogProduct.name} ({prettifyEnumString(CatalogProduct.brand)})</Body>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
  return null;
};

const withData = graphql<IProps, GetSelectedProduct>(GET_SELECTED_PRODUCT_LISTING, {
  options: ({catalogProductId}) => ({
    variables: {catalogProductId},
  }),
});

export default withData(SelectedProduct);
