import {Paper} from '@material-ui/core';
import * as React from 'react';
import {Component} from 'react';
import styled from 'styled-components';
import ClientCatalogProduct from '../components/catalog/children/productSelection/ClientCatalogProduct';

interface IState {
  value: number;
}

const PaddedDiv = styled.div`
  padding: 8px 8px;
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
        <Paper>
          <PaddedDiv>
            <ClientCatalogProduct id='cjm0tbtko00560179xhyj5uju'/>
          </PaddedDiv>
        </Paper>
      </div>
    );
  }
}

export default Dev;
