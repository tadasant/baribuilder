import {Grid} from '@material-ui/core';
import gql from 'graphql-tag';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import styled from 'styled-components';
import {GetSelectedProductListings} from '../../../typings/gql/GetSelectedProductListings';
import {EmptyRow} from '../../style/Layout';
import {Header} from '../../style/Typography';
import SelectedProductListing from './SelectedProduct';

const GET_SELECTED_PRODUCTS_QUERY = gql`
    query GetSelectedProductListings {
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

const SelectedProductListings: SFC<QueryOutputProps> = ({data: {currentRegimen}}) => {
  return (
    <Fragment>
      <CenteredTextGrid item lg={12}>
        <Header dark>Selections</Header>
      </CenteredTextGrid>
      <EmptyRow/>
      {
        currentRegimen
          ? currentRegimen.products.map(product => (
            <Fragment>
              <SelectedProductListing key={product.catalogProductId} catalogProductId={product.catalogProductId}/>
              <EmptyRow/>
            </Fragment>
          ))
          : null
      }
    </Fragment>
  )
};

const withData = graphql<{}, GetSelectedProductListings>(GET_SELECTED_PRODUCTS_QUERY);

export default withData(SelectedProductListings);
