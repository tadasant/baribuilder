import * as React from 'react';
import {Fragment, SFC} from 'react';
import {withState} from 'recompose';
import Header from '../Header';

const enhance = withState<{}, {}, 'disableHeader', 'setDisableHeader'>(
  'disableHeader',
  'setDisableHeader',
  false
);

interface IProps {
  disableHeader: boolean;
  setDisableHeader: () => boolean;
}

const PureBuilder: SFC<IProps> = ({disableHeader}) => {
  return (
    <Fragment>
      <Header disableButtons={disableHeader} hideNavigation />
      {/*<ProductSelection/>*/}
    </Fragment>
  );
};

export default enhance(PureBuilder);
