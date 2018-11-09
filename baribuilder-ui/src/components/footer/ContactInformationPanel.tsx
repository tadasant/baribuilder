import {Grid} from '@material-ui/core';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import {generateTrackExternalLinkClick} from '../../lib/analytics';
import {CenteredTextGrid} from '../style/Layout';
import {Caption} from '../style/Typography';

const ContactInformationPanel: SFC = () => (
  <Fragment>
    <CenteredTextGrid item xs={12} container direction='column' alignContent='center' spacing={16}>
      <CenteredTextGrid item>
        <a href='https://vitaglab.com/' target='_blank' rel='noopener noreferrer'>
          <img
            src='https://ik.imagekit.io/vitaglab/tr:w-128/vita.g-logo-white-horizontal_BkBw3d_UX.png'
            alt='Vita.G Logo'
          />
        </a>
      </CenteredTextGrid>
      <Grid item container justify='center' spacing={16}>
        <Grid item>
          <a href='https://www.facebook.com/vitaglab/' target='_blank' rel='noopener noreferrer'
             onClick={generateTrackExternalLinkClick('footer facebook')}>
            <img
              src='https://ik.imagekit.io/vitaglab/tr:w-32/facebook_HkCI3udUm.png'
              alt='Facebook Logo'
            />
          </a>
        </Grid>
        <Grid item>
          <a href='https://vitaglab.com/' target='_blank' rel='noopener noreferrer'
             onClick={generateTrackExternalLinkClick('footer web')}>
            <img
              src='https://ik.imagekit.io/vitaglab/tr:w-32/web_H1x0U3uOU7.png'
              alt='Web Logo'
            />
          </a>
        </Grid>
        <Grid item>
          <a href='https://www.linkedin.com/company/vita-g-llc' target='_blank' rel='noopener noreferrer'>
            <img
              src='https://ik.imagekit.io/vitaglab/tr:w-32/linkedin_S108hOdL7.png'
              alt='LinkedIn Logo'
            />
          </a>
        </Grid>
      </Grid>
      <CenteredTextGrid item>
        <Caption>feedback@baribuilder.com</Caption>
      </CenteredTextGrid>
      <CenteredTextGrid item>
        <Caption>© Vita.G, LLC 2018</Caption>
      </CenteredTextGrid>
    </CenteredTextGrid>
  </Fragment>
);

export default ContactInformationPanel;
