import * as React from 'react';
import {Component} from 'react';
import ProductSelection from './ProductSelection';

class Builder extends Component {
  render() {
    return (
      <div>
        Hello Builder
        <ProductSelection/>
      </div>
    )
  }
}

export default Builder;
