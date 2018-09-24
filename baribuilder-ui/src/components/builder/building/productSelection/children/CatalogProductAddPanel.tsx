import {Grid} from '@material-ui/core';
import gql from 'graphql-tag';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {compose, pure} from 'recompose';
import {
  GetCatalogProductQuantities,
  GetCatalogProductQuantitiesVariables
} from '../../../../../typings/gql/GetCatalogProductQuantities';

const GET_CATALOG_PRODUCT_QUANTITIES_QUERY = gql`
    query GetCatalogProductQuantities($id: ID) {
        CatalogProduct(id: $id) {
            # ID required to reconcile @client queries
            id
            quantity @client {
                amount
                frequency
            }
        }
    }
`;

interface IProps {
  catalogProductId: string;
}

type DataOutputProps = ChildDataProps<IProps, GetCatalogProductQuantities, GetCatalogProductQuantitiesVariables>;

const data = graphql<IProps, GetCatalogProductQuantities, GetCatalogProductQuantitiesVariables, DataOutputProps>(GET_CATALOG_PRODUCT_QUANTITIES_QUERY, {
  options: ({catalogProductId}) => ({
    variables: {id: catalogProductId},
  }),
});

const enhance = compose<IProps & DataOutputProps, IProps>(
  data,
  pure,
);

// Pure
const CatalogProductAddPanelPure: SFC<IProps & DataOutputProps> = ({data: {CatalogProduct}}) => {
  if (!CatalogProduct) {
    return null;
  }
  return (
    <Fragment>
      <Grid container alignItems='center'>
        {CatalogProduct.quantity.amount}
      </Grid>
    </Fragment>
  );
};

export default enhance(CatalogProductAddPanelPure);
