import Grid from '@material-ui/core/Grid';
import * as React from 'react';
import {SFC} from 'react';
import * as ReactGA from 'react-ga';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import Sketch from '../app/style/SketchVariables';
import {fixedWidthImage} from '../lib/imageKitHelpers';

const logoImgSrc = 'https://ik.imagekit.io/vitaglab/baribuilder-beta-white-logo_BJoZGbeKQ.png';

const PaddedImg = styled.img`
  padding: 8px;
`;

const GridWithRaisedBackground = styled(Grid)`
  background-color: ${Sketch.color.accent.black};
  box-shadow: 0px 2px 4px 0px;
`;

const handleLogoClick = () => {
  ReactGA.event({
    category: 'Internal Link',
    action: 'click',
    label: 'Header Logo Click'
  });
};

const HeaderPure: SFC = () => {
  return (
    <GridWithRaisedBackground container={true} spacing={8}>
      <Grid item={true} lg={3}>
        <Link to='/' onClick={handleLogoClick}>
          <PaddedImg src={fixedWidthImage(logoImgSrc, '200px')} alt='BariBuilder Logo'/>
        </Link>
      </Grid>
      <Grid item={true} lg={7}/>
      <Grid item={true} lg={2}>
        Nav
      </Grid>
    </GridWithRaisedBackground>
  )
};

export default HeaderPure;
