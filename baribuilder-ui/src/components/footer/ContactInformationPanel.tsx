import {Grid, Hidden} from '@material-ui/core';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import {Caption} from '../style/Typography';
import {ContactInformationTextGrid} from './Footer.style';
import SocialMediaIcons from './SocialMediaIcons';

const ContactInformationPanel: SFC = () => (
  <Fragment>
    <ContactInformationTextGrid item xs={12} container direction='column' alignContent='center' spacing={16}>
      <ContactInformationTextGrid item>
        <a href='https://vitaglab.com/' target='_blank' rel='noopener noreferrer'>
          <img
            src='https://ik.imagekit.io/vitaglab/tr:w-128/vita.g-logo-white-horizontal_BkBw3d_UX.png'
            alt='Vita.G Logo'
          />
        </a>
      </ContactInformationTextGrid>
      <Hidden mdUp>
        <Grid item container justify='center' spacing={16}>
          <SocialMediaIcons/>
        </Grid>
      </Hidden>
      <Hidden smDown>
        <Grid item container justify='flex-end' spacing={16}>
          <SocialMediaIcons/>
        </Grid>
      </Hidden>
      <ContactInformationTextGrid item>
        <Caption>feedback@baribuilder.com</Caption>
      </ContactInformationTextGrid>
      <ContactInformationTextGrid item>
        <Caption>© Vita.G, LLC 2018</Caption>
      </ContactInformationTextGrid>
    </ContactInformationTextGrid>
  </Fragment>
);

export default ContactInformationPanel;
