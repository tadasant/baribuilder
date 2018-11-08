import {Button, Grid} from '@material-ui/core';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import styled from 'styled-components';
import Sketch from '../../../app/style/SketchVariables';
import {UndecoratedLink} from '../../style/CustomMaterial';
import {EmptyRow} from '../../style/Layout';
import CurrentRegimenCost from './myRegimen/CurrentRegimenCost';
import RegimenFacts from './myRegimen/RegimenFacts';

interface IProps {
  hideButtons?: boolean;
}

export const tabFooterHeight = '4em';

const OuterGrid = styled(Grid)`
  && {
    padding-top: 16px;
    padding-bottom: 16px;
    height: calc(100vh - ${tabFooterHeight});
    overflow-y: scroll;
  }
`;

const BottomBorderedGrid = styled(Grid)`
  border-bottom: 1px solid ${Sketch.color.accent.grey};
`;

export const ButtonFooter = styled.div`
  box-shadow: 0px -2px 4px 0px ${Sketch.color.accent.grey};
  height: ${tabFooterHeight};
  position: sticky;
  bottom: 0;
  width: 100%;
  background-color: ${Sketch.color.background.white};
`;

export const ButtonFooterGrid = styled(Grid)`
  && {
    height: 100%;
  }
`;

const WideLink = styled(UndecoratedLink)`
  && {
    width: 100%;
  }
`;

export const NoMarginGrid = styled(Grid)`
  && {
    margin: 0;
  }
`;

export const HPaddedGrid = styled(Grid)`
  && {
    padding: 0px 8px 0px 8px;
  }
`;

const MyRegimenPanel: SFC<IProps> = (props) => {
  return (
    <Fragment>
      <OuterGrid container>
        <Grid item xs={1}/>
        <Grid item xs={10} container alignContent='flex-start'>
          <Grid item xs={12}>
            <CurrentRegimenCost/>
          </Grid>
          <EmptyRow/>
          <BottomBorderedGrid item xs={12}/>
          <EmptyRow/>
          <Grid item container xs={12}>
            <RegimenFacts/>
          </Grid>
        </Grid>
        <Grid item xs={1}/>
        <EmptyRow mobile={`calc(${tabFooterHeight} * 1.5)`}/> {/* Hack for spacing UX */}
      </OuterGrid>
      {props.hideButtons
        ? null
        : (
          <ButtonFooter>
            <ButtonFooterGrid item xs={12} container direction='column' justify='center'>
              <NoMarginGrid item container>
                <HPaddedGrid item xs={6}>
                  <WideLink to='/purchase'>
                    <Button variant='contained' color='primary' fullWidth>
                      Checkout
                    </Button>
                  </WideLink>
                </HPaddedGrid>
                <HPaddedGrid item xs={6}>
                  <WideLink to='/goals'>
                    <Button variant='contained' color='secondary' fullWidth>
                      Edit Goals
                    </Button>
                  </WideLink>
                </HPaddedGrid>
              </NoMarginGrid>
            </ButtonFooterGrid>
          </ButtonFooter>
        )}
    </Fragment>
  )
};

export default MyRegimenPanel;
