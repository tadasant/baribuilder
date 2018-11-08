import React, {Fragment} from 'react';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import StepOval from './StepOval.react';
import {CenteredTextGrid, EmptyRow} from '../../../style/Layout';
import styled from 'styled-components';
import {Body, Header2} from '../../../style/Typography';
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

const instructionCopy = <span>You'll see <u>all</u> the possible product combinations that fit your needs.</span>;
const subInstructionCopy = 'You can sort them by:';
const optionsCopy = [
  'Cost per day',
  'Servings (e.g. tablets) per day',
  'Our surgery-specific templates',
];

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
        <Grid item sm={1} />
      </Hidden>
      <Grid item xs={12} sm={10}>
        <FullWidthImg
          src='https://ik.imagekit.io/vitaglab/step-2-see-results_SJVrLVO87.png'
          srcSet='https://ik.imagekit.io/vitaglab/tr:w-360/step-2-see-results_SJVrLVO87.png 360w,
                      https://ik.imagekit.io/vitaglab/tr:w-600/step-2-see-results_SJVrLVO87.png 600w'
          sizes={`(min-width: ${Sketch.breakpoints.tablet}px) 600px, 360px`}
          alt='Step 2: See Your Product Results Image'
        />
      </Grid>
      <Hidden only='xs'>
        <Grid item sm={1} />
      </Hidden>
      <Fragment>
        <Grid item xs={1} sm={2} />
        <Grid item xs={10} sm={8} container justify='center'>
          <EmptyRow mobile='10px'/>
          <CenteredTextGrid item xs={12}>
            <CenteredBody dark>{subInstructionCopy}</CenteredBody>
          </CenteredTextGrid>
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
          <StepOval value='2'/>
        </Grid>
      </Grid>
      <Grid item lg={4} container>
        <Grid item lg={12}>
          <LeftAlignHeader2 dark>{instructionCopy}</LeftAlignHeader2>
          <EmptyRow desktop='20px'/>
          <CenteredTextGrid item lg={12}>
            <CenteredBody dark>{subInstructionCopy}</CenteredBody>
          </CenteredTextGrid>
          <Grid item xs={12}>
            <OptionPill value={optionsCopy[0]} />
            <OptionPill value={optionsCopy[1]} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={1} />
      <Grid item lg={4}>
        <FullWidthImg
          src='https://ik.imagekit.io/vitaglab/tr:w-600/step-2-see-results_SJVrLVO87.png'
          alt='Step 2: See Your Product Results Image'
        />
      </Grid>
      <Grid item lg={1} />
    </Hidden>
  </Fragment>
);

export default Step2;