import * as React from 'react';
import {Component} from 'react';
import BuilderPure from './BuilderPure';

interface IState {
  disableHeader: boolean;
  showMyProducts: boolean;
}

class BuilderContainer extends Component<{}, Readonly<IState>> {
  constructor(props: {}) {
    super(props);
    this.state = {
      disableHeader: false,
      showMyProducts: false,
    };
    this.setDisableHeader = this.setDisableHeader.bind(this);
    this.setShowMyProducts = this.setShowMyProducts.bind(this);
  }

  setDisableHeader(disableHeader: boolean) {
    this.setState({disableHeader});
  }

  setShowMyProducts(showMyProducts: boolean) {
    this.setState({showMyProducts});
  }

  render() {
    return (
      <BuilderPure
        disableHeader={this.state.disableHeader}
        setDisableHeader={this.setDisableHeader}
        showMyProducts={this.state.showMyProducts}
        setShowMyProducts={this.setShowMyProducts}
      />
    );
  }
}

export default BuilderContainer;
