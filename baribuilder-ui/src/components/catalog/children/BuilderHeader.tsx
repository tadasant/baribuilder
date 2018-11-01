import {Button, Grid} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import {fade} from '@material-ui/core/styles/colorManipulator';
import {upperFirst} from 'lodash';
import * as React from 'react';
import {SFC} from 'react';
import {RouteComponentProps, withRouter} from 'react-router';
import styled from 'styled-components';
import Sketch from '../../../app/style/SketchVariables';
import {GetCatalogProducts_allClientCatalogProducts} from '../../../typings/gql/GetCatalogProducts';
import {ShadowedSelect} from '../../style/CustomMaterial';
import {Body} from '../../style/Typography';
import {SORTING_STRATEGY} from '../CatalogScreen';
import {SetBuilderStateFunction} from '../CatalogScreenPure';

export const builderHeaderHeight = '48px';

interface IProps {
  setShowMyProducts: SetBuilderStateFunction;
  showMyProducts: boolean;
  setShowMyRegimen: SetBuilderStateFunction;
  showMyRegimen: boolean;
  isMyRegimenOnRight: boolean;
  selectedCategory: string;
  sortingStrategy: SORTING_STRATEGY;
  filteredClientCatalogProducts: GetCatalogProducts_allClientCatalogProducts[];
  goalsSet: boolean;
}

const FixedGrid = styled(Grid)`
  && {
    height: ${builderHeaderHeight};
    border-bottom: 1px solid ${Sketch.color.accent.grey};
  }
`;

const PaddedCaptionSizedBody = styled(Body)`
  font-size: ${Sketch.typography.caption.fontSize};
  margin-left: 10px;
  margin-right: 10px;
`;

const NavTabGrid = styled(Grid)`
  && {
    height: 100%;
    box-shadow: -2px 0px 4px 0px ${Sketch.color.accent.grey};
  }
`;

const NavTabButton = styled(Button)`
  && {
    height: 100%;
    background-color: ${Sketch.color.secondary.blue};
    color: ${Sketch.color.accent.white};
    border-radius: 0px;
    text-transform: unset;
    
    :hover {
      background-color: ${fade(Sketch.color.secondary.blue, .8)};
    }
  }
`;

const NavTabButtonActive = styled(NavTabButton)`
  && {
    background-color: white;
    color: ${Sketch.color.accent.black};
    
    :hover {
      background-color: ${fade(Sketch.color.accent.grey, .8)};
    }
  }
`;

const ShadowedSelectWithPadding = styled(ShadowedSelect)`
  && {
    margin-left: 8px;
  }
`;

const RightPaddedGrid = styled(Grid)`
  && {
    padding-right: 16px;
  }
`;

const sortStrategyDisplayByEnum: { [x in SORTING_STRATEGY]: string } = {
  [SORTING_STRATEGY.COST_ASC]: 'Cost (low to high)',
  [SORTING_STRATEGY.COST_EFFECTIVENESS_DESC]: 'Cost effectiveness (high to low)',
};

const BuilderHeaderPure: SFC<IProps & RouteComponentProps> = props => {
  const {filteredClientCatalogProducts, showMyProducts, showMyRegimen, isMyRegimenOnRight, location} = props;
  const pathnameTokens = location.pathname.split('/');
  const selectedCategory = pathnameTokens[pathnameTokens.length - 1].toUpperCase();

  const productCount = filteredClientCatalogProducts ? filteredClientCatalogProducts.length : undefined;

  let sortColumnCount: 2 | 3 | 4 | 5 = 5; // !showMyProducts && !showMyRegimen
  if (showMyProducts && !showMyRegimen) {
    sortColumnCount = 4;
  } else if (showMyProducts && showMyRegimen) {
    sortColumnCount = 2;
  } else if (!showMyProducts && showMyRegimen) {
    sortColumnCount = 3;
  }

  return (
    <FixedGrid container direction='row'>
      <Grid item lg={3} container alignItems='center'>
        <Grid item>
          <PaddedCaptionSizedBody dark>
            Showing{productCount ? ` ${productCount} ` : ' '}results in&nbsp;
            <b>{selectedCategory.split('_').map(c => upperFirst(c.toLowerCase())).join(' ')}</b>
          </PaddedCaptionSizedBody>
        </Grid>
      </Grid>
      <RightPaddedGrid item lg={sortColumnCount} container alignItems='center' justify='flex-end'>
        <Grid item>
          {/* TODO replace w/ enum, ability to change */}
          <ShadowedSelectWithPadding value={props.sortingStrategy}>
            {
              Object.keys(SORTING_STRATEGY).map(key => (
                <MenuItem
                  value={SORTING_STRATEGY[key]}
                  key={SORTING_STRATEGY[key]}>
                  {sortStrategyDisplayByEnum[SORTING_STRATEGY[key]]}
                </MenuItem>
              ))
            }
          </ShadowedSelectWithPadding>
        </Grid>
      </RightPaddedGrid>
      {isMyRegimenOnRight ? null : <MyRegimenTabHeader {...props}/>}
      <MyProductsTabHeader {...props} style={{zIndex: isMyRegimenOnRight ? 0 : 1}}/>
      {isMyRegimenOnRight ? <MyRegimenTabHeader {...props} style={{zIndex: 1}}/> : null}
    </FixedGrid>
  )
};

// TODO remove ugly style hack
const MyProductsTabHeader: SFC<IProps & { style?: any }> = ({setShowMyProducts, showMyProducts, style}) => {
  const handleMyProductsClick = () => setShowMyProducts(!showMyProducts);
  if (showMyProducts) {
    return (
      <NavTabGrid item lg={3} style={style}>
        <NavTabButtonActive fullWidth onClick={handleMyProductsClick}>My Products</NavTabButtonActive>
      </NavTabGrid>
    );
  }
  return (
    <NavTabGrid item lg={2} style={style}>
      <NavTabButton fullWidth onClick={handleMyProductsClick}>My Products</NavTabButton>
    </NavTabGrid>
  );
};

// TODO remove ugly style hack
const MyRegimenTabHeader: SFC<IProps & { style?: any }> = ({setShowMyRegimen, showMyRegimen, style}) => {
  const handleMyRegimenClick = () => setShowMyRegimen(!showMyRegimen);
  if (showMyRegimen) {
    return (
      <NavTabGrid item lg={4} style={style}>
        <NavTabButtonActive fullWidth onClick={handleMyRegimenClick}>My Regimen</NavTabButtonActive>
      </NavTabGrid>
    );
  }
  return (
    <NavTabGrid item lg={2} style={style}>
      <NavTabButton fullWidth onClick={handleMyRegimenClick}>My Regimen</NavTabButton>
    </NavTabGrid>
  );
};

export default withRouter(BuilderHeaderPure);
