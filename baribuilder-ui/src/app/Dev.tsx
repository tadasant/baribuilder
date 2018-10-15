import * as React from 'react';
import {Component} from 'react';
import styled from 'styled-components';
import MainProductImageWithPopover
  from '../components/builder/building/productSelection/children/MainProductImageWithPopover';

interface IState {
  value: number;
}

const MainImage = styled(MainProductImageWithPopover)`
  height: 100px;
`;

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
        <MainImage catalogProductId='cjm0tbtko00560179xhyj5uju' anchorSide='left'/>
      </div>
    );
  }
}

export default Dev;
