import {Grid} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import {upperFirst} from 'lodash';
import * as React from 'react';
import {SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {compose, pure} from 'recompose';
import {CURRENT_REGIMEN_PRODUCTS_QUERY} from '../../../../state/resolvers/resolver/queries';
import {
  GetCurrentRegimenProducts,
  GetCurrentRegimenProducts_currentRegimen_products
} from '../../../../typings/gql/GetCurrentRegimenProducts';
import {FREQUENCY} from '../../../../typings/gql/globalTypes';
import {ShadowedSelect} from '../../../style/CustomMaterial';
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
      if (product.cost.frequency !== FREQUENCY.DAILY) {
        console.warn('Frequency conversions still unsupported. Error code 3828325.');
      }

      totalMoney += product.cost.money;
    })
  }

  return totalMoney;
};

// Pure
const CurrentRegimenCostPure: SFC<DataOutputProps> = ({data: {currentRegimen, loading}}) => {
  if (currentRegimen && !loading) {

    const monthlyRegimenCost = calculateDailyRegimenCost(currentRegimen.products) * 30;
    return (
      <Grid container direction='row' alignItems='flex-start'>
        <Grid item lg={12}>
          <Header2 dark>Regimen Cost</Header2>
        </Grid>
        <Grid item lg={12}>
          <Header2 dark>$<u>{monthlyRegimenCost.toFixed(2)}</u></Header2>
        </Grid>
        <EmptyRow/>
        <Grid item lg={3} />
        <Grid item lg={6}>
          <ShadowedSelect value={FREQUENCY.MONTHLY}>
            <MenuItem value={FREQUENCY.MONTHLY} key={FREQUENCY.MONTHLY}>{upperFirst(FREQUENCY.MONTHLY.toLowerCase())}</MenuItem>
          </ShadowedSelect>
        </Grid>
        <Grid item lg={3} />
      </Grid>
    );
  }
  return null;
};

export default enhance(CurrentRegimenCostPure);
