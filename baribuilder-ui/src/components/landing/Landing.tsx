import Grid from '@material-ui/core/Grid';
import * as React from 'react';
import {Component, Fragment} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import ScrollPercentage from 'react-scroll-percentage';
import styled from 'styled-components';
import {trackScrollPercent} from '../../lib/analytics';
import {EmptyRow} from '../style/Layout';
import Hero from './sections/1_Hero/1_Hero';
import BariBuilderExplanationSection from './sections/2_BariBuilderExplanationSection/2_BariBuilderExplanationSection';
import HowItWorksSection from './sections/4_HowItWorksSection';
import BottomCTABanner from './sections/5_BottomCTABanner';
import LandingFooter from './sections/footer/LandingFooter';

const GutteredGrid = styled(Grid)`
  margin: 8px;
`;

interface IState {
  ctaModalActive: boolean;
  maxScrolled: number;
}

class Landing extends Component<RouteComponentProps, IState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      ctaModalActive: false,
      maxScrolled: 0,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidUpdate(prevProps: RouteComponentProps, prevState: IState) {
    if (prevState.maxScrolled < 25 && this.state.maxScrolled > 25) {
      trackScrollPercent('Landing Page', 25);
    }

    if (prevState.maxScrolled < 50 && this.state.maxScrolled > 50) {
      trackScrollPercent('Landing Page', 50);
    }

    if (prevState.maxScrolled < 70 && this.state.maxScrolled > 70) {
      trackScrollPercent('Landing Page', 70);
    }
  }

  handleScroll(fraction: number) {
    const percentage = fraction * 100;
    if (percentage > this.state.maxScrolled) {
      this.setState({maxScrolled: percentage});
    }
  }

  render() {
    return (
      <Fragment>
        <ScrollPercentage onChange={this.handleScroll}>
          <Grid container>
            <Hero/>
            <GutteredGrid container direction='row'>
              <EmptyRow mobile='5px'/>
              <BariBuilderExplanationSection/>
              <EmptyRow mobile='20px' tablet='40px'/>
              <HowItWorksSection/>
              <EmptyRow mobile='20px' tablet='40px'/>
              <BottomCTABanner/>
            </GutteredGrid>
            <LandingFooter/>
          </Grid>
        </ScrollPercentage>
      </Fragment>
    );
  }
}

export default withRouter(Landing);
