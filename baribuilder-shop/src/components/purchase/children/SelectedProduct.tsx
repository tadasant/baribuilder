import {Button, Grid} from '@material-ui/core';
import gql from 'graphql-tag';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import styled from 'styled-components';
import {generateTrackAffiliateLinkClick} from '../../../lib/analytics';
import {GetSelectedProduct} from '../../../typings/gql/GetSelectedProduct';
import {prettifyEnumString} from '../../catalog/children/FilterPanel';
import MainProductImageWithPopover from '../../catalog/children/productSelection/children/MainProductImageWithPopover';
import {Body, BoldBody, Subcaption} from '../../style/Typography';

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
            packages {
                id
                numServings
                listings {
                    id
                    retailerName
                    affiliateLink {
                        source
                        url
                    }
                    price {
                        id
                        amount
                    }
                }
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

const UndecoratedAnchor = styled.a`
  && {
    text-decoration: unset;
    color: inherit;
  }
`;

const SelectedProduct: SFC<QueryOutputProps & IProps> = ({data: {CatalogProduct, currentRegimen, loading}, catalogProductId}) => {
  if (CatalogProduct && CatalogProduct.packages && currentRegimen && !loading) {
    // TODO work correctly with multiple packages (but actually replace w/ my own detail page)
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

    const regimenProduct = currentRegimen.products.find(product => product.catalogProductId === catalogProductId);
    const quantityCaption = regimenProduct
      ? `Take ${regimenProduct.quantity.amount} ${regimenProduct.quantity.units.toLowerCase()} ${regimenProduct.quantity.frequency.toLowerCase()}`
      : null;
    return (
      <Fragment>
        <CenteredTextGrid item lg={3} xs={12}>
          <MainProductImageWithPopover catalogProductId={catalogProductId}/>
        </CenteredTextGrid>
        <CenteredTextGrid item container direction='column' lg={9} xs={12} justify='center' spacing={8}>
          <Grid item>
            <a
              href={affiliateLink.url}
              target='__blank' rel='noopener nofollower norefer'
              onClick={generateTrackAffiliateLinkClick(listings[0].id, listings[0].retailerName, affiliateLink.source, CatalogProduct.id)}>
              <BoldBody dark>{CatalogProduct.name} ({prettifyEnumString(CatalogProduct.brand)})</BoldBody>
            </a>
          </Grid>
          <Grid item>
            <Body dark>{quantityCaption}</Body>
          </Grid>
          <Grid item>
            <Subcaption dark>
              <b>{CatalogProduct.packages[0].numServings}</b>&nbsp;servings for&nbsp;
              <b>${listings[0].price.amount}</b>
            </Subcaption>
          </Grid>
          <Grid item>
            <UndecoratedAnchor
              href={affiliateLink.url}
              target='__blank'
              rel='noopener nofollower norefer'
              onClick={generateTrackAffiliateLinkClick(listings[0].id, listings[0].retailerName, affiliateLink.source, CatalogProduct.id)}>
              <Button
                fullWidth
                variant='contained'
                color='default'>
                Buy on Amazon
              </Button>
            </UndecoratedAnchor>
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
