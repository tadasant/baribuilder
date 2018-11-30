import {Grid, Hidden} from '@material-ui/core';
import * as React from 'react';
import {Fragment, FunctionComponent} from 'react';
import {Body, Header} from '../../../components/style/Typography';
import Guidelines, {IMicronutrient} from '../children/Guidelines';
import RegimenPreview from '../children/RegimenPreview';
import {SharedItemsContainerGrid} from '../Landing.style';
import LandingShell from '../LandingShell';

const BypassLanding: FunctionComponent = () => {
  const micronutrients: IMicronutrient[] = [
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
          <Header dark>Gastric Bypass Guidelines</Header>
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
          Regimen Facts
        </RegimenPreview>
      </SharedItemsContainerGrid>
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
          Regimen Facts
        </RegimenPreview>
      </SharedItemsContainerGrid>
    </LandingShell>
  );
};

export default BypassLanding;
