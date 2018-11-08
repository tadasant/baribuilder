import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import React, {Fragment} from 'react';
import styled from 'styled-components';
import Sketch from '../../../../app/style/SketchVariables';
import {CenteredTextGrid, EmptyRow} from '../../../style/Layout';
import {Header, Header2} from '../../../style/Typography';
import StepOval from './StepOval.react';

const LeftAlignHeader2 = styled(Header2)`
  text-align: left;
`;

const FullWidthImg = styled.img`
  width: 100%;
`;

const instructionCopy = 'Be confident you\'ve found the regimen best for';

// Desktop vs. tablet/mobile arrangements are very different
const Step4 = () => (
  <Fragment>
    {/* Mobile & Tablet */}
    <Hidden lgUp>
      <Hidden only='xs'>
        <Grid item sm={1}/>
      </Hidden>
      <Grid item xs={12} sm={10} container>
        <Grid item xs={2}>
          <StepOval value='4'/>
        </Grid>
        <Grid item xs={9}>
          <LeftAlignHeader2 dark>{instructionCopy}</LeftAlignHeader2>
        </Grid>
        <Grid item xs={1}/>
        <EmptyRow mobile='1px'/>
        <CenteredTextGrid item xs={12}>
          <Header dark>YOU.</Header>
        </CenteredTextGrid>
      </Grid>
      <Hidden only='xs'>
        <Grid item sm={1}/>
      </Hidden>
      <EmptyRow mobile='5px'/>
      <Hidden only='xs'>
        <Grid item sm={1}/>
      </Hidden>
      <Grid item xs={12} sm={10}>
        <FullWidthImg
          src='https://ik.imagekit.io/vitaglab/step-4-checkout_HJ_2BruIQ.png'
          srcSet='https://ik.imagekit.io/vitaglab/tr:w-360/step-4-checkout_HJ_2BruIQ.png 360w,
                      https://ik.imagekit.io/vitaglab/tr:w-600/step-4-checkout_HJ_2BruIQ.png 600w'
          sizes={`(min-width: ${Sketch.breakpoints.tablet}px) 600px, 360px`}
          alt='Step 4: Checkout Image'
        />
      </Grid>
      <Hidden only='xs'>
        <Grid item sm={1}/>
      </Hidden>
    </Hidden>
    {/* Desktop */}
    <Hidden mdDown>
      <Grid item lg={1}/>
      <Grid item lg={1} container>
        <Grid item lg={12}>
          <StepOval value='4'/>
        </Grid>
      </Grid>
      <Grid item lg={4} container>
        <Grid item lg={12}>
          <LeftAlignHeader2 dark>{instructionCopy}</LeftAlignHeader2>
          <EmptyRow desktop='1px'/>
        </Grid>
        <CenteredTextGrid item lg={12}>
          <Header dark>YOU.</Header>
        </CenteredTextGrid>
      </Grid>
      <Grid item lg={1}/>
      <Grid item lg={4}>
        <FullWidthImg
          src='https://ik.imagekit.io/vitaglab/tr:w-600/step-4-checkout_HJ_2BruIQ.png'
          alt='Step 4: Checkout Image'
        />
      </Grid>
      <Grid item lg={1}/>
    </Hidden>
  </Fragment>
);

export default Step4;