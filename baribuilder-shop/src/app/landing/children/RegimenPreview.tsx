import {Button, Grid, Hidden} from '@material-ui/core';
import * as React from 'react';
import {Fragment, FunctionComponent} from 'react';
import {UndecoratedAnchor} from '../../../components/footer/ContactInformationPanel';
import {CenteredTextGrid, EmptyRow} from '../../../components/style/Layout';
import {Body, Header} from '../../../components/style/Typography';
import {trackButtonClick} from '../../../lib/analytics';
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
        <UndecoratedAnchor href={`${window.location.origin}${props.pathname}`} target='_blank' rel='noopener'>
          <Header dark onClick={trackButtonClick('View Shared Products (via Header)', props.pathname)}><u>{props.name}</u> Regimen</Header>
        </UndecoratedAnchor>
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
          <UndecoratedAnchor href={`${window.location.origin}${props.pathname}`} target='_blank' rel='noopener'>
            <Button variant='contained' fullWidth color='secondary'
                    onClick={trackButtonClick('View Shared Products', props.pathname)}>View Products</Button>
          </UndecoratedAnchor>
        </Grid>
        <Grid item xs={4} lg={1}/>
      </Fragment>
    </Grid>
  )
};

export default RegimenPreview;
