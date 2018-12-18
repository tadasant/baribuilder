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

const StBarbarasHospital: FunctionComponent = () => {
  return (
    <CustomShell>
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
          unitsName='pills'
          numProducts={2}
          cost={59}
          costColor='red'
          pathname='/share?url-id=cjohfm8xa06wh01705q8e48e7&utm_source=curated-regimens&utm_medium=fb&utm_campaign=rny'>
          <RegimenFacts
            micronutrients={bypassMicronutrients}
            numProductServings={3}/>
        </RegimenPreview>
      </SharedItemsContainerGrid>
    </CustomShell>
  );
};

export default StBarbarasHospital;
