import {Grid} from '@material-ui/core';
import {upperFirst} from 'lodash';
import * as React from 'react';
import {SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {compose, pure} from 'recompose';
import styled from 'styled-components';
import {CURRENT_REGIMEN_PRODUCTS_QUERY} from '../../../../state/resolvers/resolver/queries';
import {
  GetCurrentRegimenProducts,
  GetCurrentRegimenProducts_currentRegimen_products
} from '../../../../typings/gql/GetCurrentRegimenProducts';
import {FREQUENCY} from '../../../../typings/gql/globalTypes';
import {EmptyRow} from '../../../style/Layout';
import {Header2} from '../../../style/Typography';

// GraphQL HOC props (output)
type DataOutputProps = ChildDataProps<{}, GetCurrentRegimenProducts>;

const data = graphql<{}, GetCurrentRegimenProducts>(CURRENT_REGIMEN_PRODUCTS_QUERY);

const enhance = compose<DataOutputProps, {}>(
  data,
  pure,
);

// TODO centralize this calculation somewhere
const calculateDailyRegimenCost = (products: GetCurrentRegimenProducts_currentRegimen_products[]): number => {
  let totalMoney = 0.0;
  if (products.length > 0) {
    products.forEach(product => {
      if (product.cost.frequency !== FREQUENCY.DAILY || product.quantity.frequency !== FREQUENCY.DAILY) {
        console.warn('Frequency conversions still unsupported. Error code 3828325.');
      }

      totalMoney += (product.cost.money * product.quantity.amount);
    })
  }

  return totalMoney;
};

const CenteredTextGrid = styled(Grid)`
  text-align: center;
`;

// Pure
const CurrentRegimenCostPure: SFC<DataOutputProps> = ({data: {currentRegimen, loading}}) => {
  if (currentRegimen && !loading) {

    const monthlyRegimenCost = calculateDailyRegimenCost(currentRegimen.products) * 30;
    return (
      <Grid container direction='row' alignItems='flex-start'>
        <CenteredTextGrid item xs={12}>
          <Header2 dark>Total {upperFirst(FREQUENCY.MONTHLY.toLowerCase())} Regimen Cost</Header2>
        </CenteredTextGrid>
        <CenteredTextGrid item xs={12}>
          <Header2 dark>$<u>{monthlyRegimenCost.toFixed(2)}</u></Header2>
        </CenteredTextGrid>
        <EmptyRow/>
        <Grid item xs={3} />
        <Grid item xs={6}>
          {/*/!* TODO enable options; don't forget to change hardcoded header as well *!/*/}
          {/*<ShadowedSelect value={FREQUENCY.MONTHLY}>*/}
          {/*<MenuItem value={FREQUENCY.MONTHLY} key={FREQUENCY.MONTHLY}>{upperFirst(FREQUENCY.MONTHLY.toLowerCase())}</MenuItem>*/}
          {/*</ShadowedSelect>*/}
        </Grid>
        <Grid item xs={3} />
      </Grid>
    );
  }
  return null;
};

export default enhance(CurrentRegimenCostPure);
