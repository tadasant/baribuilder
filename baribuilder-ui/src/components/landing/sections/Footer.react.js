import React, {Component, Fragment} from 'react';
import {CenteredTextGrid} from '../../goals/GoalsScreenPure';
import {Caption, Subcaption} from '../../style/Typography';
import Grid from '@material-ui/core/Grid';
import Sketch from '../../../app/style/SketchVariables';
import styled from 'styled-components';
import {EmptyRow} from '../../style/Layout';
import {media} from '../../style/Core';
import Hidden from '@material-ui/core/Hidden';
import ReactGA from 'react-ga';

const BlackGrid = styled(Grid)`
  background-color: ${Sketch.color.accent.black};
`;

const DisclaimerCaption = styled(Caption)`
  font-size: 9px;
  text-align: left;
  
  ${media.tablet`
    font-size: 11px;
  `}
`;

const citationText = '* Expected prices listed on BariBuilder match those found on popular retail websites ' +
  '(e.g. Amazon.com). In the example above, prices are current as of 10:50AM EST, 8/18/18 on Amazon.com. They ' +
  'reflect a desired regimen of  90mg of vitamin C, 3mg of vitamin B2, 20mg of vitamin B3, 4mg of vitamin B6, ' +
  '800mcg of folic acid, 15g of zinc, and 1mg of copper.';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.generateHandleLinkClick = this.generateHandleLinkClick.bind(this);
  }

  generateHandleLinkClick(name) {
    return () => {
      ReactGA.event({
        category: 'Outbound Link',
        action: 'click',
        label: `${name} click`
      });
    };
  }

  render() {
    return (
      <BlackGrid item container direction='row'>
        <EmptyRow mobile='115px' tablet='140px'/>
        <Grid item xs={1} sm={2}/>
        <Grid item container xs={10} sm={8}>
          <Grid item xs={12}>
            <DisclaimerCaption>{citationText}</DisclaimerCaption>
          </Grid>
          <EmptyRow mobile='5px' tablet='40px'/>
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
                  <a href='mailto:feedback@vitaglab.com' onClick={this.generateHandleLinkClick('email')}><Subcaption>feedback@vitaglab.com</Subcaption></a>
                </Grid>
                <Grid item sm={4} container alignItems='flex-start' justify='center'>
                  <a href='https://www.facebook.com/vitaglab/' target='_blank' rel='noopener noreferrer' onClick={this.generateHandleLinkClick('facebook')}>
                    <img
                      src='https://ik.imagekit.io/vitaglab/tr:w-32/facebook_HkCI3udUm.png'
                      alt='Facebook Logo'
                    />
                  </a>
                </Grid>
                <Grid item sm={4} container alignItems='flex-start' justify='center'>
                  <a href='https://vitaglab.com/' target='_blank' rel='noopener noreferrer' onClick={this.generateHandleLinkClick('web')}>
                    <img
                      src='https://ik.imagekit.io/vitaglab/tr:w-32/web_H1x0U3uOU7.png'
                      alt='Web Logo'
                    />
                  </a>
                </Grid>
                <Grid item sm={4} container alignItems='flex-start' justify='center' onClick={this.generateHandleLinkClick('linkedin')}>
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
                <a href='mailto:feedback@vitaglab.com' onClick={this.generateHandleLinkClick('email')}><Subcaption>feedback@vitaglab.com</Subcaption></a>
              </CenteredTextGrid>
              <EmptyRow mobile='1px'/>
              <Fragment>
                <Grid item xs={3}/>
                <Grid item xs={6} container direction='row'>
                  <Grid item xs={4} container alignItems='flex-start' justify='center'>
                    <a href='https://www.facebook.com/vitaglab/' target='_blank' rel='noopener noreferrer' onClick={this.generateHandleLinkClick('facebook')}>
                      <img
                        src='https://ik.imagekit.io/vitaglab/tr:w-32/facebook_HkCI3udUm.png'
                        alt='Facebook Logo'
                      />
                    </a>
                  </Grid>
                  <Grid item xs={4} container alignItems='flex-start' justify='center'>
                    <a href='https://vitaglab.com/' target='_blank' rel='noopener noreferrer' onClick={this.generateHandleLinkClick('web')}>
                      <img
                        src='https://ik.imagekit.io/vitaglab/tr:w-32/web_H1x0U3uOU7.png'
                        alt='Web Logo'
                      />
                    </a>
                  </Grid>
                  <Grid item xs={4} container alignItems='flex-start' justify='center'>
                    <a href='https://www.linkedin.com/company/vita-g-llc' target='_blank' rel='noopener noreferrer' onClick={this.generateHandleLinkClick('linkedin')}>
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
                <a href='https://vitaglab.com/' target='_blank' rel='noopener noreferrer' onClick={this.generateHandleLinkClick('web')}>
                  <img
                    src='https://ik.imagekit.io/vitaglab/tr:w-128/vita.g-logo-white-horizontal_BkBw3d_UX.png'
                    alt='Vita.G Logo'
                  />
                </a>
              </Grid>
              <EmptyRow mobile='1px'/>
              <Grid item xs={12}>
                <Subcaption>© Vita.G, LLC 2018</Subcaption>
              </Grid>
            </Hidden>
          </Grid>
        </Grid>
        <Grid item xs={1} sm={2}/>
        <EmptyRow mobile='5px' tablet='40px'/>
      </BlackGrid>
    );
  }
}

export default Footer;
