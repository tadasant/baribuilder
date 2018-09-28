import {Grid} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import gql from 'graphql-tag';
import {upperFirst} from 'lodash';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {compose, pure} from 'recompose';
import styled from 'styled-components';
import Sketch from '../../../../app/style/SketchVariables';
import {calculateRegimenIngredients, IRegimenIngredient} from '../../../../state/resolvers/lib/helpers';
import {
  GetDataForRegimenFacts,
  GetDataForRegimenFacts_allCatalogProducts,
  GetDataForRegimenFacts_currentRegimen_products,
  GetDataForRegimenFacts_desiredIngredients_ingredientRanges
} from '../../../../typings/gql/GetDataForRegimenFacts';
import {FREQUENCY, INGREDIENT_QUANTITY_UNITS, PRODUCT_QUANTITY_UNITS} from '../../../../typings/gql/globalTypes';
import {ShadowedSelect} from '../../../style/CustomMaterial';
import {EmptyRow} from '../../../style/Layout';
import {Body, BoldBody, Header2} from '../../../style/Typography';

const REGIMEN_FACTS_QUERY = gql`
    query GetDataForRegimenFacts {
        allCatalogProducts {
            id
            serving {
                ingredients {
                    quantity {
                        amount
                        units
                    }
                    ingredientType {
                        name
                    }
                }
            }
        }
        currentRegimen @client {
            products {
                catalogProductId
                quantity {
                    amount
                    frequency
                    units
                }
                cost {
                    money
                    frequency
                }
            }
        }
        desiredIngredients @client {
            ingredientRanges {
                ingredientTypeName
                minimumAmount
                maximumAmount
                units
                frequency
            }
        }
    }
`;


type DataOutputProps = ChildDataProps<{}, GetDataForRegimenFacts>;

const data = graphql<{}, GetDataForRegimenFacts>(REGIMEN_FACTS_QUERY);

const enhance = compose<DataOutputProps, {}>(
  data,
  pure,
);

const OuterGrid = styled(Grid)`
  border: 1px solid ${Sketch.color.accent.black};
`;

const InnerGrid = styled(Grid)`
  padding-left: 8px;
  padding-right: 8px;
`;

const Header2LeftAlign = styled(Header2)`
  text-align: left;
`;

const ServingsHeaderGrid = styled(Grid)`
  border-bottom: 18px solid ${Sketch.color.accent.black};
`;

const BodyRightAlign = styled(Body)`
  text-align: right;
`;

const TitlesHeaderGrid = styled(Grid)`
  border-bottom: 1px solid ${Sketch.color.accent.grey};
`;

const calculateNumberOfServings = (products: GetDataForRegimenFacts_currentRegimen_products[]) => {
  let totalServings = 0;
  if (products.length > 0) {
    products.forEach(product => {
      if (product.quantity.units !== PRODUCT_QUANTITY_UNITS.SERVINGS) {
        console.warn('Unit conversions still unsupported. Error code 9912437.');
      }
      if (product.quantity.frequency !== FREQUENCY.DAILY) {
        console.warn('Frequency conversions still unsupported. Error code 9912437.');
      }

      totalServings += product.quantity.amount;
    })
  }

  return totalServings;
};

interface IPropsForMicronutrientRow {
  ingredientTypeName: string;
  amount: number;
  units: INGREDIENT_QUANTITY_UNITS;
  percentOfGoal: number;
}

const ColoredBodyBold = styled(BoldBody)`
  && {
    color: ${props => props.color};
  }
`;

const RightAlignPaddedGrid = styled(Grid)`
  text-align: right;
  padding-right: 4px;
`;

const LeftAlignGrid = styled(Grid)`
  text-align: left;
`;

const MicronutrientRow: SFC<IPropsForMicronutrientRow> = props => {
  const isExceeded = props.percentOfGoal > 100;
  const isDeficient = props.percentOfGoal < 100;
  const colorGoal = isExceeded ? Sketch.color.secondary.blue : isDeficient ? Sketch.color.accent.danger : Sketch.color.accent.black;
  return (
    <Fragment>
      <LeftAlignGrid item lg={5}>
        <BoldBody dark>{props.ingredientTypeName}</BoldBody>
      </LeftAlignGrid>
      <RightAlignPaddedGrid item lg={3}>
        <Body dark>{props.amount}</Body>
      </RightAlignPaddedGrid>
      <LeftAlignGrid item lg={1}>
        <Body dark>{props.units.toLowerCase()}</Body>
      </LeftAlignGrid>
      <RightAlignPaddedGrid item lg={3}>
        <ColoredBodyBold color={colorGoal}>
          {props.percentOfGoal.toFixed(0)}%
        </ColoredBodyBold>
      </RightAlignPaddedGrid>
    </Fragment>
  )
};

