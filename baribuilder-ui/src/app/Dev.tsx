import * as React from 'react';
import {Component} from 'react';
import BuilderMyRegimen from '../components/builder/building/BuilderMyRegimen';

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
        <BuilderMyRegimen/>
      </div>
    );
  }
}

export default Dev;
