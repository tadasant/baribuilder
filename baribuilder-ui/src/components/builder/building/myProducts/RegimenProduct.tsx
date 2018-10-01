import {Grid, TextField} from '@material-ui/core';
import gql from 'graphql-tag';
import {upperFirst} from 'lodash';
import * as React from 'react';
import {ChangeEvent, Fragment, KeyboardEvent, SFC} from 'react';
import {ChildDataProps, DataProps, graphql, MutateProps} from 'react-apollo';
import {compose, pure} from 'recompose';
import styled from 'styled-components';
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
import {GET_PREFETCH_QUERY_CLIENT} from '../../BuilderScreen';
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
            listings {
                url
            }
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
    refetchQueries: [{query: GET_PREFETCH_QUERY_CLIENT}],
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

// Pure
const RegimenProductPure: SFC<QueryOutputProps & MutationOutputProps> = ({data: {CatalogProduct, loading}, quantity, catalogProductId, mutate}) => {
  if (CatalogProduct && !loading && mutate && CatalogProduct.listings) {

    const mutateAmount = (amount: number) => mutate({
      variables: {
        catalogProductId,
        regimenProductQuantity: {
          amount,
          frequency: quantity.frequency,
          units: quantity.units,
        }
      },
      refetchQueries: [{query: GET_PREFETCH_QUERY_CLIENT}],
    });

    const handleChangeQuantity = (event: ChangeEvent<HTMLInputElement>) => mutateAmount(event.target.value ? parseInt(event.target.value, 10) : 0);
    const handleQuantityKeyPress = (event: KeyboardEvent) =>
      // @ts-ignore For some reason doesn't recognize presence of .value
      event.key === 'Enter' ? mutateAmount(event.target.value ? parseInt(event.target.value, 10) : 0) : null;

    return (
      <Grid item container direction='row' alignItems='flex-start'>
        <CenteredTextGrid item lg={12}>
          {/* TODO remove url bit when checkout page complete */}
          <a href={CatalogProduct.listings[0].url} target='__blank' rel='noopener nofollower norefer'><BoldBody dark>{CatalogProduct.name}</BoldBody></a>
        </CenteredTextGrid>
        <CenteredTextGrid item lg={12}>
          <Caption dark>{CatalogProduct.brand.split('_').map(s => upperFirst(s.toLowerCase())).join(' ')}</Caption>
        </CenteredTextGrid>
        <Fragment>
          <Grid item lg={4}/>
          <Grid item lg={3}>
            <TextField type='number' defaultValue={quantity.amount || ''} onBlur={handleChangeQuantity} fullWidth
                       helperText='servings/day' onKeyDown={handleQuantityKeyPress}/>
          </Grid>
          <Grid item lg={1} container justify='center'>
            {/* TODO can't figure out how to v-center this */}
            <XRegimenProductIcon catalogProductId={catalogProductId}/>
          </Grid>
          <Grid item lg={4}/>
        </Fragment>
      </Grid>
    );
  }
  return null;
};

export default enhance(RegimenProductPure);
