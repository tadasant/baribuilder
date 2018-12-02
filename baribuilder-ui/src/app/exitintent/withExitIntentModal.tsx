import {Modal} from '@material-ui/core';
import * as React from 'react';
import {Component, ComponentType, Fragment} from 'react';
import {trackPopupAction} from '../../lib/analytics';
import {getLocalStorage, setLocalStorage} from '../../lib/localStorage';

// Number of miliseconds from component mount that the modal should display
const MS_UNTIL_POPUP = 10000;
export const TYPEFORM_URL = 'https://vitagllc.typeform.com/to/JeKegc';

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
    if (getLocalStorage('enableShowModal') && !getLocalStorage('dontShowModalAgain')) {
      trackPopupAction('show');
      this.setState({showModal: true});
    }
  }

  handleCloseModal() {
    this.setState({showModal: false});
    // TODO set localStorage s.t. last time we unsuccessfully tried was at X time [requires adding a 'don't show again' box]
    // Also consider adding "minimize"
    // defaulting to not show again
    setLocalStorage('dontShowModalAgain', true);
  }

  handleSuccessModal() {
    this.setState({showModal: false});
    setLocalStorage('dontShowModalAgain', true);
  }

  render() {
    return (
      <Fragment>
        <Modal
          open={this.state.showModal}
          onClose={this.handleCloseModal}
          disableBackdropClick
          disableEscapeKeyDown
        >
          {/*<ExitIntentSurvey onDismiss={this.handleCloseModal} onSuccess={this.handleSuccessModal}/>*/}
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
