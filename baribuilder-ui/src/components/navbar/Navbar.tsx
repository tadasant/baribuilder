import {Hidden} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import * as React from 'react';
import {SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {RouteComponentProps, withRouter} from 'react-router';
import {compose} from 'recompose';
import styled from 'styled-components';
import Sketch from '../../app/style/SketchVariables';
import {generateTrackNavClick} from '../../lib/gaHelper';
import {fixedWidthImage} from '../../lib/imageKitHelpers';
import {GetSearchQuery} from '../../typings/gql/GetSearchQuery';
import {SEARCH_QUERY_QUERY} from '../catalog/queries';
import {UndecoratedLink} from '../style/CustomMaterial';
import SearchBox from './SearchBox';

const logoImgSrc = 'https://ik.imagekit.io/vitaglab/baribuilder-logo-beta-white_ry91QeWtQ.png';
export const navbarHeight = '64px';

type QueryOutputProps = ChildDataProps<{}, GetSearchQuery>;

const data = graphql<{}, GetSearchQuery>(SEARCH_QUERY_QUERY);

const enhance = compose<QueryOutputProps & RouteComponentProps, {}>(
  data,
  withRouter,
);

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

const NavbarPure: SFC<RouteComponentProps & QueryOutputProps> = ({location, data: {searchQuery}}) => {
  const showCheckout = location.pathname.startsWith('/browse');
  return (
    <GridWithRaisedBackground container>
      <FullHeightGrid item xs={6} lg={3}>
        <UndecoratedLink to='/' onClick={generateTrackNavClick('Header image')}>
          <PaddedImg src={fixedWidthImage(logoImgSrc, '400px')} alt='BariBuilder Logo'/>
        </UndecoratedLink>
      </FullHeightGrid>
      <Hidden mdDown>
        <Grid item lg={3} container alignItems='center'>
          <SearchBox key={searchQuery ? searchQuery.value : ''}/>
        </Grid>
      </Hidden>
      <Grid item xs={6} container alignItems='center' justify='flex-end'>
        {showCheckout
          ? (
            <Grid item>
              <UndecoratedLink to='/purchase'>
                <Button color='primary' variant='raised'>Checkout</Button>
              </UndecoratedLink>
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
          <UndecoratedLink to='/goals' onClick={generateTrackNavClick('Goals nav')}>
            <WhiteNavButton fullWidth>
              Goals
            </WhiteNavButton>
          </UndecoratedLink>
        </Grid>
      </Grid>

    </GridWithRaisedBackground>
  )
};

export default enhance(NavbarPure);
