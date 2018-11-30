import {Button, Grid, Hidden} from '@material-ui/core';
import * as React from 'react';
import {Fragment, FunctionComponent} from 'react';
import {UndecoratedLink} from '../../../components/style/CustomMaterial';
import {CenteredTextGrid, EmptyRow} from '../../../components/style/Layout';
import {Body, Header} from '../../../components/style/Typography';
import Sketch from '../../style/SketchVariables';
import {ColoredSpan} from '../Landing.style';
import {RegimenPreviewHeaderGrid} from './Guidelines.style';

// props.children should be the regimen facts sheet
interface IProps {
  name: string
  numUnits: number
  unitsColor?: 'red' | 'green'
  unitsName: string
  numProducts: number
  productsColor?: 'red' | 'green'
  cost: number
  costColor?: 'red' | 'green'
  pathname: string
}

const RegimenPreview: FunctionComponent<IProps> = props => {
  return (
    <Grid container alignItems='center'>
      <RegimenPreviewHeaderGrid item xs={12}>
        <UndecoratedLink to={props.pathname}>
          <Header dark><u>{props.name}</u> Regimen</Header>
        </UndecoratedLink>
      </RegimenPreviewHeaderGrid>
      <EmptyRow/>
      <CenteredTextGrid item xs={12} lg={4}>
        <Body dark>
        <ColoredSpan color={props.unitsColor || Sketch.color.accent.black}>
          <b>{props.numUnits}</b>
        </ColoredSpan>
        &nbsp;{props.unitsName} per day
        </Body>
        <br/>
        <Body dark>
        <ColoredSpan color={props.productsColor || Sketch.color.accent.black}>
          <b>{props.numProducts}</b>
        </ColoredSpan>
        &nbsp;products
        </Body>
        <br/>
        <Body dark>
        <ColoredSpan color={props.costColor || Sketch.color.accent.black}>
          <b>${props.cost}</b>
        </ColoredSpan>
        &nbsp;per month
        </Body>
      </CenteredTextGrid>
      <Hidden lgUp>
        <EmptyRow/>
      </Hidden>
      <Grid item xs={12} lg={4}>
        {props.children}
      </Grid>
      <Hidden lgUp>
        <EmptyRow/>
      </Hidden>
      <Fragment>
        <Grid item xs={4} lg={1}/>
        <Grid item xs={4} lg={2}>
          <UndecoratedLink to={props.pathname}>
            <Button variant='contained' fullWidth color='secondary'>View Products</Button>
          </UndecoratedLink>
        </Grid>
        <Grid item xs={4} lg={1}/>
      </Fragment>
    </Grid>
  )
};

export default RegimenPreview;
