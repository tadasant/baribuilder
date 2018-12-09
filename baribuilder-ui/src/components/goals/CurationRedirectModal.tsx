import {Button, Grid, Hidden, Modal} from '@material-ui/core';
import * as React from 'react';
import {FunctionComponent} from 'react';
import {RouteComponentProps, withRouter} from 'react-router';
import {CenteredTextGrid, EmptyRow} from '../style/Layout';
import {BoldBody} from '../style/Typography';
import {ButtonGrid, CurationRedirectContainerDiv, CurationRedirectDiv} from './CurationRedirectModal.style';
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
          <Grid container>
            <Grid item xs={1}/>
            <CenteredTextGrid item xs={10}>
              <BoldBody dark>
                You've chosen the <b>{props.template}</b> template.<br/><br/>
                We've prepared some fully-prepared suggested regimens for this template. Would you like to build your
                own regimen from scratch, or view the prepared suggestions?
              </BoldBody>
            </CenteredTextGrid>
            <Grid item xs={1}/>
            <EmptyRow/>
            <Hidden smDown>
              <Grid item md={2}/>
            </Hidden>
            <ButtonGrid item md={4} xs={12}>
              <Button variant='contained' onClick={handleProceed} fullWidth>Build from scratch</Button>
            </ButtonGrid>
            <ButtonGrid item md={4} xs={12}>
              <Button variant='contained' color='primary' onClick={handleSeeCuration} fullWidth>Jump to
                suggestions</Button>
            </ButtonGrid>
            <Hidden smDown>
              <Grid item md={2}/>
            </Hidden>
          </Grid>
        </CurationRedirectDiv>
      </CurationRedirectContainerDiv>
    </Modal>
  )
};

export default withRouter(CurationRedirectModal);
