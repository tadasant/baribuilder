import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import {fade} from '@material-ui/core/styles/colorManipulator';
import React, {Component, Fragment} from 'react';
import * as ReactGA from 'react-ga';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import Sketch from '../../../app/style/SketchVariables';
import images from '../../../constants/images';
import {generateTrackNavClick} from '../../../lib/gaHelper';
import {EmptyRow} from '../../style/Layout';
import {Header} from '../../style/Typography';
import SignupForm from '../SignupForm';

const HeroGrid = styled(Grid)`
  height: 100vh;

  background-image: url('${images.hero.mobile}');
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: 100%;

  @media (min-width: 600px) and (min-height: 960px) {
    background-image: url('${images.hero.tablet}');
    background-size: 100%;
  }

  @media (min-width: 900px) and (max-height: 960px) {
    background-image: url('${images.hero.desktop}');
  }
`;

const CTANavButton = styled(Button)`
  && {
    color: ${Sketch.color.accent.white};
    background-color: ${Sketch.color.accent.black};
    
    :hover {
      background-color: ${fade(Sketch.color.accent.black, .8)};
    }
  }
`;

class Hero extends Component {
  constructor(props) {
    super(props);
    this.handleLogoClick = this.handleLogoClick.bind(this);
    this.handleCTAClick = this.handleCTAClick.bind(this);
  }

  handleLogoClick() {
    ReactGA.event({
      category: 'Outbound Link',
      action: 'click',
      label: 'Hero Logo Click'
    });
  }

  handleCTAClick() {
    ReactGA.event({
      category: 'CTA',
      action: 'click',
      label: 'Hero CTA Click'
    });
  }

  render() {
    return (
      <HeroGrid item container alignContent='flex-start'>
        <EmptyRow mobile='25px'/>
        <Fragment>
          <Hidden only='xs' lgUp>
            <Grid item sm={1}/>
          </Hidden>
          <Grid item xs={12} sm={10} lg={12}>
            <Header dark>Find the bariatric vitamins best for <u>you</u>.</Header>
          </Grid>
          <Hidden only='xs' lgUp>
            <Grid item sm={1}/>
          </Hidden>
        </Fragment>
        <EmptyRow mobile='25px'/>
        <SignupForm/>
        <EmptyRow mobile='25px'/>
        <Fragment>
          <Grid item xs={1} lg={3}/>
          <Grid item xs={5} lg={3} container direction='row'>
            <Grid item xs={11}>
              <Link to={'/builder'} onClick={generateTrackNavClick('Browse CTA')}>
                <CTANavButton variant='raised' fullWidth>
                  Browse Product Catalog
                </CTANavButton>
              </Link>
            </Grid>
            <Grid item xs={1}/>
          </Grid>
          <Grid item xs={5} lg={3} container direction='row'>
            <Grid item xs={1}/>
            <Grid item xs={11}>
              <Link to={'/builder?openMyRegimen=true'} onClick={generateTrackNavClick('Build CTA')}>
                <CTANavButton variant='raised' fullWidth>
                  Build Personal Regimen
                </CTANavButton>
              </Link>
            </Grid>
          </Grid>
          <Grid item xs={1} lg={3}/>
        </Fragment>
      </HeroGrid>
    );
  }
}

export default Hero;
