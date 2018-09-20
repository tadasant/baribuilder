import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import * as ReactGA from 'react-ga';
import styled from 'styled-components';
import Sketch from '../../../app/style/SketchVariables';
import images from '../../../constants/images';
import {EmptyRow} from '../../style/Layout';
import {Caption, Header} from '../../style/Typography';

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

const NearFullWidthTextField = styled(TextField)`
  width: 90%;
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
        <EmptyRow mobile='50px'/>
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
        <EmptyRow mobile='50px'/>
        <Fragment>
          <Grid item xs={1} lg={3}/>
          <Grid item xs={6} lg={4}>
            <NearFullWidthTextField
              InputProps={{style: {borderColor: Sketch.color.secondary.blue}}}
              placeholder='Email Address'
            />
          </Grid>
          <Grid item xs={4} lg={2}>
            <Button
              color='secondary'
              fullWidth
              variant='raised'
              // onClick={this.handleCTAClick}
            >
              Get Updates
            </Button>
          </Grid>
          <Grid item xs={1} lg={3}/>
        </Fragment>
        <Fragment>
          <Grid item xs={2} sm={3} lg={4}/>
          <Grid item xs={8} sm={6} lg={4}>
            <Caption dark>Coming soon: BariBuilder, a <u>free</u> web application to help you find your
              vitamins.</Caption>
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
