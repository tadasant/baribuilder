import {Grid} from '@material-ui/core';
import * as React from 'react';
import {FunctionComponent} from 'react';
import {CenteredTextGrid, EmptyRow} from '../../../components/style/Layout';
import {Body, BoldBody, Caption} from '../../../components/style/Typography';
import MailchimpEmailForm from '../common/MailchimpEmailForm';
import {DelayedPopupContainerDiv, DelayedPopupDiv, XButtonSpan} from './EmailCaptureForFeature.style';

interface IProps {
  onSubmit: () => void
  onClose: () => void
}

const EmailCapture: FunctionComponent<IProps> = props => {
  return (
    <DelayedPopupContainerDiv tabIndex={-1}>
      <XButtonSpan onClick={props.onClose}>X</XButtonSpan>
      <DelayedPopupDiv>
        <Grid container>
          <CenteredTextGrid item xs={12}>
            <BoldBody dark>We're working on a new feature: <u>Price Alerts</u>.</BoldBody>
          </CenteredTextGrid>
          <EmptyRow/>
          <Grid item xs={12}>
            Image goes here
            {/*<FeatureImg />*/}
          </Grid>
          <EmptyRow/>
          <Grid item xs={12}>
            <Body dark>Enter your info below so that you'll get an email when the feature is live.</Body>
          </Grid>
          <EmptyRow/>
          <Grid item xs={12} container>
            <MailchimpEmailForm onSubmit={props.onSubmit}/>
          </Grid>
          <EmptyRow/>
          <Grid item xs={12}>
            <Caption dark>We send at most 1-2 emails per month. You can unsubscribe at any time.</Caption>
          </Grid>
        </Grid>
      </DelayedPopupDiv>
    </DelayedPopupContainerDiv>
  );
};

export default EmailCapture;
