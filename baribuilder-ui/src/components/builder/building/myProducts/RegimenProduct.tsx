import {Grid, TextField} from '@material-ui/core';
import gql from 'graphql-tag';
import {upperFirst} from 'lodash';
import * as React from 'react';
import {Fragment, KeyboardEvent, SFC} from 'react';
import {ChildDataProps, DataProps, graphql, MutateProps} from 'react-apollo';
import {compose, pure} from 'recompose';
import styled from 'styled-components';
import {GetCatalogProductForRegimenProduct} from '../../../../typings/gql/GetCatalogProductForRegimenProduct';
import {
  GetCurrentRegimenProducts_currentRegimen_products_cost,
  GetCurrentRegimenProducts_currentRegimen_products_quantity,
} from '../../../../typings/gql/GetCurrentRegimenProducts';
import {GetGoalsScreenData} from '../../../../typings/gql/GetGoalsScreenData';
import {SetDesiredIngredients, SetDesiredIngredientsVariables} from '../../../../typings/gql/SetDesiredIngredients';
import {BodyBold, Caption} from '../../../style/Typography';
import {GET_PREFETCH_QUERY_CLIENT} from '../../BuilderScreen';

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

type QueryOutputProps = ChildDataProps<{}, GetCatalogProductForRegimenProduct>;

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
  pure,
);

const CenteredTextGrid = styled(Grid)`
  text-align: center;
`;

// Pure
const RegimenProductPure: SFC<QueryOutputProps> = ({data: {CatalogProduct, loading}, quantity}) => {
  if (CatalogProduct && !loading) {

    const handleChangeQuantity = () => console.log('changed');
    const handleQuantityKeyPress = (event: KeyboardEvent) => event.key === 'Enter' ? handleChangeQuantity() : null;
    return (
      <Grid item container direction='row' alignItems='flex-start'>
        <CenteredTextGrid item lg={12}>
          <BodyBold dark>{CatalogProduct.name}</BodyBold>
        </CenteredTextGrid>
        <CenteredTextGrid item lg={12}>
          <Caption dark>{CatalogProduct.brand.split('_').map(s => upperFirst(s.toLowerCase())).join(' ')}</Caption>
        </CenteredTextGrid>
        <Fragment>
          <Grid item lg={4} />
          <Grid item lg={4}>
            <TextField type='number' defaultValue={quantity.amount || ''} onBlur={handleChangeQuantity} fullWidth helperText='servings/day' onKeyDown={handleQuantityKeyPress}/>
          </Grid>
          <Grid item lg={4} />
        </Fragment>
      </Grid>
    );
  }
  return null;
};

export default enhance(RegimenProductPure);
