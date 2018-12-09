import {Button, Modal} from '@material-ui/core';
import * as React from 'react';
import {FunctionComponent} from 'react';
import {RouteComponentProps, withRouter} from 'react-router';
import {CurationRedirectContainerDiv, CurationRedirectDiv} from './CurationRedirectModal.style';
import {BYPASS_TEMPLATE_NAME} from './templates/GastricBypassASMBS';
import {SLEEVE_TEMPLATE_NAME} from './templates/GastricSleeveASMBS';

interface IProps {
  template?: string
  show?: boolean
  onProceed: () => void
  onClose: () => void
}

const CurationRedirectModal: FunctionComponent<IProps & RouteComponentProps> = props => {
  const handleProceed = () => {
    props.onProceed();
  };

  const handleSeeCuration = () => {
    if (props.template === SLEEVE_TEMPLATE_NAME) {
      props.history.push('/sleeve');
    } else if (props.template === BYPASS_TEMPLATE_NAME) {
      props.history.push('/bypass');
    }
  };

  return (
    <Modal open={Boolean(props.show)} onClose={props.onClose}>
      <CurationRedirectContainerDiv tabIndex={-1}>
        <CurationRedirectDiv>
          <Button variant='contained' onClick={handleProceed}>Proceed</Button>
          <Button variant='contained' onClick={handleSeeCuration}>See Curation</Button>
        </CurationRedirectDiv>
      </CurationRedirectContainerDiv>
    </Modal>
  )
};

export default withRouter(CurationRedirectModal);
