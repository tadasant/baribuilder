import {Button, Grid, TextField} from '@material-ui/core';
import gql from 'graphql-tag';
import * as React from 'react';
import {SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {compose, pure} from 'recompose';
import styled from 'styled-components';
import {
  GetCatalogProductQuantities,
  GetCatalogProductQuantitiesVariables
} from '../../../../../typings/gql/GetCatalogProductQuantities';
import {EmptyRow} from '../../../../style/Layout';

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

const OuterGrid = styled(Grid)`
  height: 100%;
`;

const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> = (event) => console.log(event.target.value);

// Pure
const CatalogProductAddPanelPure: SFC<IProps & DataOutputProps> = ({data: {CatalogProduct}}) => {
  if (!CatalogProduct) {
    return null;
  }
  return (
    <OuterGrid item container direction='row' justify='space-evenly'>
        <Grid item lg={2} />
        <Grid item lg={8}>
          <TextField value={CatalogProduct.quantity.amount || ''} onChange={handleChange} fullWidth label='# servings'/>
        </Grid>
      <Grid item lg={2} />
        <EmptyRow mobile='0px'/>
        <Grid item lg={4} />
        <Grid item lg={4}>
          <Button variant='raised' color='default' fullWidth>Add</Button>
        </Grid>
        <Grid item lg={4} />
    </OuterGrid>
  );
};

export default enhance(CatalogProductAddPanelPure);
