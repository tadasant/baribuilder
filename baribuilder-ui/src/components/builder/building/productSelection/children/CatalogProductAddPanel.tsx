import {Button, Grid} from '@material-ui/core';
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
            quantity @client {
                number
                units
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
const CatalogProductAddPanelPure: SFC<IProps & DataOutputProps> = (props) => {
  const CatalogProduct = props.data.CatalogProduct;
  if (!CatalogProduct) {
    return null;
  }
  return (
    <Fragment>
      <Grid container alignItems='center' justify='space-evenly'>
        <Grid item lg={12}>
          {/* TODO need to add mutation to update that quantity */}
          {CatalogProduct.quantity.number}
        </Grid>
        <Grid item lg={12}>
          {/* TODO need to add mutation to update that regimen stuff when hit */}
          <Button color='default'>Add</Button>
          blah
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default enhance(CatalogProductAddPanelPure);
