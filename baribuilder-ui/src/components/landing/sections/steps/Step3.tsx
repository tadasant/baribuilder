import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import styled from 'styled-components';
import Sketch from '../../../../app/style/SketchVariables';
import {fixedWidthImage, imagekitURLs} from '../../../../constants/images';
import {CenteredTextGrid, EmptyRow} from '../../../style/Layout';
import {Body, Header2} from '../../../style/Typography';
import StepOval from './StepOval';

const LeftAlignHeader2 = styled(Header2)`
  text-align: left; 
`;

const CenteredBody = styled(Body)`
  text-align: center; 
`;

const FullWidthImg = styled.img`
  width: 100%;
`;

const instructionCopy = 'Build your regimen, piece by piece.';
const subInstructionCopy = <span>BariBuilder generates a personalized "<b>My Regimen Facts</b>" sheet as you make changes.</span>;

// Desktop vs. tablet/mobile arrangements are very different
const Step3: SFC = () => (
  <Fragment>
    {/* Mobile & Tablet */}
    <Hidden lgUp>
      <Hidden only='xs'>
        <Grid item sm={1}/>
      </Hidden>
      <Grid item xs={12} sm={10} container>
        <Grid item xs={2}>
          <StepOval value='3'/>
        </Grid>
        <Grid item xs={9}>
          <LeftAlignHeader2 dark>{instructionCopy}</LeftAlignHeader2>
        </Grid>
        <Grid item xs={1}/>
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
          src={imagekitURLs.step3}
          srcSet={`${fixedWidthImage(imagekitURLs.step3, 360)} 360w,
                      ${fixedWidthImage(imagekitURLs.step3, 600)} 600w`}
          sizes={`(min-width: ${Sketch.breakpoints.tablet}px) 600px, 360px`}
          alt='Step 3: Build Regimen Piece by Piece'
        />
      </Grid>
      <Hidden only='xs'>
        <Grid item sm={1}/>
      </Hidden>
      <Fragment>
        <Grid item xs={1} sm={2}/>
        <Grid item xs={10} sm={8} container justify='center'>
          <EmptyRow mobile='10px'/>
          <CenteredTextGrid item xs={12}>
            <CenteredBody dark>{subInstructionCopy}</CenteredBody>
          </CenteredTextGrid>
        </Grid>
        <Grid item xs={1} sm={2}/>
      </Fragment>
    </Hidden>
    {/* Desktop */}
    <Hidden mdDown>
      <Grid item lg={1}/>
      <Grid item lg={1} container>
        <Grid item lg={12}>
          <StepOval value='3'/>
        </Grid>
      </Grid>
      <Grid item lg={4} container>
        <Grid item lg={12}>
          <LeftAlignHeader2 dark>{instructionCopy}</LeftAlignHeader2>
          <EmptyRow desktop='20px'/>
          <EmptyRow mobile='10px'/>
          <Grid item lg={12}>
            <CenteredBody dark>{subInstructionCopy}</CenteredBody>
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={1}/>
      <Grid item lg={4}>
        <FullWidthImg
          src={fixedWidthImage(imagekitURLs.step3, 600)}
          alt='Step 3: Build Regimen Piece by Piece'
        />
      </Grid>
      <Grid item lg={1}/>
    </Hidden>
  </Fragment>
);

export default Step3;