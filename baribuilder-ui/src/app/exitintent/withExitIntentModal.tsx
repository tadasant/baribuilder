import {Button, Grid, Modal} from '@material-ui/core';
import * as React from 'react';
import {Component, ComponentType, Fragment, SFC, SyntheticEvent} from 'react';
import AmazonImage from '../../assets/amazon-gift-card.svg';
import {CenteredTextGrid, EmptyRow} from '../../components/style/Layout';
import {Body, Header, Subcaption} from '../../components/style/Typography';
import {ExitIntentContainerDiv, ExitIntentDiv, GiftCardImg, StickyBottomDiv, VPaddedGrid} from './ExitIntent.style';
import SurveyTypeForm from './SurveyTypeform';

// Number of miliseconds from component mount that the modal should display
const MS_UNTIL_POPUP = 100;

interface IProps {
  onSuccess: () => void
}

const ExitIntentSurvey: SFC<IProps> = props => {
  return (
    <ExitIntentContainerDiv tabIndex={-1}>
      <ExitIntentDiv>
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
            <Body dark>Fill out the 10-second survey below to enter our drawing for a <b>$20 Amazon Gift
              Card</b></Body>
          </CenteredTextGrid>
          <Grid item xs={12}>
            <SurveyTypeForm/>
          </Grid>
        </Grid>
      </ExitIntentDiv>
      <StickyBottomDiv>
        <VPaddedGrid container>
          <Grid item xs={3}/>
          <CenteredTextGrid item xs={6}>
            <Button variant='contained' fullWidth>Open in tab & dismiss popup</Button>
          </CenteredTextGrid>
          <Grid item xs={3}/>
        </VPaddedGrid>
        <Grid container>
          <Grid item xs={3}/>
          <CenteredTextGrid item xs={6}>
            <Subcaption dark><u>Dismiss popup</u></Subcaption>
          </CenteredTextGrid>
          <Grid item xs={3}/>
        </Grid>
      </StickyBottomDiv>
    </ExitIntentContainerDiv>
  );
};

interface IState {
  showModal: boolean;
}

class ExitIntentModalContainer extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      showModal: false
    };
    this.tryDisplayingModal = this.tryDisplayingModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSuccessModal = this.handleSuccessModal.bind(this);
  }

  componentDidMount() {
    setTimeout(this.tryDisplayingModal, MS_UNTIL_POPUP);
  }

  tryDisplayingModal() {
    // logic for potentially not displaying (localStorage-based)
    this.setState({showModal: true});
  }

  handleCloseModal(event: SyntheticEvent<{}>) {
    this.setState({showModal: false});
    // TODO set localStorage s.t. last time we unsuccessfully tried was at X time [requires adding a 'don't show again' box]
    // defaulting to not show again
    // TODO set localStorage s.t. we won't show again
  }

  handleSuccessModal() {
    this.setState({showModal: false});
    // TODO set localStorage s.t. we won't show again
  }

  render() {
    return (
      <Fragment>
        <Modal
          open={this.state.showModal}
          onClose={this.handleCloseModal}
          disableBackdropClick
        >
          <ExitIntentSurvey onSuccess={this.handleSuccessModal}/>
        </Modal>
      </Fragment>
    );
  }
}

const withExitIntentModal = (WrappedComponent: ComponentType) => {
  return (props: any) => (
    <Fragment>
      <ExitIntentModalContainer/>
      <WrappedComponent {...props} />
    </Fragment>
  );
};

export default withExitIntentModal;
