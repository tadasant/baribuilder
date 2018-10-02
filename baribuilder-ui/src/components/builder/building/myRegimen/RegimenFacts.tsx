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
import {compareIngredientTypeNames} from '../../../../lib/constants';
import {calculateRegimenIngredients, IRegimenIngredient} from '../../../../state/resolvers/lib/helpers';
import {
  GetDataForRegimenFacts,
  GetDataForRegimenFacts_allCatalogProducts,
  GetDataForRegimenFacts_currentRegimen_products,
  GetDataForRegimenFacts_goalIngredients_ingredientRanges
} from '../../../../typings/gql/GetDataForRegimenFacts';
import {FREQUENCY, INGREDIENT_QUANTITY_UNITS, PRODUCT_QUANTITY_UNITS} from '../../../../typings/gql/globalTypes';
import {CenteredTextGrid} from '../../../goals/GoalsScreenPure';
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
        goalIngredients @client {
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

const RightAlignGrid = styled(Grid)`
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
  percentOfGoal?: number;
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

const GreyHeader2 = styled(Header2)`
  color: ${Sketch.color.accent.grey};
`;

const MicronutrientRow: SFC<IPropsForMicronutrientRow> = props => {
  const isExceeded = props.percentOfGoal !== undefined && props.percentOfGoal > 100;
  const isDeficient = props.percentOfGoal !== undefined && props.percentOfGoal < 100;
  const colorGoal = isExceeded ? Sketch.color.secondary.blue : isDeficient ? Sketch.color.accent.danger : Sketch.color.accent.black;
  return (
    <Fragment>
      <LeftAlignGrid item lg={5}>
        <BoldBody dark>{props.ingredientTypeName}</BoldBody>
      </LeftAlignGrid>
      <RightAlignPaddedGrid item lg={3}>
        <Body dark>{props.amount.toFixed((props.amount % 1 > 0) ? 1 : 0)}</Body>
      </RightAlignPaddedGrid>
      <LeftAlignGrid item lg={1}>
        <Body dark>{props.units.toLowerCase()}</Body>
      </LeftAlignGrid>
      {
        props.percentOfGoal !== undefined
          ? (
            <RightAlignPaddedGrid item lg={3}>
              <ColoredBodyBold color={colorGoal}>
                {props.percentOfGoal.toFixed(0)}%
              </ColoredBodyBold>
            </RightAlignPaddedGrid>
          )
          : null
      }
    </Fragment>
  )
};

const calculateMicronutrientRowPropsList = (
  currentRegimenProducts: GetDataForRegimenFacts_currentRegimen_products[],
  allCatalogProducts: GetDataForRegimenFacts_allCatalogProducts[],
  goalIngredientRanges: GetDataForRegimenFacts_goalIngredients_ingredientRanges[]
): IPropsForMicronutrientRow[] => {
  const regimenIngredientsByName = calculateRegimenIngredients(currentRegimenProducts, allCatalogProducts);
  const results: IPropsForMicronutrientRow[] = [];
  if (goalIngredientRanges.length > 0) {
    goalIngredientRanges.forEach(range => {
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
  } else {
    Object.values(regimenIngredientsByName).forEach(regimenIngredient => {
      results.push({
        ingredientTypeName: regimenIngredient.ingredientTypeName,
        amount: regimenIngredient.amount,
        units: regimenIngredient.units,
      })
    })
  }
  return results;
};

const calculatePercentageOfGoal = (
  goalRange: GetDataForRegimenFacts_goalIngredients_ingredientRanges,
  currentIngredient: IRegimenIngredient | null,
): number | null => {
  if (currentIngredient === null) {
    if (goalRange.minimumAmount) {
      return 0;
    } else {
      return 100;
    }
  }

  let percentOfGoal = 100;
  if (goalRange.units === currentIngredient.units) {
    if (goalRange.minimumAmount && currentIngredient.amount < goalRange.minimumAmount) {
      percentOfGoal = currentIngredient.amount * 100 / goalRange.minimumAmount;
    } else if (goalRange.maximumAmount && currentIngredient.amount > goalRange.maximumAmount) {
      percentOfGoal = currentIngredient.amount * 100 / goalRange.maximumAmount;
    }

  } else {
    console.warn('Unit conversions not yet supported. Error code 592013');
    return null;
  }

  return percentOfGoal;
};

// Pure
const RegimenFactsPure: SFC<DataOutputProps> = ({data: {currentRegimen, allCatalogProducts, goalIngredients, loading}}) => {
  if (currentRegimen && allCatalogProducts && goalIngredients && !loading) {
    const micronutrientRowPropsList = calculateMicronutrientRowPropsList(currentRegimen.products, allCatalogProducts, goalIngredients.ingredientRanges);
    micronutrientRowPropsList.sort((p1, p2) => compareIngredientTypeNames(p1.ingredientTypeName, p2.ingredientTypeName));
    if (micronutrientRowPropsList.length === 0) {
      return (
        <CenteredTextGrid>
          <GreyHeader2 dark>
            You haven't added any products to your regimen! Add some from the left.
          </GreyHeader2>
        </CenteredTextGrid>
      )
    }
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
              {
                goalIngredients.ingredientRanges.length > 0
                  ? (
                    <RightAlignGrid item lg={6}>
                      <Body dark>% of goal</Body>
                    </RightAlignGrid>
                  )
                  : null
              }
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
