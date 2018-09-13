import React, {Component, Fragment} from 'react';
import {Header} from '../../style/Typography.react';
import {EmptyRow} from '../../style/Layout.react';
import Step1 from './steps/Step1.react';
import Step2 from './steps/Step2.react';
import Step3 from './steps/Step3.react';
import Step4 from './steps/Step4.react';
import Grid from '@material-ui/core/Grid';

class HowItWorksSection extends Component {
  render() {
    return (
      <Fragment>
        <Grid item xs={12}>
          <Header dark>How it works</Header>
        </Grid>
        <EmptyRow mobile='30px'/>
        <Step1/>
        <EmptyRow mobile='50px'/>
        <Step2/>
        <EmptyRow mobile='50px'/>
        <Step3/>
        <EmptyRow mobile='50px'/>
        <Step4/>
      </Fragment>
    );
  }
}

export default HowItWorksSection;
