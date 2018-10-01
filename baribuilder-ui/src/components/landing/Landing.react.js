import React, {Component, Fragment} from 'react';
import Hero from './sections/1_Hero.react';
import Grid from '@material-ui/core/Grid';
import PriceSection from './sections/2_PriceSection.react';
import {EmptyRow} from '../style/Layout';
import UniqueSection from './sections/3_UniqueSection.react';
import HowItWorksSection from './sections/4_HowItWorksSection.react';
import BottomCTABanner from './sections/5_BottomCTABanner.react';
import Footer from './sections/LandingFooter.react.js';
import styled from 'styled-components';
import ScrollPercentage from 'react-scroll-percentage';
import ReactGA from 'react-ga';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

const GutteredGrid = styled(Grid)`
  margin: 8px;
`;

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ctaModalActive: false,
      maxScrolled: 0,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.maxScrolled < 25 && this.state.maxScrolled > 25) {
      ReactGA.event({
        category: 'Landing Page',
        action: 'scroll',
        label: 'Scroll 25%'
      });
    }

    if (prevState.maxScrolled < 50 && this.state.maxScrolled > 50) {
      ReactGA.event({
        category: 'Landing Page',
        action: 'scroll',
        label: 'Scroll 50%'
      });
    }

    if (prevState.maxScrolled < 70 && this.state.maxScrolled > 70) {
      ReactGA.event({
        category: 'Landing Page',
        action: 'scroll',
        label: 'Scroll 70%'
      });
    }
  }

  handleScroll(fraction) {
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
              <EmptyRow mobile='65px' tablet='90px'/>
              <PriceSection/>
              <EmptyRow mobile='65px' tablet='90px'/>
              <UniqueSection/>
              <EmptyRow mobile='65px' tablet='90px'/>
              <HowItWorksSection/>
              <EmptyRow mobile='65px' tablet='90px'/>
              <BottomCTABanner onCTAClick={this.handleCTAClick}/>
            </GutteredGrid>
            <Footer/>
          </Grid>
        </ScrollPercentage>
      </Fragment>
    );
  }
}

Landing.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default withRouter(Landing);