const calculateMicronutrientRowPropsList = (
  currentRegimenProducts: GetDataForRegimenFacts_currentRegimen_products[],
  allCatalogProducts: GetDataForRegimenFacts_allCatalogProducts[],
  desiredIngredientRanges: GetDataForRegimenFacts_desiredIngredients_ingredientRanges[]
): IPropsForMicronutrientRow[] => {
  const regimenIngredientsByName = calculateRegimenIngredients(currentRegimenProducts, allCatalogProducts);
  const results: IPropsForMicronutrientRow[] = [];
  desiredIngredientRanges.forEach(range => {
    const currentRegimenIngredient = regimenIngredientsByName.hasOwnProperty(range.ingredientTypeName) ? regimenIngredientsByName[range.ingredientTypeName] : null;
    const percentOfGoal = calculatePercentageOfGoal(range, currentRegimenIngredient);
    if (percentOfGoal !== null) {
      results.push({
        ingredientTypeName: range.ingredientTypeName,
        amount: currentRegimenIngredient ? currentRegimenIngredient.amount : 0,
        units: range.units,
        percentOfGoal,
      })
    }
  });

  return results;
};

const calculatePercentageOfGoal = (
  desiredRange: GetDataForRegimenFacts_desiredIngredients_ingredientRanges,
  currentIngredient: IRegimenIngredient | null
): number | null => {
  if (currentIngredient === null) {
    if (desiredRange.minimumAmount) {
      return 0;
    } else {
      return 100;
    }
  }

  let percentOfGoal = 100;
  if (desiredRange.units === currentIngredient.units) {
    if (desiredRange.minimumAmount && currentIngredient.amount < desiredRange.minimumAmount) {
      percentOfGoal = desiredRange.minimumAmount / currentIngredient.amount;
    } else if (desiredRange.maximumAmount && currentIngredient.amount > desiredRange.maximumAmount) {
      percentOfGoal = desiredRange.maximumAmount / currentIngredient.amount;
    }

  } else {
    console.warn('Unit conversions not yet supported. Error code 592013');
    return null;
  }

  return percentOfGoal;
};

// Pure
const RegimenFactsPure: SFC<DataOutputProps> = ({data: {currentRegimen, allCatalogProducts, desiredIngredients, loading}}) => {
  if (currentRegimen && allCatalogProducts && desiredIngredients && !loading) {
    const micronutrientRowPropsList = calculateMicronutrientRowPropsList(currentRegimen.products, allCatalogProducts, desiredIngredients.ingredientRanges);
    return (
      <Fragment>
        <OuterGrid container>
          <InnerGrid item lg={12} container direction='row' alignItems='flex-start'>
            <Grid item lg={12}>
              <Header2LeftAlign dark>Regimen Facts</Header2LeftAlign>
            </Grid>
            <ServingsHeaderGrid item lg={12}>
              <Body dark># of product servings {calculateNumberOfServings(currentRegimen.products)}</Body>
            </ServingsHeaderGrid>
            <TitlesHeaderGrid item lg={12} container>
              <Grid item lg={6}>
                <Body dark>Amount per day</Body>
              </Grid>
              <Grid item lg={6}>
                <BodyRightAlign dark>% of goal</BodyRightAlign>
              </Grid>
            </TitlesHeaderGrid>
            {
              micronutrientRowPropsList.map(rowProps => (
                <Grid item lg={12} container key={rowProps.ingredientTypeName}>
                  <MicronutrientRow {...rowProps}/>
                </Grid>
              ))
            }
            <EmptyRow/>
          </InnerGrid>
        </OuterGrid>
        <EmptyRow/>
        <Grid item lg={3}/>
        <Grid item lg={6}>
          <ShadowedSelect value={FREQUENCY.DAILY}>
            <MenuItem value={FREQUENCY.DAILY}
                      key={FREQUENCY.DAILY}>{upperFirst(FREQUENCY.DAILY.toLowerCase())}</MenuItem>
          </ShadowedSelect>
        </Grid>
        <Grid item lg={3}/>
      </Fragment>
    );
  }
  return null;
};

export default enhance(RegimenFactsPure);
