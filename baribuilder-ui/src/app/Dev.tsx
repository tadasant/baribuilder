import * as React from 'react';
import {Component} from 'react';
import PlusMinus from '../components/builder/building/lib/PlusMinus';

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
        <PlusMinus value={this.state.value} onChange={this.onChange}/>
      </div>
    );
  }
}

export default Dev;
