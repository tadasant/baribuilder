import {Grid, Hidden} from '@material-ui/core';
import * as React from 'react';
import {Fragment, FunctionComponent} from 'react';
import {Body, Header} from '../../../components/style/Typography';
import RegimenFacts, {IRegimenFactsMicronutrient} from '../../landing/children/RegimenFacts';
import RegimenPreview from '../../landing/children/RegimenPreview';
import Sketch from '../../style/SketchVariables';
import {SharedItemsContainerGrid} from '../Custom.style';
import CustomShell from '../CustomShell';

const bypassMicronutrients: IRegimenFactsMicronutrient[] = [
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
const bypassCheapestMicronutrients: IRegimenFactsMicronutrient[] = [
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
const sleeveMicronutrients: IRegimenFactsMicronutrient[] = [
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
const sleeveCheapestMicronutrients: IRegimenFactsMicronutrient[] = [
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

const StBarbarasHospital: FunctionComponent = () => {
  return (
    <CustomShell>
      <Fragment>
        <Grid item xs={12} lg={7}>
          <Header dark>St. Barbara's Hospital Recommendations</Header>
          <br/><br/>
          <Body dark>
          This page is maintained in collaboration with the Bariatric Surgery Center at St. Barbara's Hospital.
          </Body>
          <br/><br/>
          <Body dark>
          It is important that each patient receive individualized care. Please consult your medical provider before
          making any changes to your supplementation regimen.
          </Body>
          <br/><br/>
          <Body dark>
          Please remember that all bariatric patients should be getting labs done regularly, and adjusting their vitamin regimens based on those
          results.
          </Body>
          <br/><br/>
        </Grid>
        <Hidden mdDown>
          <Grid item lg={1}/>
        </Hidden>
        <Hidden lgUp smDown>
          <Grid item md={2}/>
        </Hidden>
        <Grid item xs={12} md={8} lg={4}>
          Hospital logo here
        </Grid>
        <Hidden lgUp smDown>
          <Grid item md={2}/>
        </Hidden>
      </Fragment>
      <SharedItemsContainerGrid item xs={12} container>
        <RegimenPreview
          name='Gastric Bypass (Bariatric Advantage)'
          numUnits={6}
          unitsColor='green'
          unitsName='pills'
          numProducts={2}
          productsColor='green'
          cost={59}
          costColor='red'
          pathname='/share?url-id=cjohfm8xa06wh01705q8e48e7&utm_source=curated-regimens&utm_medium=fb&utm_campaign=rny'>
          <RegimenFacts
            micronutrients={bypassMicronutrients}
            numProductServings={3}/>
        </RegimenPreview>
        <SharedItemsContainerGrid item xs={12} container>
          <RegimenPreview
            name='Gastric Bypass (Cheapest)'
            numUnits={8}
            unitsName='tablets'
            unitsColor='red'
            numProducts={3}
            productsColor='red'
            cost={15}
            costColor='green'
            pathname='/share?url-id=cjohbukm20pvi0139rxk3s49u&utm_source=curated-regimens&utm_medium=landing&utm_campaign=rny'>
            <RegimenFacts
              micronutrients={bypassCheapestMicronutrients}
              numProductServings={6}/>
          </RegimenPreview>
        </SharedItemsContainerGrid>
        <SharedItemsContainerGrid item xs={12} container>
          <RegimenPreview
            name='Gastric Sleeve (Celebrate)'
            numUnits={5}
            unitsName='pills/chews'
            unitsColor='green'
            numProducts={2}
            productsColor='green'
            cost={65}
            costColor='red'
            pathname='/share?url-id=cjogczql70m5k0163qt74qrr4&utm_source=curated-regimens&utm_medium=landing&utm_campaign=sleeve'>
            <RegimenFacts
              micronutrients={sleeveMicronutrients}
              numProductServings={4}/>
          </RegimenPreview>
        </SharedItemsContainerGrid>
        <SharedItemsContainerGrid item xs={12} container>
          <RegimenPreview
            name='Gastric Sleeve (Cheapest)'
            numUnits={8}
            unitsName='tablets'
            unitsColor='red'
            numProducts={4}
            productsColor='red'
            cost={14}
            costColor='green'
            pathname='/share?url-id=cjogd1gmw0ma50163a61uwswv&utm_source=curated-regimens&utm_medium=landing&utm_campaign=sleeve'>
            <RegimenFacts
              micronutrients={sleeveCheapestMicronutrients}
              numProductServings={6}/>
          </RegimenPreview>
        </SharedItemsContainerGrid>
      </SharedItemsContainerGrid>
    </CustomShell>
  );
};

export default StBarbarasHospital;
