import * as React from 'react';
import {Component} from 'react';
import ProductPopover from '../components/builder/building/popover/ProductPopover';

interface IState {
  value: number;
}

class Dev extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      value: 1
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(value: number) {
    this.setState({value});
  }

  render() {
    return (
      <div className="App">
        <ProductPopover catalogProductId='cjm0tbtko00560179xhyj5uju'/>
      </div>
    );
  }
}

export default Dev;
