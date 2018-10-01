import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import styled from 'styled-components';
import {generateTrackExternalLinkClick} from '../lib/gaHelper';
import Sketch from './../app/style/SketchVariables';
import {CenteredTextGrid} from './goals/GoalsScreenPure';
import {media} from './style/Core';
import {EmptyRow} from './style/Layout';
import {Caption, Subcaption} from './style/Typography';

export const BlackGrid = styled(Grid)`
  background-color: ${Sketch.color.accent.black};
`;

const DisclaimerCaption = styled(Caption)`
  font-size: 9px;
  text-align: left;
  
  ${media.tablet`
    font-size: 11px;
  `}
`;

interface IProps {
  disclaimerText?: string;
}

const Footer: SFC<IProps> = props => {
  return (
    <BlackGrid item container direction='row'>
      <EmptyRow mobile='5px'/>
      <Grid item xs={1} sm={2}/>
      <Grid item container xs={10} sm={8}>
        {props.disclaimerText
          ? (
            <CenteredTextGrid item xs={12}>
              <DisclaimerCaption>{props.disclaimerText}</DisclaimerCaption>
            </CenteredTextGrid>
          )
          : null
        }
        <EmptyRow mobile='5px'/>
        <Grid item container direction='row'>
          <Hidden only='xs'>
            <Grid item sm={9} container>
              <a href='https://vitaglab.com/' target='_blank' rel='noopener noreferrer'>
                <img
                  src='https://ik.imagekit.io/vitaglab/tr:w-128/vita.g-logo-white-horizontal_BkBw3d_UX.png'
                  alt='Vita.G Logo'
                />
              </a>
              <EmptyRow tablet='1px'/>
              <Subcaption>© Vita.G, LLC 2018</Subcaption>
            </Grid>
            <CenteredTextGrid item sm={3} container>
              <Grid item sm={12}>
                <a href='mailto:feedback@vitaglab.com'
                   onClick={generateTrackExternalLinkClick('footer email')}><Subcaption>feedback@vitaglab.com</Subcaption></a>
              </Grid>
              <Grid item sm={4} container alignItems='flex-start' justify='center'>
                <a href='https://www.facebook.com/vitaglab/' target='_blank' rel='noopener noreferrer'
                   onClick={generateTrackExternalLinkClick('footer facebook')}>
                  <img
                    src='https://ik.imagekit.io/vitaglab/tr:w-32/facebook_HkCI3udUm.png'
                    alt='Facebook Logo'
                  />
                </a>
              </Grid>
              <Grid item sm={4} container alignItems='flex-start' justify='center'>
                <a href='https://vitaglab.com/' target='_blank' rel='noopener noreferrer'
                   onClick={generateTrackExternalLinkClick('footer web')}>
                  <img
                    src='https://ik.imagekit.io/vitaglab/tr:w-32/web_H1x0U3uOU7.png'
                    alt='Web Logo'
                  />
                </a>
              </Grid>
              <Grid item sm={4} container alignItems='flex-start' justify='center'
                    onClick={generateTrackExternalLinkClick('footer linkedin')}>
                <a href='https://www.linkedin.com/company/vita-g-llc' target='_blank' rel='noopener noreferrer'>
                  <img
                    src='https://ik.imagekit.io/vitaglab/tr:w-32/linkedin_S108hOdL7.png'
                    alt='LinkedIn Logo'
                  />
                </a>
              </Grid>
            </CenteredTextGrid>
          </Hidden>
          <Hidden smUp>
            <CenteredTextGrid item xs={12}>
              <a href='mailto:feedback@vitaglab.com'
                 onClick={generateTrackExternalLinkClick('footer email')}><Subcaption>feedback@vitaglab.com</Subcaption></a>
            </CenteredTextGrid>
            <EmptyRow mobile='1px'/>
            <Fragment>
              <Grid item xs={3}/>
              <Grid item xs={6} container direction='row'>
                <Grid item xs={4} container alignItems='flex-start' justify='center'>
                  <a href='https://www.facebook.com/vitaglab/' target='_blank' rel='noopener noreferrer'
                     onClick={generateTrackExternalLinkClick('footer facebook')}>
                    <img
                      src='https://ik.imagekit.io/vitaglab/tr:w-32/facebook_HkCI3udUm.png'
                      alt='Facebook Logo'
                    />
                  </a>
                </Grid>
                <Grid item xs={4} container alignItems='flex-start' justify='center'>
                  <a href='https://vitaglab.com/' target='_blank' rel='noopener noreferrer'
                     onClick={generateTrackExternalLinkClick('footer web')}>
                    <img
                      src='https://ik.imagekit.io/vitaglab/tr:w-32/web_H1x0U3uOU7.png'
                      alt='Web Logo'
                    />
                  </a>
                </Grid>
                <Grid item xs={4} container alignItems='flex-start' justify='center'>
                  <a href='https://www.linkedin.com/company/vita-g-llc' target='_blank' rel='noopener noreferrer'
                     onClick={generateTrackExternalLinkClick('footer linkedin')}>
                    <img
                      src='https://ik.imagekit.io/vitaglab/tr:w-32/linkedin_S108hOdL7.png'
                      alt='LinkedIn Logo'
                    />
                  </a>
                </Grid>
              </Grid>
              <Grid item xs={3}/>
            </Fragment>
            <EmptyRow mobile='10px'/>
            <Grid item xs={12} container alignItems='flex-start' justify='center'>
              <a href='https://vitaglab.com/' target='_blank' rel='noopener noreferrer'
                 onClick={generateTrackExternalLinkClick('footer web')}>
                <img
                  src='https://ik.imagekit.io/vitaglab/tr:w-128/vita.g-logo-white-horizontal_BkBw3d_UX.png'
                  alt='Vita.G Logo'
                />
              </a>
            </Grid>
            <EmptyRow mobile='1px'/>
            <CenteredTextGrid item xs={12}>
              <Subcaption>© Vita.G, LLC 2018</Subcaption>
            </CenteredTextGrid>
          </Hidden>
        </Grid>
      </Grid>
      <Grid item xs={1} sm={2}/>
      <EmptyRow mobile='5px'/>
    </BlackGrid>
  );
};

export default Footer;
