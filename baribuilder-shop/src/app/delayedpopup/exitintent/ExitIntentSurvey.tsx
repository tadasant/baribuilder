import {Button, Grid} from '@material-ui/core';
import * as React from 'react';
import {FunctionComponent} from 'react';
import AmazonImage from '../../../assets/amazon-gift-card.svg';
import {UndecoratedAnchor} from '../../../components/footer/ContactInformationPanel';
import {CenteredTextGrid, EmptyRow} from '../../../components/style/Layout';
import {Body, Header} from '../../../components/style/Typography';
import {trackPopupAction} from '../../../lib/analytics';
import {TYPEFORM_URL} from '../withDelayedPopupModal';
import {
  DelayedPopupContainerDiv,
  DelayedPopupDiv,
  DismissSubcaption,
  GiftCardImg,
  StickyBottomDiv,
  VPaddedGrid
} from './ExitIntentSurvey.style';
import SurveyTypeForm from './SurveyTypeform';

interface IProps {
  onSuccess: () => void;
  onDismiss: () => void;
}

const ExitIntentSurvey: FunctionComponent<IProps> = props => {
  const handleDismiss = () => {
    trackPopupAction('Just dismissed');
    props.onDismiss();
  };

  const handleOpenAndDismiss = () => {
    trackPopupAction('Opened tab');
    props.onSuccess();
  };

  return (
    <DelayedPopupContainerDiv tabIndex={-1}>
      <DelayedPopupDiv>
        <Grid container>
          <CenteredTextGrid item xs={12}>
            <Header dark>Before you leave...</Header>
          </CenteredTextGrid>
          <EmptyRow/>
          <CenteredTextGrid item xs={12}>
            <GiftCardImg src={AmazonImage} alt='Amazon Gift Card'/>
          </CenteredTextGrid>
          <EmptyRow/>
          <CenteredTextGrid item xs={12}>
            <Body dark>Fill out the 10-second survey below to enter our drawing for a <b>$50 Amazon Gift
              Card</b></Body>
          </CenteredTextGrid>
          <Grid item xs={12}>
            <SurveyTypeForm/>
          </Grid>
        </Grid>
      </DelayedPopupDiv>
      <StickyBottomDiv>
        <VPaddedGrid container>
          <Grid item xs={3}/>
          <CenteredTextGrid item xs={6}>
            <UndecoratedAnchor href={TYPEFORM_URL} rel='noopener nofollow' target='_blank'>
              <Button variant='contained' fullWidth onClick={handleOpenAndDismiss}>Open in tab & dismiss popup</Button>
            </UndecoratedAnchor>
          </CenteredTextGrid>
          <Grid item xs={3}/>
        </VPaddedGrid>
        <Grid container>
          <Grid item xs={3}/>
          <CenteredTextGrid item xs={6}>
            <DismissSubcaption dark onClick={handleDismiss}>Dismiss popup</DismissSubcaption>
          </CenteredTextGrid>
          <Grid item xs={3}/>
        </Grid>
      </StickyBottomDiv>
    </DelayedPopupContainerDiv>
  );
};

export default ExitIntentSurvey;
