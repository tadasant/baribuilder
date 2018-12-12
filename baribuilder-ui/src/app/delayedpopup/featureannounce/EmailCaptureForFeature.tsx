import {Grid} from '@material-ui/core';
import * as React from 'react';
import {FunctionComponent} from 'react';
import {CenteredTextGrid, EmptyRow} from '../../../components/style/Layout';
import {BoldBody, Caption, Subcaption} from '../../../components/style/Typography';
import MailchimpEmailForm from '../common/MailchimpEmailForm';
import {DelayedPopupContainerDiv, DelayedPopupDiv} from './EmailCaptureForFeature.style';

interface IProps {
  onSubmit: () => void;
}

const EmailCapture: FunctionComponent<IProps> = props => {
  return (
    <DelayedPopupContainerDiv tabIndex={-1}>
      <DelayedPopupDiv>
        <Grid container>
          <CenteredTextGrid item xs={12}>
            <BoldBody dark>Please enter your email for the BariBuilder mailing list to continue reading.</BoldBody>
          </CenteredTextGrid>
          <EmptyRow/>
          <Grid item xs={12} container>
            <MailchimpEmailForm onSubmit={props.onSubmit}/>
            <Grid item xs={1} md={2}/>
            <CenteredTextGrid item xs={10} md={8}>
              <Caption dark>
                This popup will dismiss after you have verified your email. You are free to unusubscribe at any time.
              </Caption>
            </CenteredTextGrid>
            <Grid item xs={1} md={2}/>
          </Grid>
          <EmptyRow/>
          <Grid item xs={12}>
            <Subcaption dark>
              <u>Why are we asking for your email?</u><br/><br/>
              We're working on BariBuilder, a free web application. We rarely send emails: only when we have a major
              announcement or send out opportunities to provide feedback - sometimes we'll offer an Amazon Gift Card in
              return.
            </Subcaption>
          </Grid>
        </Grid>
      </DelayedPopupDiv>
    </DelayedPopupContainerDiv>
  );
};

export default EmailCapture;
