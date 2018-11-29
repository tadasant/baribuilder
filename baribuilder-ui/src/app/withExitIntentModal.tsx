import * as React from 'react';
import {ComponentType, Fragment, SFC} from 'react';
import {compose, lifecycle} from 'recompose';


const enhance = compose<{}, {}>(
  lifecycle({
    componentDidMount() {
      console.log('did mount hoc');
    }
  }),
);

const ExitIntentModal: SFC = () => {
  return (
    <div>Modal goes here</div>
  );
};

const withExitIntentModal = (WrappedComponent: ComponentType) => {
  const Modal = enhance(ExitIntentModal);
  return (props: any) => (
    <Fragment>
      <Modal/>
      <WrappedComponent {...props} />
    </Fragment>
  );
};

export default withExitIntentModal;
