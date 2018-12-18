import {Grid, Hidden} from '@material-ui/core';
import * as React from 'react';
import {Fragment, FunctionComponent} from 'react';
import {Body, Header} from '../../../components/style/Typography';
import Sketch from '../../style/SketchVariables';
import Guidelines, {IGuidelinesMicronutrient} from '../children/Guidelines';
import RegimenFacts, {IRegimenFactsMicronutrient} from '../children/RegimenFacts';
import RegimenPreview from '../children/RegimenPreview';
import {SharedItemsContainerGrid} from '../Landing.style';
import LandingShell from '../LandingShell';

const cheapestMicronutrients: IRegimenFactsMicronutrient[] = [
  {
    name: 'Vitamin A',
    value: '13,000',
    goal: '5,000',
    color: Sketch.color.secondary.blue,
    units: 'IU'
  },
  {
    name: 'Vitamin D3',
    value: '3,500',
    goal: '3,000',
    color: Sketch.color.secondary.blue,
    units: 'IU'
  },
  {
    name: 'Vitamin E',
    value: '140',
    goal: '22',
    color: Sketch.color.secondary.blue,
    units: 'IU'
  },
  {
    name: 'Vitamin K1',
    value: '105',
    goal: '120',
    units: 'mcg'
  },
  {
    name: 'Thiamine',
    value: '21',
    goal: '100',
    units: 'mg'
  },
  {
    name: 'Folic Acid',
    value: '2,500',
    goal: '1,000',
    color: Sketch.color.secondary.blue,
    units: 'mcg'
  },
  {
    name: 'Vitamin B12',
    value: '1,043',
    goal: '500',
    color: Sketch.color.secondary.blue,
    units: 'mcg'
  },
  {
    name: 'Calcium',
    value: '1,420',
    goal: '1,500',
    units: 'mg'
  },
  {
    name: 'Iron',
    value: '54',
    goal: '19',
    color: Sketch.color.secondary.blue,
    units: 'mg'
  },
  {
    name: 'Zinc',
    value: '59',
    goal: '11',
    color: Sketch.color.secondary.blue,
    units: 'mg'
  },
  {
    name: 'Copper',
    value: '3.4',
    goal: '2',
    color: Sketch.color.secondary.blue,
    units: 'mg'
  },
];
const minimizingPillMicronutrients: IRegimenFactsMicronutrient[] = [
  {
    name: 'Vitamin A',
    value: '10,000',
    goal: '5,000',
    color: Sketch.color.secondary.blue,
    units: 'IU'
  },
  {
    name: 'Vitamin D3',
    value: '4,500',
    goal: '3,000',
    color: Sketch.color.secondary.blue,
    units: 'IU'
  },
  {
    name: 'Vitamin E',
    value: '60',
    goal: '22',
    color: Sketch.color.secondary.blue,
    units: 'IU'
  },
  {
    name: 'Vitamin K1',
    value: '120',
    goal: '120',
    units: 'mcg'
  },
  {
    name: 'Thiamine',
    value: '20',
    goal: '100',
    units: 'mg'
  },
  {
    name: 'Folic Acid',
    value: '800',
    goal: '1,000',
    units: 'mcg'
  },
  {
    name: 'Vitamin B12',
    value: '1,000',
    goal: '500',
    color: Sketch.color.secondary.blue,
    units: 'mcg'
  },
  {
    name: 'Calcium',
    value: '1,500',
    goal: '1,500',
    units: 'mg'
  },
  {
    name: 'Iron',
    value: '45',
    goal: '19',
    color: Sketch.color.secondary.blue,
    units: 'mg'
  },
  {
    name: 'Zinc',
    value: '15',
    goal: '11',
    color: Sketch.color.secondary.blue,
    units: 'mg'
  },
  {
    name: 'Copper',
    value: '2',
    goal: '2',
    units: 'mg'
  },
];
const standardMicronutrients: IRegimenFactsMicronutrient[] = [
  {
    name: 'Vitamin A',
    value: '10,000',
    goal: '5,000',
    color: Sketch.color.secondary.blue,
    units: 'IU'
  },
  {
    name: 'Vitamin D3',
    value: '4,500',
    goal: '3,000',
    color: Sketch.color.secondary.blue,
    units: 'IU'
  },
  {
    name: 'Vitamin E',
    value: '60',
    goal: '22',
    color: Sketch.color.secondary.blue,
    units: 'IU'
  },
  {
    name: 'Vitamin K1',
    value: '120',
    goal: '120',
    units: 'mcg'
  },
  {
    name: 'Thiamine',
    value: '12',
    goal: '100',
    units: 'mg'
  },
  {
    name: 'Folic Acid',
    value: '800',
    goal: '1,000',
    units: 'mcg'
  },
  {
    name: 'Vitamin B12',
    value: '500',
    goal: '500',
    units: 'mcg'
  },
  {
    name: 'Calcium',
    value: '1,500',
    goal: '1,500',
    units: 'mg'
  },
  {
    name: 'Iron',
    value: '36',
    goal: '19',
    color: Sketch.color.secondary.blue,
    units: 'mg'
  },
  {
    name: 'Zinc',
    value: '30',
    goal: '11',
    color: Sketch.color.secondary.blue,
    units: 'mg'
  },
  {
    name: 'Copper',
    value: '3',
    goal: '2',
    color: Sketch.color.secondary.blue,
    units: 'mg'
  },
];

