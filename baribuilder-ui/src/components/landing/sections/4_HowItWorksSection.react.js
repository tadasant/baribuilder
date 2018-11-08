import React, {Component, Fragment} from 'react';
import {CenteredTextGrid, EmptyRow} from '../../style/Layout';
import {Header} from '../../style/Typography';
import Step1 from './steps/Step1.react';
import Step2 from './steps/Step2.react';
import Step3 from './steps/Step3.react';
import Step4 from './steps/Step4.react';

class HowItWorksSection extends Component {
  render() {
    return (
      <Fragment>
        <CenteredTextGrid item xs={12}>
          <Header dark>How it works</Header>
        </CenteredTextGrid>
        <EmptyRow mobile='20px'/>
        <Step1/>
        <EmptyRow mobile='40px'/>
        <Step2/>
        <EmptyRow mobile='40px'/>
        <Step3/>
        <EmptyRow mobile='40px'/>
        <Step4/>
      </Fragment>
    );
  }
}

export default HowItWorksSection;
