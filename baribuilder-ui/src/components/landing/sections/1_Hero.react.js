import React, {Component, Fragment} from 'react';
import {Caption, Header} from '../../style/Typography.react';
import {EmptyRow} from '../../style/Layout.react';
import Button from '@material-ui/core/Button';
import Sketch from '../../../app/style/SketchVariables';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import Hidden from '@material-ui/core/Hidden';
import images from '../../../constants/images';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';

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

const PaddedImg = styled.img`
  padding: 8px;
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
    this.props.onCTAClick();
  }

  render() {
    return (
      <HeroGrid item container alignContent='flex-start'>
          <Grid item xs={12}>
            <a href='https://vitaglab.com/' target='_blank' rel='noopener noreferrer' onClick={this.handleLogoClick}>
              <PaddedImg
                src={images.coloredLogo.original}
                srcSet={`${images.coloredLogo.mobile} 64w,
                         ${images.coloredLogo.tablet} 128w`}
                sizes={`(min-width: ${Sketch.breakpoints.tablet}px) 128px, 64px`}
                alt='Vita.G Logo'
              />
            </a>
          </Grid>
          <EmptyRow mobile='50px'/>
          <Fragment>
            <Hidden only='xs' lgUp>
              <Grid item sm={1}/>
            </Hidden>
            <Grid item xs={12} sm={10} lg={12}>
              <Header dark>Bariatric vitamins, made easy.</Header>
            </Grid>
            <Hidden only='xs' lgUp>
              <Grid item sm={1}/>
            </Hidden>
          </Fragment>
          <EmptyRow mobile='75px' desktop='50px'/>
          <Fragment>
            <Grid item xs={2} sm={3} lg={4}/>
            <Grid item xs={8} sm={6} lg={4}>
              <Button
                color='secondary'
                fullWidth
                variant='raised'
                onClick={this.handleCTAClick}>
                Join Waitlist
              </Button>
            </Grid>
            <Grid item xs={2} sm={3} lg={4}/>
          </Fragment>
          <Fragment>
            <Grid item xs={2} sm={3} lg={4}/>
            <Grid item xs={8} sm={6} lg={4}>
              <Caption dark>Coming soon: BariBuilder, a <u>free</u> web application to help you find your vitamins.</Caption>
            </Grid>
            <Grid item xs={2} sm={3} lg={4}/>
          </Fragment>
      </HeroGrid>
    );
  }
}

Hero.propTypes = {
  onCTAClick: PropTypes.func.isRequired,
};

export default Hero;
