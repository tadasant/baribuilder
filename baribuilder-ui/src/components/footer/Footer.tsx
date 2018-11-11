import {Hidden} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import {CenteredTextGrid, EmptyRow} from '../style/Layout';
import ContactInformationPanel from './ContactInformationPanel';
import {DisclaimerCaption} from './Footer.style';
import SignupForm from './SignupForm';

interface IProps {
  disclaimerText?: string;
}

const Footer: SFC<IProps> = props => {
  return (
    <Fragment>
      <EmptyRow/>
      {props.disclaimerText
        ?
        <Fragment>
          <Grid item xs={1}/>
          <Grid item container xs={10}>
            <EmptyRow/>
            <CenteredTextGrid item xs={12}>
              <DisclaimerCaption>{props.disclaimerText}</DisclaimerCaption>
            </CenteredTextGrid>
          </Grid>
          <Grid item xs={1}/>
          <EmptyRow/>
        </Fragment>
        : null
      }
      <Grid item xs={1}/>
      <Hidden mdUp>
        <Grid item xs={10} container>
          <SignupForm/>
          <EmptyRow mobile='20px' tablet='50px'/>
          <ContactInformationPanel/>
        </Grid>
      </Hidden>
      <Hidden smDown>
        <Grid item md={5} container>
          <SignupForm/>
        </Grid>
        <Grid item md={5} container>
          <ContactInformationPanel/>
        </Grid>
      </Hidden>
      <Grid item xs={1}/>
      <EmptyRow tablet='25px'/>
    </Fragment>
  );
};


export default Footer;
