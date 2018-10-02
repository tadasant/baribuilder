import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import styled from 'styled-components';
import GraphcoolLogo from '../assets/graphcool-logo.svg';
import {generateTrackExternalLinkClick, generateTrackNavClick} from '../lib/gaHelper';
import Sketch from './../app/style/SketchVariables';
import {CenteredTextGrid} from './goals/GoalsScreenPure';
import {media} from './style/Core';
import {UndecoratedLink} from './style/CustomMaterial';
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

const RightAlignTextGrid = styled(Grid)`
  text-align: right;
`;

const WhiteUndecoratedLink = styled(UndecoratedLink)`
  color: ${Sketch.color.accent.white};
`;

const WhiteUndecoratedAnchor = styled.a`
  color: ${Sketch.color.accent.white};
  text-decoration: unset;
`;

const CreditBannerImg = styled.img`
  height: 32px;
`;

interface IProps {
  disclaimerText?: string;
}

const Footer: SFC<IProps> = props => {
  return (
    <BlackGrid item container direction='row'>
      <EmptyRow mobile='5px'/>
      <Grid item xs={1}/>
      <Grid item container xs={10}>
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
              <Subcaption>© Vita.G, LLC 2018 |&nbsp;</Subcaption>
              <Subcaption>
                <WhiteUndecoratedAnchor href='https://www.iubenda.com/privacy-policy/25172832'
                                        target='_blank'
                                        rel='noopener noreferrer nofollow'
                                        onClick={generateTrackExternalLinkClick('footer privacy policy')}>
                  Privacy Policy
                </WhiteUndecoratedAnchor>
                &nbsp;|&nbsp;
              </Subcaption>
              <Subcaption>
                <WhiteUndecoratedLink to='/terms-and-conditions' onClick={generateTrackNavClick('footer t&c')}>
                  Terms & Conditions
                </WhiteUndecoratedLink>
              </Subcaption>
            </Grid>
            <CenteredTextGrid item sm={3} container>
              <Grid item sm={12}>
                <a href='mailto:feedback@vitaglab.com'
                   onClick={generateTrackExternalLinkClick('footer email')}><Subcaption>feedback@vitaglab.com</Subcaption></a>
              </Grid>
              <EmptyRow/>
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
              <EmptyRow/>
              <Grid item sm={12} lg={6}>
                <CreditBannerImg src={GraphcoolLogo}/>
              </Grid>
              <CenteredTextGrid item sm={12} lg={6}>
                <Subcaption>Icons by <WhiteUndecoratedAnchor href='https://fontawesome.com/license' target='_blank'
                                                             rel='noopener noreferrer nofollow'><u>Font
                  Awesome</u></WhiteUndecoratedAnchor></Subcaption>
              </CenteredTextGrid>
            </CenteredTextGrid>
          </Hidden>
          <Hidden smUp>
            <Fragment>
              <Grid item xs={1}/>
              <Grid item xs={5}>
                <Subcaption>
                  <WhiteUndecoratedAnchor href='https://www.iubenda.com/privacy-policy/25172832'
                                          target='_blank'
                                          rel='noopener noreferrer nofollow'
                                          onClick={generateTrackExternalLinkClick('footer privacy policy')}>
                    Privacy Policy
                  </WhiteUndecoratedAnchor>
                </Subcaption>
              </Grid>
              <RightAlignTextGrid item xs={5}>
                <Subcaption>
                  <WhiteUndecoratedLink to='/terms-and-conditions' onClick={generateTrackNavClick('footer t&c')}>
                    Terms & Conditions
                  </WhiteUndecoratedLink>
                </Subcaption>
              </RightAlignTextGrid>
              <Grid item xs={1}/>
            </Fragment>
            <EmptyRow/>
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
                <EmptyRow/>
                <CenteredTextGrid item xs={12}>
                  <CreditBannerImg src={GraphcoolLogo}/>
                </CenteredTextGrid>
                <EmptyRow/>
                <CenteredTextGrid item xs={12}>
                  <Subcaption>Icons by <WhiteUndecoratedAnchor target='_blank'
                                                               rel='noopener noreferrer nofollow'
                                                               href='https://fontawesome.com/license'><u>Font
                    Awesome</u></WhiteUndecoratedAnchor></Subcaption>
                </CenteredTextGrid>
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
      <Grid item xs={1}/>
      <EmptyRow mobile='5px'/>
    </BlackGrid>
  );
};

export default Footer;
