import {Grid, TextField} from '@material-ui/core';
import gql from 'graphql-tag';
import {upperFirst} from 'lodash';
import * as React from 'react';
import {ChangeEvent, Fragment, KeyboardEvent, SFC} from 'react';
import {ChildDataProps, DataProps, graphql, MutateProps} from 'react-apollo';
import {toast} from 'react-toastify';
import {compose, pure} from 'recompose';
import styled from 'styled-components';
import {PREFETCH_CLIENT_CATALOG_PRODUCTS_QUERY} from '../../../../app/BuilderApp';
import {GetCatalogProductForRegimenProduct} from '../../../../typings/gql/GetCatalogProductForRegimenProduct';
import {
  GetCurrentRegimenProducts_currentRegimen_products_cost,
  GetCurrentRegimenProducts_currentRegimen_products_quantity,
} from '../../../../typings/gql/GetCurrentRegimenProducts';
import {
  SetCurrentRegimenProductQuantity,
  SetCurrentRegimenProductQuantityVariables
} from '../../../../typings/gql/SetCurrentRegimenProductQuantity';
import {BoldBody, Caption} from '../../../style/Typography';
import MainProductImageWithPopover from '../productSelection/children/MainProductImageWithPopover';
import XRegimenProductIcon from './XRegimenProductIcon';

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

const REGIMEN_PRODUCT_QUANTITY_MUTATION = gql`
    mutation SetCurrentRegimenProductQuantity($catalogProductId: ID!, $regimenProductQuantity: RegimenProductQuantityInput!) {
        SetCurrentRegimenProductQuantity(
            catalogProductId: $catalogProductId,
            regimenProductQuantity: $regimenProductQuantity,
        ) @client {
            products {
                catalogProductId
            }
        }
    }
`;

type QueryOutputProps = ChildDataProps<IProps, GetCatalogProductForRegimenProduct>;

type MutationOutputProps =
  Partial<DataProps<SetCurrentRegimenProductQuantity, SetCurrentRegimenProductQuantityVariables>>
  & Partial<MutateProps<SetCurrentRegimenProductQuantity, SetCurrentRegimenProductQuantityVariables>>;

const withData = graphql<IProps, GetCatalogProductForRegimenProduct>(GET_CATALOG_PRODUCT_FOR_REGIMEN_PRODUCT, {
  options: ({catalogProductId}) => ({
    variables: {id: catalogProductId},
  }),
});

const withMutation = graphql<{}, SetCurrentRegimenProductQuantity>(REGIMEN_PRODUCT_QUANTITY_MUTATION, {
  options: {
    refetchQueries: [{query: PREFETCH_CLIENT_CATALOG_PRODUCTS_QUERY}],
  }
});

const enhance = compose<IProps & QueryOutputProps, IProps>(
  withData,
  withMutation,
  pure,
);

const CenteredTextGrid = styled(Grid)`
  text-align: center;
`;

const MainImage = styled(MainProductImageWithPopover)`
  height: 100px;
`;

// Pure
const RegimenProductPure: SFC<QueryOutputProps & MutationOutputProps> = ({data: {CatalogProduct, loading}, quantity, catalogProductId, mutate}) => {
  if (CatalogProduct && !loading && mutate) {
    const mutateAmount = (amount: number) => mutate({
      variables: {
        catalogProductId,
        regimenProductQuantity: {
          amount,
          frequency: quantity.frequency,
          units: quantity.units,
        }
      },
      refetchQueries: [{query: PREFETCH_CLIENT_CATALOG_PRODUCTS_QUERY}],
    }).then(response => {
      if (response && !response.errors) {
        toast.success(`Product quantity updated`);
      }
    });

    const handleChangeQuantity = (event: ChangeEvent<HTMLInputElement>) => mutateAmount(event.target.value ? parseInt(event.target.value, 10) : 0);
    const handleQuantityKeyPress = (event: KeyboardEvent) =>
      // @ts-ignore For some reason doesn't recognize presence of .value
      event.key === 'Enter' ? mutateAmount(event.target.value ? parseInt(event.target.value, 10) : 0) : null;

    return (
      <Grid item container alignItems='center'>
        <Grid item xs={4}>
          <MainImage catalogProductId={catalogProductId} anchorSide='left'/>
        </Grid>
        <Grid item container xs={8} alignContent='flex-start'>
          <CenteredTextGrid item xs={12}>
            <BoldBody dark>{CatalogProduct.name}</BoldBody>
          </CenteredTextGrid>
          <CenteredTextGrid item xs={12}>
            <Caption dark>{CatalogProduct.brand.split('_').map(s => upperFirst(s.toLowerCase())).join(' ')}</Caption>
          </CenteredTextGrid>
          <Fragment>
            <Grid item xs={4}/>
            <Grid item xs={3}>
              <TextField type='number' defaultValue={quantity.amount || ''} onBlur={handleChangeQuantity} fullWidth
                         key={quantity.amount} helperText='servings/day' onKeyDown={handleQuantityKeyPress}/>
            </Grid>
            <Grid item xs={1} container justify='center'>
              {/* TODO can't figure out how to v-center this */}
              <XRegimenProductIcon catalogProductId={catalogProductId}/>
            </Grid>
            <Grid item xs={4}/>
          </Fragment>
        </Grid>
      </Grid>
    );
  }
  return null;
};

export default enhance(RegimenProductPure);
