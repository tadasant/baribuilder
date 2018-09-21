import * as React from 'react';
import {Component} from 'react';
import BuilderPure from './BuilderPure';

interface IState {
  disableHeader: boolean;
}

class BuilderContainer extends Component<{}, Readonly<IState>> {
  constructor(props: {}) {
    super(props);
    this.state = {
      disableHeader: false,
    };
    this.setDisableHeader = this.setDisableHeader.bind(this);
  }

  setDisableHeader(disableHeader: boolean) {
    this.setState({disableHeader});
  }

  render() {
    return (
      <BuilderPure
        disableHeader={this.state.disableHeader}
        setDisableHeader={this.setDisableHeader}
      />
    );
  }
}

export default BuilderContainer;
