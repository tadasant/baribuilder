import Grid from '@material-ui/core/Grid';
import React, {Component, Fragment} from 'react';
import {toast} from 'react-toastify';
import styled from 'styled-components';
import Sketch from '../../../app/style/SketchVariables';
import {generateTrackNavClick} from '../../../lib/analytics';
import {CenteredTextGrid} from '../../goals/GoalsScreenPure';
import {media} from '../../style/Core';
import {UndecoratedLink} from '../../style/CustomMaterial';
import {EmptyRow} from '../../style/Layout';
import {Header} from '../../style/Typography';
import {CTANavButton} from './1_Hero.react';

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
  font-size: ${Sketch.typography.header2.fontSize};

  ${media.tablet`
    font-size: ${Sketch.typography.header.tablet.fontSize};
  `}
`;

class BottomCTABanner extends Component {
  constructor(props) {
    super(props);
    this.handleCTAClick = this.handleCTAClick.bind(this);
  }

  handleCTAClick() {
    if (window.innerWidth < 1119) {
      toast.warn('Warning: BariBuilder is not optimized for small screens. Consider using a deskop/laptop computer.', {
        autoClose: false,
      });
    }
    generateTrackNavClick('Bottom Build CTA')();
  }

  render() {
    return (
      <Grid item container direction='row'>
        <Grid item xs={1} sm={2}/>
        <BoxedBlueShadowHangingGrid item xs={10} sm={8} container>
          <EmptyRow mobile='20px' tablet='65px'/>
          <Grid item xs={12} container>
            <Grid item xs={2} lg={1}/>
            <CenteredTextGrid item xs={8} lg={10}>
              <HeaderWithHeader2MobileSize dark>Start building your personalized regimen.</HeaderWithHeader2MobileSize>
            </CenteredTextGrid>
            <Grid item xs={2} lg={1}/>
          </Grid>
          <EmptyRow mobile='20px' tablet='65px'/>
          <Fragment>
            <Grid item xs={2} sm={3} lg={4}/>
            <Grid item xs={8} sm={6} lg={4}>
              <UndecoratedLink to={'/goals'} onClick={this.handleCTAClick}>
                <CTANavButton variant='contained' fullWidth>
                  Build Personal Regimen
                </CTANavButton>
              </UndecoratedLink>
            </Grid>
            <Grid item xs={2} sm={3} lg={4}/>
          </Fragment>
          <EmptyRow mobile='20px' tablet='65px'/>
        </BoxedBlueShadowHangingGrid>
        <Grid item xs={1} sm={2}/>
      </Grid>
    );
  }
}

export default BottomCTABanner;