const SleeveLanding: FunctionComponent = () => {
  const micronutrients: IGuidelinesMicronutrient[] = [
    {
      name: 'Vitamin A',
      units: 'IU',
      value: '5,000'
    },
    {
      name: 'Vitamin D3',
      units: 'IU',
      value: '3,000'
    },
    {
      name: 'Vitamin E',
      units: 'IU',
      value: '22'
    },
    {
      name: 'Thiamine',
      units: 'mg',
      value: ['12', '100']
    },
    {
      name: 'Folic Acid',
      units: 'mg',
      value: ['400', '1,000']
    },
    {
      name: 'Vitamin B12',
      units: 'mcg',
      value: ['350', '500']
    },
    {
      name: 'Calcium',
      units: 'mg',
      value: ['1,200', '1,500']
    },
    {
      name: 'Vitamin K1',
      units: 'mcg',
      value: ['90', '120']
    },
    {
      name: 'Iron',
      units: 'mg',
      value: '18'
    },
    {
      name: 'Zinc',
      units: 'mg',
      value: ['8', '11']
    },
    {
      name: 'Copper',
      units: 'mg',
      value: ['1', '2']
    },
  ];
  return (
    <LandingShell>
      <Fragment>
        <Grid item xs={12} lg={6}>
          <Header dark>Gastric Sleeve (VSG) Guidelines</Header>
          <br/><br/>
          <Body dark>
          Using the American Society for Metabolic and Bariatric Surgery’s nutritional guidelines (2017), we derived the
          following “desired dosages” (daily).
          </Body>
          <br/><br/>
          <Body dark>
          It is important to note that these are <b>maintenance</b> guidelines. They should only be used as a reference
          point.
          </Body>
          <br/><br/>
          <Body dark>
          All bariatric patients should be getting labs done regularly, and adjusting their dosages based on those
          results.
          </Body>
          <br/><br/>
        </Grid>
        <Hidden mdDown>
          <Grid item lg={2}/>
        </Hidden>
        <Hidden lgUp smDown>
          <Grid item md={2}/>
        </Hidden>
        <Grid item xs={12} md={8} lg={4}>
          <Guidelines micronutrients={micronutrients}/>
        </Grid>
        <Hidden lgUp smDown>
          <Grid item md={2}/>
        </Hidden>
      </Fragment>
      <SharedItemsContainerGrid item xs={12} container>
        <RegimenPreview
          name='Cheapest'
          numUnits={8}
          unitsName='tablets'
          unitsColor='red'
          numProducts={4}
          productsColor='red'
          cost={14}
          costColor='green'
          pathname='/share?url-id=cjogd1gmw0ma50163a61uwswv&utm_source=curated-regimens&utm_medium=landing&utm_campaign=sleeve'>
          <RegimenFacts
            micronutrients={cheapestMicronutrients}
            numProductServings={6}/>
        </RegimenPreview>
      </SharedItemsContainerGrid>
      <SharedItemsContainerGrid item xs={12} container>
        <RegimenPreview
          name='Pill Minimizing'
          numUnits={4}
          unitsName='pills/sticks'
          unitsColor='green'
          numProducts={2}
          cost={33}
          pathname='/share?url-id=cjogcy0l30mzl0189b2pev66b&utm_source=curated-regimens&utm_medium=landing&utm_campaign=sleeve'>
          <RegimenFacts
            micronutrients={minimizingPillMicronutrients}
            numProductServings={4}/>
        </RegimenPreview>
      </SharedItemsContainerGrid>
      <SharedItemsContainerGrid item xs={12} container>
        <RegimenPreview
          name='Standard (Celebrate)'
          numUnits={5}
          unitsName='pills/chews'
          numProducts={2}
          cost={65}
          costColor='red'
          pathname='/share?url-id=cjogczql70m5k0163qt74qrr4&utm_source=curated-regimens&utm_medium=landing&utm_campaign=sleeve'>
          <RegimenFacts
            micronutrients={standardMicronutrients}
            numProductServings={4}/>
        </RegimenPreview>
      </SharedItemsContainerGrid>
    </LandingShell>
  );
};

export default SleeveLanding;
