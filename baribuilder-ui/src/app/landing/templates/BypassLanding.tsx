import {Grid} from '@material-ui/core';
import * as React from 'react';
import {Fragment, FunctionComponent} from 'react';
import {Body, Header} from '../../../components/style/Typography';
import LandingShell from '../LandingShell';

const BypassLanding: FunctionComponent = () => {
  return (
    <LandingShell>
      <Fragment>
        <Grid item xs={12} lg={8}>
          <Header dark>Gastric Bypass Guidelines</Header>
          <br/><br/>
          <Body dark>
          Using the American Society for Metabolic and Bariatric Surgery’s nutritional guidelines (2017), we derived the
          following image of “desired dosages” (daily).
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
        <Grid item xs={12} lg={4}>
          Guidelines Img
        </Grid>
      </Fragment>
      <hr/>
      <Fragment>
        <Grid item xs={12}>
          Cheapest Regimen
        </Grid>
        <Grid item xs={12} lg={4}>
          Summary text
        </Grid>
        <Grid item xs={12} lg={4}>
          Regimen facts
        </Grid>
        <Grid item xs={12} lg={4}>
          View products button
        </Grid>
      </Fragment>
    </LandingShell>
  );
};

export default BypassLanding;
