import * as React from 'react';
import {Component} from 'react';
import {ICatalogScreenPureProps} from '../CatalogScreen';
import CatalogScreenPureDesktop from './CatalogScreenPureDesktop';

interface IState {
  showMyProducts: boolean;
  showMyRegimen: boolean;
  hasOpenedMyProducts: boolean;
}

class CatalogScreenDesktop extends Component<ICatalogScreenPureProps, Readonly<IState>> {
  constructor(props: ICatalogScreenPureProps) {
    super(props);
    this.state = {
      showMyProducts: false,
      showMyRegimen: true,
      hasOpenedMyProducts: false,
    };
    this.setShowMyProducts = this.setShowMyProducts.bind(this);
    this.setShowMyRegimen = this.setShowMyRegimen.bind(this);
    this.handleAddToRegimen = this.handleAddToRegimen.bind(this);
  }

  setShowMyProducts(showMyProducts: boolean) {
    this.setState(prevState => ({
      showMyProducts,
      hasOpenedMyProducts: showMyProducts || prevState.hasOpenedMyProducts,
    }));
  }

  setShowMyRegimen(showMyRegimen: boolean) {
    this.setState({showMyRegimen});
  }

  handleAddToRegimen() {
    this.setState(prevState => ({
      showMyProducts: prevState.hasOpenedMyProducts ? prevState.showMyProducts : true,
      hasOpenedMyProducts: true,
    }));
  }

  render() {
    return (
      <CatalogScreenPureDesktop
        {...this.props}
        onAddToRegimen={this.handleAddToRegimen}
        showMyProducts={this.state.showMyProducts}
        setShowMyProducts={this.setShowMyProducts}
        showMyRegimen={this.state.showMyRegimen}
        setShowMyRegimen={this.setShowMyRegimen}
      />
    );
  }
}

export default CatalogScreenDesktop;
