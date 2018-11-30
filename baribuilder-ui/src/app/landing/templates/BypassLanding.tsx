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
    value: '14,000',
    goal: '10,000',
    color: Sketch.color.secondary.blue,
    units: 'IU'
  },
  {
    name: 'Vitamin D3',
    value: '4,000',
    goal: '3,000',
    color: Sketch.color.secondary.blue,
    units: 'IU'
  },
  {
    name: 'Vitamin E',
    value: '120',
    goal: '22',
    color: Sketch.color.secondary.blue,
    units: 'IU'
  },
  {
    name: 'Vitamin K1',
    value: '100',
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
    value: '2,400',
    goal: '1,000',
    color: Sketch.color.secondary.blue,
    units: 'mcg'
  },
  {
    name: 'Vitamin B12',
    value: '1,024',
    goal: '500',
    color: Sketch.color.secondary.blue,
    units: 'mcg'
  },
  {
    name: 'Calcium',
    value: '1,400',
    goal: '1,500',
    units: 'mg'
  },
  {
    name: 'Iron',
    value: '72',
    goal: '60',
    color: Sketch.color.secondary.blue,
    units: 'mg'
  },
  {
    name: 'Zinc',
    value: '59',
    goal: '22',
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
const minimizingPillMicronutrients: IRegimenFactsMicronutrient[] = [
  {
    name: 'Vitamin A',
    value: '10,000',
    goal: '10,000',
    units: 'IU'
  },
  {
    name: 'Vitamin D3',
    value: '3,999',
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
    goal: '60',
    units: 'mg'
  },
  {
    name: 'Zinc',
    value: '15',
    goal: '22',
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
    goal: '10,000',
    units: 'IU'
  },
  {
    name: 'Vitamin D3',
    value: '4,000',
    goal: '3,000',
    color: Sketch.color.secondary.blue,
    units: 'IU'
  },
  {
    name: 'Vitamin E',
    value: '150',
    goal: '22',
    color: Sketch.color.secondary.blue,
    units: 'IU'
  },
  {
    name: 'Vitamin K1',
    value: '300',
    goal: '120',
    units: 'mcg'
  },
  {
    name: 'Thiamine',
    value: '12.5',
    goal: '100',
    units: 'mg'
  },
  {
    name: 'Folic Acid',
    value: '800',
    goal: '1,000',
    color: Sketch.color.secondary.blue,
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
    value: '1,440',
    goal: '1,500',
    units: 'mg'
  },
  {
    name: 'Iron',
    value: '45',
    goal: '60',
    units: 'mg'
  },
  {
    name: 'Zinc',
    value: '26',
    goal: '22',
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

const BypassLanding: FunctionComponent = () => {
  const micronutrients: IGuidelinesMicronutrient[] = [
    {
      name: 'Vitamin A',
      units: 'IU',
      value: ['5,000', '10,000']
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
      value: ['45', '60']
    },
    {
      name: 'Zinc',
      units: 'mg',
      value: ['8', '22']
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
          <Header dark>Gastric Bypass (RNY) Guidelines</Header>
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
          numProducts={3}
          productsColor='red'
          cost={15}
          costColor='green'
          pathname='/share?url-id=cjohbukm20pvi0139rxk3s49u&utm_source=curated-regimens&utm_medium=fb&utm_campaign=rny'>
          <RegimenFacts
            micronutrients={cheapestMicronutrients}
            numProductServings={6}/>
        </RegimenPreview>
      </SharedItemsContainerGrid>
      <SharedItemsContainerGrid item xs={12} container>
        <RegimenPreview
          name='Pill Minimizing'
          numUnits={4}
          unitsName='pills'
          unitsColor='green'
          numProducts={2}
          cost={39}
          pathname='/share?url-id=cjohakjh30jrk0139be8m4818&utm_source=curated-regimens&utm_medium=fb&utm_campaign=rny'>
          <RegimenFacts
            micronutrients={minimizingPillMicronutrients}
            numProductServings={4}/>
        </RegimenPreview>
      </SharedItemsContainerGrid>
      <SharedItemsContainerGrid item xs={12} container>
        <RegimenPreview
          name='Standard (Bariatric Advantage)'
          numUnits={6}
          unitsName='pills'
          numProducts={2}
          cost={59}
          costColor='red'
          pathname='/share?url-id=cjohfm8xa06wh01705q8e48e7&utm_source=curated-regimens&utm_medium=fb&utm_campaign=rny'>
          <RegimenFacts
            micronutrients={standardMicronutrients}
            numProductServings={3}/>
        </RegimenPreview>
      </SharedItemsContainerGrid>
    </LandingShell>
  );
};

export default BypassLanding;
