import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import * as React from 'react';
import {SFC} from 'react';
import {RouteComponentProps, withRouter} from 'react-router';
import styled from 'styled-components';
import Sketch from '../app/style/SketchVariables';
import {generateTrackNavClick} from '../lib/gaHelper';
import {fixedWidthImage} from '../lib/imageKitHelpers';
import {UndecoratedLink} from './style/CustomMaterial';

const logoImgSrc = 'https://ik.imagekit.io/vitaglab/baribuilder-logo-beta-white_ry91QeWtQ.png';
export const navbarHeight = '64px';

const PaddedImg = styled.img`
  height: 80%;
  margin: 8px;
`;

const GridWithRaisedBackground = styled(Grid)`
  background-color: ${Sketch.color.accent.black};
  box-shadow: 0px 2px 4px 0px;
  height: ${navbarHeight};
  z-index: 2;
  position: relative;
`;

const WhiteNavButton = styled(Button)`
  && {
    color: ${Sketch.color.accent.white};
  }
`;

const FullHeightGrid = styled(Grid)`
  height: 100%;
`;

const NavbarPure: SFC<RouteComponentProps> = ({location}) => {
  const showCheckout = location.pathname.startsWith('/browse');
  return (
    <GridWithRaisedBackground container>
      <FullHeightGrid item xs={6}>
        <UndecoratedLink to='/' onClick={generateTrackNavClick('Header image')}>
          <PaddedImg src={fixedWidthImage(logoImgSrc, '400px')} alt='BariBuilder Logo'/>
        </UndecoratedLink>
      </FullHeightGrid>
      <Grid item xs={6} container alignItems='center' justify='flex-end'>
        {showCheckout
          ? (
            <Grid item>
              <Tooltip
                title={'Sorry, checkout is not yet available. To buy products on Amazon, open "My Products" and click the name of each product you\'ve added to your regimen.'}>
                <Button color='primary' variant='raised'>Checkout</Button>
              </Tooltip>
            </Grid>
          )
          : null
        }
        <Grid item>
          <UndecoratedLink to='/browse/all_products' onClick={generateTrackNavClick('Browse nav')}>
            <WhiteNavButton fullWidth>
              Browse
            </WhiteNavButton>
          </UndecoratedLink>
        </Grid>
        <Grid item>
          <UndecoratedLink to='/build' onClick={generateTrackNavClick('Build nav')}>
            <WhiteNavButton fullWidth>
              Build
            </WhiteNavButton>
          </UndecoratedLink>
        </Grid>
      </Grid>

    </GridWithRaisedBackground>
  )
};

export default withRouter(NavbarPure);
