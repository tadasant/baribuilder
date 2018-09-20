import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import * as React from 'react';
import {SFC} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import Sketch from '../app/style/SketchVariables';
import {generateTrackNavClick} from '../lib/gaHelper';
import {fixedWidthImage} from '../lib/imageKitHelpers';

const logoImgSrc = 'https://ik.imagekit.io/vitaglab/baribuilder-logo-beta-white_ry91QeWtQ.png';

const PaddedImg = styled.img`
  height: 90%;
  padding: 8px;
`;

const GridWithRaisedBackground = styled(Grid)`
  background-color: ${Sketch.color.accent.black};
  box-shadow: 0px 2px 4px 0px;
  height: 64px;
`;

const WhiteNavButton = styled(Button)`
  && {
    color: ${Sketch.color.accent.white};
  }
`;

const HeaderPure: SFC = () => {
  return (
    <GridWithRaisedBackground container={true} spacing={8}>
      <Grid item={true} lg={3} xs={6}>
        <Link to='/' onClick={generateTrackNavClick('Header image')}>
          <PaddedImg src={fixedWidthImage(logoImgSrc, '400px')} alt='BariBuilder Logo'/>
        </Link>
      </Grid>
      <Grid item={true} lg={7} xs={2}/>
      <Grid item={true} container={true} lg={1} xs={2} alignItems='center'>
        <Grid item={true}>
          <Link to='/builder' onClick={generateTrackNavClick('Browse nav')}>
            <WhiteNavButton fullWidth={true}>
              Browse
            </WhiteNavButton>
          </Link>
        </Grid>
      </Grid>
      <Grid item={true} container={true} lg={1} xs={2} alignItems='center'>
        <Grid item={true}>
          <Link to='/builder' onClick={generateTrackNavClick('Build nav')}>
            <WhiteNavButton fullWidth={true}>
              Build
            </WhiteNavButton>
          </Link>
        </Grid>
      </Grid>
    </GridWithRaisedBackground>
  )
};

export default HeaderPure;
