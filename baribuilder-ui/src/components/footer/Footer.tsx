import Grid from '@material-ui/core/Grid';
import * as React from 'react';
import {SFC} from 'react';
import {CenteredTextGrid, EmptyRow} from '../style/Layout';
import {DisclaimerCaption, FooterContainerGrid} from './Footer.style';
import SignupForm from './SignupForm';

interface IProps {
  disclaimerText?: string;
}

const Footer: SFC<IProps> = props => {
  return (
    <FooterContainerGrid item container>
      <EmptyRow/>
      <Grid item xs={1}/>
      <Grid item container xs={10}>
        <EmptyRow/>
        {props.disclaimerText
          ? (
            <CenteredTextGrid item xs={12}>
              <DisclaimerCaption>{props.disclaimerText}</DisclaimerCaption>
            </CenteredTextGrid>
          )
          : null
        }
        <SignupForm/>
      </Grid>
      <Grid item xs={1}/>
      <EmptyRow/>
    </FooterContainerGrid>
  );
};

export default Footer;
