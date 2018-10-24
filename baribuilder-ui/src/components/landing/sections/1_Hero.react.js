import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import {fade} from '@material-ui/core/styles/colorManipulator';
import React, {Component, Fragment} from 'react';
import styled from 'styled-components';
import Sketch from '../../../app/style/SketchVariables';
import images from '../../../constants/images';
import {generateTrackNavClick} from '../../../lib/analytics';
import {CenteredTextGrid} from '../../goals/GoalsScreenPure';
import {navbarHeight} from '../../navbar/Navbar';
import {UndecoratedLink} from '../../style/CustomMaterial';
import {EmptyRow} from '../../style/Layout';
import {Header} from '../../style/Typography';
import SignupForm from '../SignupForm';

const HeroGrid = styled(Grid)`
  height: calc(100vh - ${navbarHeight});

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
      category: 'Internal Link',
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
        <EmptyRow mobile='15px'/>
        <Fragment>
          <Hidden only='xs' lgUp>
            <Grid item sm={1}/>
          </Hidden>
          <CenteredTextGrid item xs={12} sm={10} lg={12}>
            <Header dark>Find the bariatric vitamins best for <u>you</u>.</Header>
          </CenteredTextGrid>
          <Hidden only='xs' lgUp>
            <Grid item sm={1}/>
          </Hidden>
        </Fragment>
        <EmptyRow mobile='15px'/>
        <SignupForm/>
        <EmptyRow mobile='15px'/>
        <Fragment>
          <Grid item xs={1} lg={3}/>
          <Grid item xs={10} lg={6} container direction='row'>
            <Grid item xs={12}>
              <UndecoratedLink to={'/goals'} onClick={generateTrackNavClick('Top Build CTA')}>
                <CTANavButton variant='raised' fullWidth>
                  Build Personal Regimen
                </CTANavButton>
              </UndecoratedLink>
            </Grid>
            <Grid item xs={1}/>
          </Grid>
          <Grid item xs={1} lg={3}/>
        </Fragment>
      </HeroGrid>
    );
  }
}

export default Hero;
