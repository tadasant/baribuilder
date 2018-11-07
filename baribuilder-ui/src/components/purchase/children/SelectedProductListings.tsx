import {Button, Grid} from '@material-ui/core';
import gql from 'graphql-tag';
import {keyBy} from 'lodash';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import styled from 'styled-components';
import {GetSelectedProductListings} from '../../../typings/gql/GetSelectedProductListings';
import {EmptyRow} from '../../style/Layout';
import {Header, Subcaption} from '../../style/Typography';
import {WideUndecoratedLink} from '../PurchaseScreenPure';
import SelectedProductListing from './SelectedProduct';

const GET_SELECTED_PRODUCTS_QUERY = gql`
    query GetSelectedProductListings {
        allCatalogProducts {
            id
            packages {
                id
                listings {
                    id
                    retailerName
                    url
                }
            }
        }
        currentRegimen @client {
            products {
                catalogProductId

            }
        }
    }
`;

type QueryOutputProps = ChildDataProps<{}, GetSelectedProductListings>;

const CenteredTextGrid = styled(Grid)`
  text-align: center;
`;

const PaddedCenteredTextGrid = styled(Grid)`
  padding-left: 16px;
  padding-right: 16px;
  text-align: center;
`;

const SelectedProductListings: SFC<QueryOutputProps> = ({data: {currentRegimen, loading, allCatalogProducts}}) => {
  const catalogProductsById = allCatalogProducts ? keyBy(allCatalogProducts, product => product.id) : {};
  const handleOpenAllClick = () => {
    if (currentRegimen) {
      currentRegimen.products.forEach(product => {
        const {packages} = catalogProductsById[product.catalogProductId];
        if (packages && packages.length > 0 && packages[0].listings) {
          const listings = packages[0].listings.filter(listing => listing.retailerName === 'AMAZON');
          if (listings && listings.length > 0) {
            window.open(listings[0].url, '_blank');
          }
        }
      })
    }
  };

  return (
    <Fragment>
      <CenteredTextGrid item lg={12}>
        <Header dark>Selections</Header>
      </CenteredTextGrid>
      <EmptyRow/>
      {
        currentRegimen
          ? currentRegimen.products.map(product => (
            <Fragment key={product.catalogProductId}>
              <SelectedProductListing catalogProductId={product.catalogProductId}/>
              <EmptyRow mobile='16px'/>
            </Fragment>
          ))
          : null
      }
      <EmptyRow/>
      {currentRegimen && currentRegimen.products.length > 0
        ? (
          <Fragment>
            <PaddedCenteredTextGrid item lg={6}>
              <Button color='primary' fullWidth onClick={handleOpenAllClick} variant='contained'>Open all in Amazon tabs</Button>
              <Subcaption dark>You may need to disable your popup blocker</Subcaption>
            </PaddedCenteredTextGrid>
          </Fragment>
        ) : null
      }
      <PaddedCenteredTextGrid item lg>
        <WideUndecoratedLink to='/browse/all_products'>
          <Button variant='contained' color='secondary' fullWidth>
            Edit Selections
          </Button>
        </WideUndecoratedLink>
      </PaddedCenteredTextGrid>
    </Fragment>
  )
};

const withData = graphql<{}, GetSelectedProductListings>(GET_SELECTED_PRODUCTS_QUERY);

export default withData(SelectedProductListings);
