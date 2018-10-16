import {Grid} from '@material-ui/core';
import gql from 'graphql-tag';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import styled from 'styled-components';
import {GetSelectedProduct} from '../../../typings/gql/GetSelectedProduct';
import {prettifyEnumString} from '../../catalog/children/BuilderFilterPanel';
import MainProductImageWithPopover from '../../catalog/children/productSelection/children/MainProductImageWithPopover';
import {Body, BoldBody} from '../../style/Typography';

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

const MainImage = styled(MainProductImageWithPopover)`
  height: 200px;
`;

const SelectedProduct: SFC<QueryOutputProps & IProps> = ({data: {CatalogProduct, currentRegimen, loading}, catalogProductId}) => {
  if (CatalogProduct && CatalogProduct.listings && currentRegimen && !loading) {
    const regimenProduct = currentRegimen.products.find(product => product.catalogProductId === catalogProductId);
    const quantityCaption = regimenProduct
      ? `Take ${regimenProduct.quantity.amount} ${regimenProduct.quantity.units.toLowerCase()} ${regimenProduct.quantity.frequency.toLowerCase()}`
      : null;
    return (
      <Fragment>
        <CenteredTextGrid item lg={3}>
          <MainImage catalogProductId={catalogProductId}/>
        </CenteredTextGrid>
        <CenteredTextGrid item container direction='column' lg={9} justify='center'>
          <Grid item>
            <a href={CatalogProduct.listings[0].url} target='__blank' rel='noopener nofollower norefer'>
              <BoldBody dark>{CatalogProduct.name} ({prettifyEnumString(CatalogProduct.brand)})</BoldBody>
            </a>
          </Grid>
          <Grid item>
            <Body dark>{quantityCaption}</Body>
          </Grid>
        </CenteredTextGrid>
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
