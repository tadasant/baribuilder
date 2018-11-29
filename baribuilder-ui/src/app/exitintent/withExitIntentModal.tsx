import {Grid, Modal} from '@material-ui/core';
import * as React from 'react';
import {Component, ComponentType, Fragment, SFC, SyntheticEvent} from 'react';
import {CenteredTextGrid, EmptyRow} from '../../components/style/Layout';
import {Body, Header} from '../../components/style/Typography';
import {ExitIntentContainerDiv, ExitIntentDiv, StickyBottomDiv} from './ExitIntent.style';

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
        </Grid>
        <EmptyRow/>
        <Grid container>
          <CenteredTextGrid item xs={12}>
            Amazon image
          </CenteredTextGrid>
        </Grid>
        <EmptyRow/>
        <Grid container>
          <CenteredTextGrid item xs={12}>
            <Body dark>Fill out this quick 2 question survey to enter our drawing for a <b>$20 Amazon Gift
              Card</b></Body>
          </CenteredTextGrid>
        </Grid>
      </ExitIntentDiv>
      <StickyBottomDiv>
        Dismiss <br/>
        Open questions in new tab to finish later
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
