import * as React from 'react';
import {Component} from 'react';
import BuilderMyProducts from '../components/builder/building/BuilderMyProducts';

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
        <BuilderMyProducts/>
      </div>
    );
  }
}

export default Dev;
