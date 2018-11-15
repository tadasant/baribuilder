import {Grid} from '@material-ui/core';
import * as React from 'react';
import {Component, Fragment} from 'react';
import YouTube from 'react-youtube';
import styled from 'styled-components';
import {CenteredTextGrid, EmptyRow} from '../../style/Layout';
import {Header} from '../../style/Typography';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';

const VideoContainerGrid = styled(Grid)`
  padding: 5vh 0 5vh 0;
  text-align: center;
`;

const YoutubeContainer = styled(YouTube)`
  width: 100%;
  max-width: 640px;
`;

class HowItWorksSection extends Component {
  render() {
    return (
      <Fragment>
        <CenteredTextGrid item xs={12}>
          <Header dark>How it works</Header>
        </CenteredTextGrid>
        <Fragment>
          <Grid item xs={1}/>
          <Grid item xs={10} container justify='center'>
            <VideoContainerGrid xs={12}>
              <YoutubeContainer videoId='8SY00K2kn_o-U'/>
            </VideoContainerGrid>
          </Grid>
          <Grid item xs={1}/>
        </Fragment>
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
