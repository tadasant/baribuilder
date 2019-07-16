import {Hidden, Menu, MenuItem} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import * as React from 'react';
import {MouseEvent, SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {RouteComponentProps, withRouter} from 'react-router';
import {toast} from 'react-toastify';
import {compose, withState} from 'recompose';
import styled from 'styled-components';
import Sketch from '../../app/style/SketchVariables';
import FbSmallIcon from '../../assets/fb/fb-small.svg';
import MenuBarsIcon from '../../assets/icon/bars.svg';
import {generateTrackNavClick} from '../../lib/analytics';
import {fixedWidthImage} from '../../lib/imageKitHelpers';
import {GetSearchQuery} from '../../typings/gql/GetSearchQuery';
import {SEARCH_QUERY_QUERY} from '../catalog/queries';
import {UndecoratedAnchor} from '../footer/ContactInformationPanel';
import {media} from '../style/Core';
import {UndecoratedLink} from '../style/CustomMaterial';
import SearchBox from './SearchBox';

const logoImgSrc = 'https://ik.imagekit.io/vitaglab/baribuilder-logo-beta-white_ry91QeWtQ.png';
export const navbarHeight = '64px';

type QueryOutputProps = ChildDataProps<{}, GetSearchQuery>;

const PaddedImg = styled.img`
  height: 80%;
  margin: 8px;
`;

const GridWithRaisedBackground = styled(Grid)`
  background-color: ${Sketch.color.accent.black};
  box-shadow: 0px 2px 4px 0px;
  height: ${navbarHeight};
  z-index: 5;
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

const MobileNavIconImg = styled.img`
  max-height: 24px;
  cursor: pointer;
`;

const FbIconImg = styled.img`
  cursor: pointer;
  max-height: 36px;
  
  ${media.tablet`
    max-height: 48px;
  `}
`;

const NavigationGrid = styled(Grid)`
  padding: 8px;
`;

interface IPropsState {
  mainMenuAnchorEl: HTMLElement | null;
  setMainMenuAnchorEl: (el: HTMLElement | null) => HTMLElement | null;
  secondaryMenuAnchorEl: HTMLElement | null;
  setSecondaryMenuAnchorEl: (el: HTMLElement | null) => HTMLElement | null;
}

const NavbarPure: SFC<RouteComponentProps & QueryOutputProps & IPropsState> = ({location, history, data: {searchQuery}, mainMenuAnchorEl, setMainMenuAnchorEl, secondaryMenuAnchorEl, setSecondaryMenuAnchorEl}) => {
  const showCheckout = location.pathname.startsWith('/browse');

  const handleSelectBrowse = (event: MouseEvent<HTMLElement>) => {
    if (window.innerWidth < 1119 && window.location.pathname === '/') {
      toast.warn('Warning: BariBuilder Shop is not optimized for small screens. Consider using a desktop/laptop computer.', {
        autoClose: 10000,
      });
    }
    generateTrackNavClick('Browse nav')();
    setSecondaryMenuAnchorEl(event.currentTarget);
  };

  const handleSelectGoals = () => {
    if (window.innerWidth < 1119 && window.location.pathname === '/') {
      toast.warn('Warning: BariBuilder Shop is not optimized for small screens. Consider using a desktop/laptop computer.', {
        autoClose: 10000,
      });
    }
    generateTrackNavClick('Goals nav')();
    setMainMenuAnchorEl(null);
    history.push('/goals');
  };

  const handleSelectAbout = () => {
    generateTrackNavClick('About nav')();
    setMainMenuAnchorEl(null);
    history.push('/about');
  };

  const generateHandleSelectNav = (path: string) => () => {
    generateTrackNavClick(`${path} nav`)();
    setMainMenuAnchorEl(null);
    history.push(path);
  };

  const handleFacebookClick = () => {
    generateTrackNavClick('Facebook group')();
    window.open('https://www.facebook.com/groups/671563826519599/', '_blank');
  };

  const handleBlogClick = () => {
    generateTrackNavClick('Blog nav')();
    setMainMenuAnchorEl(null);
    history.push('https://baribuilder.com/blog');
  };

  const browseOptions = [
    <MenuItem key='all-products' onClick={generateHandleSelectNav('/browse/all_products')}>All Products</MenuItem>,
    <MenuItem key='bypass' onClick={generateHandleSelectNav('/bypass')}>Bypass (RNY)</MenuItem>,
    <MenuItem key='sleeve' onClick={generateHandleSelectNav('/sleeve')}>Sleeve (VSG)</MenuItem>
  ];

  return (
    <GridWithRaisedBackground container>
      <FullHeightGrid item xs={6} lg={3} md={4}>
        <UndecoratedLink to='/' onClick={generateTrackNavClick('Header image')}>
          <PaddedImg src={fixedWidthImage(logoImgSrc, '400px')} alt='BariBuilder Logo'/>
        </UndecoratedLink>
      </FullHeightGrid>
      <Hidden mdDown>
        <Grid item lg={3} container alignItems='center'>
          <SearchBox key={searchQuery ? searchQuery.value : ''}/>
        </Grid>
      </Hidden>
      <NavigationGrid item xs={6} md={8} lg={6} container alignItems='center' justify='flex-end' spacing={16}>
        <Grid item>
          {showCheckout // spacing doesn't work well with the addition of checkout
            ? null
            : <FbIconImg
              src={FbSmallIcon}
              onClick={handleFacebookClick}
            />
          }
        </Grid>
        <Hidden mdDown>
          {showCheckout
            ? (
              <Grid item>
                <UndecoratedLink to='/purchase' onClick={generateTrackNavClick('Checkout nav')}>
                  <Button color='primary' variant='contained'>Checkout</Button>
                </UndecoratedLink>
              </Grid>
            )
            : null
          }
          <Grid item>
            <UndecoratedLink to='/about' onClick={handleSelectAbout}>
              <WhiteNavButton fullWidth>
                About
              </WhiteNavButton>
            </UndecoratedLink>
          </Grid>
          <Grid item>
            <UndecoratedAnchor href='https://baribuilder.com/blog' onClick={handleBlogClick}>
              <WhiteNavButton fullWidth>
                Blog
              </WhiteNavButton>
            </UndecoratedAnchor>
          </Grid>
          <Grid item>
            <WhiteNavButton fullWidth onClick={handleSelectBrowse}>
              Browse
            </WhiteNavButton>
          </Grid>
          <Menu
            anchorEl={secondaryMenuAnchorEl}
            open={Boolean(secondaryMenuAnchorEl)}
            onClose={() => setSecondaryMenuAnchorEl(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            {browseOptions}
          </Menu>
          <Grid item>
            <UndecoratedLink to='/goals' onClick={handleSelectGoals}>
              <WhiteNavButton fullWidth>
                Goals
              </WhiteNavButton>
            </UndecoratedLink>
          </Grid>
        </Hidden>
        <Hidden lgUp>
          <Grid item>
            <MobileNavIconImg
              src={MenuBarsIcon}
              onClick={event => setMainMenuAnchorEl(event.currentTarget)}
            />
            <Menu
              anchorEl={mainMenuAnchorEl}
              open={Boolean(mainMenuAnchorEl)}
              onClose={() => setMainMenuAnchorEl(null)}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
            >
              <MenuItem onClick={handleSelectBrowse}>Browse</MenuItem>
              <MenuItem onClick={handleSelectGoals}>Goals</MenuItem>
              <MenuItem onClick={handleBlogClick}>Blog</MenuItem>
              <MenuItem onClick={handleSelectAbout}>About</MenuItem>
            </Menu>
            <Menu
              anchorEl={secondaryMenuAnchorEl}
              open={Boolean(secondaryMenuAnchorEl)}
              onClose={() => setSecondaryMenuAnchorEl(null)}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              {browseOptions}
            </Menu>
          </Grid>
        </Hidden>
      </NavigationGrid>
    </GridWithRaisedBackground>
  )
};

const withData = graphql<{}, GetSearchQuery>(SEARCH_QUERY_QUERY);

const enhance = compose<QueryOutputProps & RouteComponentProps, {}>(
  withState<{}, HTMLElement | null, 'mainMenuAnchorEl', 'setMainMenuAnchorEl'>(
    'mainMenuAnchorEl',
    'setMainMenuAnchorEl',
    null,
  ),
  withState<{}, HTMLElement | null, 'secondaryMenuAnchorEl', 'setSecondaryMenuAnchorEl'>(
    'secondaryMenuAnchorEl',
    'setSecondaryMenuAnchorEl',
    null,
  ),
  withData,
  withRouter,
);

export default enhance(NavbarPure);
