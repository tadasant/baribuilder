import {Hidden, Menu, MenuItem} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import * as React from 'react';
import {SFC} from 'react';
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
  anchorEl: HTMLElement | null;
  setAnchorEl: (el: HTMLElement | null) => HTMLElement | null;
}

const NavbarPure: SFC<RouteComponentProps & QueryOutputProps & IPropsState> = ({location, history, data: {searchQuery}, anchorEl, setAnchorEl}) => {
  const showCheckout = location.pathname.startsWith('/browse');

  const handleSelectBrowse = () => {
    if (window.innerWidth < 1119 && window.location.pathname === '/') {
      toast.warn('Warning: BariBuilder is not optimized for small screens. Consider using a desktop/laptop computer.', {
        autoClose: 10000,
      });
    }
    generateTrackNavClick('Browse nav')();
    setAnchorEl(null);
    history.push('/browse/all_products');
  };

  const handleSelectGoals = () => {
    if (window.innerWidth < 1119 && window.location.pathname === '/') {
      toast.warn('Warning: BariBuilder is not optimized for small screens. Consider using a desktop/laptop computer.', {
        autoClose: 10000,
      });
    }
    generateTrackNavClick('Goals nav')();
    setAnchorEl(null);
    history.push('/goals');
  };

  const handleSelectAbout = () => {
    generateTrackNavClick('About nav')();
    setAnchorEl(null);
    history.push('/about');
  };

  const handleFacebookClick = () => {
    generateTrackNavClick('Facebook group')();
    window.open('https://www.facebook.com/groups/671563826519599/', '_blank');
  };

  const handleBlogClick = () => {
    generateTrackNavClick('BariBuilder Blog')();
  };

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
            <UndecoratedAnchor href='https://blog.baribuilder.com/' onClick={handleBlogClick}>
              <WhiteNavButton fullWidth>
                Blog
              </WhiteNavButton>
            </UndecoratedAnchor>
          </Grid>
          <Grid item>
            <UndecoratedLink to='/browse/all_products' onClick={handleSelectBrowse}>
              <WhiteNavButton fullWidth>
                Browse
              </WhiteNavButton>
            </UndecoratedLink>
          </Grid>
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
              onClick={event => setAnchorEl(event.currentTarget)}
            />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
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
          </Grid>
        </Hidden>
      </NavigationGrid>
    </GridWithRaisedBackground>
  )
};

const withData = graphql<{}, GetSearchQuery>(SEARCH_QUERY_QUERY);

const enhance = compose<QueryOutputProps & RouteComponentProps, {}>(
  withState<{}, HTMLElement | null, 'anchorEl', 'setAnchorEl'>(
    'anchorEl',
    'setAnchorEl',
    null,
  ),
  withData,
  withRouter,
);

export default enhance(NavbarPure);
