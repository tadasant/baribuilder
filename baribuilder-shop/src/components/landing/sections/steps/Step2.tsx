import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import * as React from 'react';
import {Fragment} from 'react';
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

const instructionCopy = <span>You'll see options sorted by <u>real</u> cost to <u>you</u>.</span>;
const subInstructionCopy = <span>BariBuilder Shop does the math for you: no need for looking at prices, pill counts, or line by line ingredients.<br/><br/>It's all factored into the "<b>cost effectiveness rating</b>"</span>;

// Desktop vs. tablet/mobile arrangements are very different
const Step2 = () => (
  <Fragment>
    {/* Mobile & Tablet */}
    <Hidden lgUp>
      <Hidden only='xs'>
        <Grid item sm={1}/>
      </Hidden>
      <Grid item xs={12} sm={10} container>
        <Grid item xs={2}>
          <StepOval value='2'/>
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
          src={imagekitURLs.step2}
          srcSet={`${fixedWidthImage(imagekitURLs.step2, 360)} 360w,
                      ${fixedWidthImage(imagekitURLs.step2, 600)} 600w`}
          sizes={`(min-width: ${Sketch.breakpoints.tablet}px) 600px, 360px`}
          alt='Step 2: Sorted Products'
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
          <StepOval value='2'/>
        </Grid>
      </Grid>
      <Grid item lg={4} container>
        <Grid item lg={12}>
          <LeftAlignHeader2 dark>{instructionCopy}</LeftAlignHeader2>
          <EmptyRow desktop='20px'/>
          <Grid item lg={12}>
            <CenteredBody dark>{subInstructionCopy}</CenteredBody>
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={1}/>
      <Grid item lg={4}>
        <FullWidthImg
          src={fixedWidthImage(imagekitURLs.step2, 600)}
          alt='Step 2: See Your Product Results Image'
        />
      </Grid>
      <Grid item lg={1}/>
    </Hidden>
  </Fragment>
);

export default Step2;