import React, {Component, Fragment} from 'react';
import {Header} from '../../style/Typography.react';
import Grid from '@material-ui/core/Grid';
import Sketch from '../../../app/style/SketchVariables';
import styled from 'styled-components';
import {EmptyRow} from '../../style/Layout.react';
import {media} from '../../style/Core';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';

const BoxedBlueShadowHangingGrid = styled(Grid)`
  && {
    background-color: ${Sketch.color.background.opaque};
    box-shadow: 0px 3px 4px rgba(0,0,0,0.2), 0 6px 15px rgba(0,0,0,0.19);
  
    // Make it offset vertically
    margin-bottom: -100px;
    z-index: 1;
  }
`;

const HeaderWithHeader2MobileSize = styled(Header)`
  font-size: ${Sketch.typography.header2.fontsize};

  ${media.tablet`
    font-size: ${Sketch.typography.header.tablet.fontsize};
  `}
`;

class BottomCTABanner extends Component {
  constructor(props) {
    super(props);
    this.handleCTAClick = this.handleCTAClick.bind(this);
  }

  handleCTAClick() {
    ReactGA.event({
      category: 'CTA',
      action: 'click',
      label: 'Bottom CTA Click'
    });
    this.props.onCTAClick();
  }

  render() {
    return (
      <Grid item container direction='row'>
        <Grid item xs={1} sm={2}/>
        <BoxedBlueShadowHangingGrid item xs={10} sm={8} container>
          <EmptyRow mobile='30px' tablet='75px'/>
          <Grid item xs={12} container>
            <Grid item xs={2} lg={1} />
            <Grid item xs={8} lg={10}>
              <HeaderWithHeader2MobileSize dark>Find your personalized vitamins.</HeaderWithHeader2MobileSize>
            </Grid>
            <Grid item xs={2} lg={1}/>
          </Grid>
          <EmptyRow mobile='30px' tablet='75px'/>
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
          <EmptyRow mobile='30px' tablet='75px'/>
        </BoxedBlueShadowHangingGrid>
        <Grid item xs={1} sm={2}/>
      </Grid>
    );
  }
}

BottomCTABanner.propTypes = {
  onCTAClick: PropTypes.func.isRequired,
};

export default BottomCTABanner;
