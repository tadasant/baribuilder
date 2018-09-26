import {Grid, TextField} from '@material-ui/core';
import gql from 'graphql-tag';
import * as React from 'react';
import {SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {compose, pure} from 'recompose';
import styled from 'styled-components';
import {
  GetClientCatalogProductQuantities,
  GetClientCatalogProductQuantitiesVariables
} from '../../../../../typings/gql/GetClientCatalogProductQuantities';
import {EmptyRow} from '../../../../style/Layout';
import CatalogProductAddButton from './CatalogProductAddButton';

interface IProps {
  catalogProductId: string;
}

const GET_CLIENT_CATALOG_PRODUCT_QUANTITIES_QUERY = gql`
    query GetClientCatalogProductQuantities($catalogProductId: ID!) {
        ClientCatalogProduct(catalogProductId: $catalogProductId) @client {
            catalogProductId # ensure cache hit
            
            quantity {
                amount
                frequency
                units
            }
        }
    }
`;

type DataOutputProps = ChildDataProps<IProps, GetClientCatalogProductQuantities, GetClientCatalogProductQuantitiesVariables>;

const data = graphql<IProps, GetClientCatalogProductQuantities, GetClientCatalogProductQuantitiesVariables, DataOutputProps>(GET_CLIENT_CATALOG_PRODUCT_QUANTITIES_QUERY, {
  options: ({catalogProductId}) => ({
    variables: {catalogProductId},
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
const CatalogProductAddPanelPure: SFC<IProps & DataOutputProps> = ({data: {ClientCatalogProduct}, catalogProductId}) => {
  if (!ClientCatalogProduct) {
    return null;
  }
  const {quantity} = ClientCatalogProduct;

  return (
    <OuterGrid item container direction='row' justify='space-evenly'>
      <Grid item lg={2}/>
      <Grid item lg={8}>
        <TextField value={quantity.amount || ''} onChange={handleChange} fullWidth label='# servings'/>
      </Grid>
      <Grid item lg={2}/>
      <EmptyRow mobile='0px'/>
      <Grid item lg={4}/>
      <Grid item lg={4}>
        <CatalogProductAddButton catalogProductId={catalogProductId} quantity={quantity}/>
      </Grid>
      <Grid item lg={4}/>
    </OuterGrid>
  );
};

export default enhance(CatalogProductAddPanelPure);
