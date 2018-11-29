import {Modal} from '@material-ui/core';
import * as React from 'react';
import {Component, ComponentType, Fragment, SFC, SyntheticEvent} from 'react';
import {ExitIntentDiv} from './ExitIntent.style';

// Number of miliseconds from component mount that the modal should display
const MS_UNTIL_POPUP = 1000;

interface IProps {
  onSuccess: () => void
}

const ExitIntentSurvey: SFC<IProps> = props => {
  return (
    <ExitIntentDiv />
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
    // if (reason !== 'backdropClick') {
      this.setState({showModal: false});
      // TODO set localStorage s.t. last time we unsuccessfully tried was at X time [requires adding a 'don't show again' box]
      // defaulting to not show again
      // TODO set localStorage s.t. we won't show again
    // }
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
