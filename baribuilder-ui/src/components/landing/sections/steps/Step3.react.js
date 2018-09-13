import React, {Fragment} from 'react';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import StepOval from './StepOval.react';
import {EmptyRow} from '../../../style/Layout.react';
import styled from 'styled-components';
import {Body, Header2} from '../../../style/Typography.react';
import OptionPill from './OptionPill.react';
import Sketch from '../../../../app/style/SketchVariables';

const LeftAlignHeader2 = styled(Header2)`
  text-align: left;
`;

const CenteredBody = styled(Body)`
  text-align: center; 
`;

const FullWidthImg = styled.img`
  width: 100%;
`;

const instructionCopy = 'Filter out things you don\'t want in one sweep.';
const subInstructionCopy = 'Filters include, but aren\'t limited to:';
const optionsCopy = [
  'Form (chewable, capsule, etc.)',
  'Flavors',
  'Brands',
];

// Desktop vs. tablet/mobile arrangements are very different
const Step3 = () => (
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
      <EmptyRow mobile='15px'/>
      <Hidden only='xs'>
        <Grid item sm={1} />
      </Hidden>
      <Grid item xs={12} sm={10}>
        <FullWidthImg
          src='https://ik.imagekit.io/vitaglab/step-3-use-filters_ByBVnWqUX.png'
          srcSet='https://ik.imagekit.io/vitaglab/tr:w-360/step-3-use-filters_ByBVnWqUX.png 360w,
                      https://ik.imagekit.io/vitaglab/tr:w-600/step-3-use-filters_ByBVnWqUX.png 600w'
          sizes={`(min-width: ${Sketch.breakpoints.tablet}px) 600px, 360px`}
          alt='Step 3: Apply Filters As Desired Image'
        />
      </Grid>
      <Hidden only='xs'>
        <Grid item sm={1} />
      </Hidden>
      <Fragment>
        <Grid item xs={1} sm={2} />
        <Grid item xs={10} sm={8} container justify='center'>
          <EmptyRow mobile='20px'/>
          <Grid item lg={12}>
            <CenteredBody dark>{subInstructionCopy}</CenteredBody>
          </Grid>
          <Grid item xs={12}>
            <OptionPill value={optionsCopy[0]} />
            <OptionPill value={optionsCopy[1]} />
          </Grid>
        </Grid>
        <Grid item xs={1} sm={2} />
      </Fragment>
    </Hidden>
    {/* Desktop */}
    <Hidden mdDown>
      <Grid item lg={1} />
      <Grid item lg={1} container>
        <Grid item lg={12}>
          <StepOval value='3'/>
        </Grid>
      </Grid>
      <Grid item lg={4} container>
        <Grid item lg={12}>
          <LeftAlignHeader2 dark>{instructionCopy}</LeftAlignHeader2>
          <EmptyRow desktop='30px'/>
          <CenteredBody dark>{subInstructionCopy}</CenteredBody>
          <OptionPill value={optionsCopy[0]} />
          <OptionPill value={optionsCopy[1]} />
        </Grid>
      </Grid>
      <Grid item lg={1} />
      <Grid item lg={4}>
        <FullWidthImg
          src='https://ik.imagekit.io/vitaglab/step-3-use-filters_ByBVnWqUX.png'
          alt='Step 3: Apply Filters As Desired Image'
        />
      </Grid>
      <Grid item lg={1} />
    </Hidden>
  </Fragment>
);

export default Step3;