import {Grid} from '@material-ui/core';
import * as React from 'react';
import {Component} from 'react';
import {compose, lifecycle} from 'recompose';
import {EmptyRow} from '../style/Layout';
import RequestTypeform from './RequestTypeform';

class RequestProductsScreen extends Component {
  render() {
    return (
      <Grid container>
        <EmptyRow/>
        <Grid item lg={3}/>
        <Grid item lg={6}>
          <RequestTypeform/>
        </Grid>
        <Grid item lg={3}/>
        <EmptyRow/>
      </Grid>
    );
  }
}

const enhance = compose<{}, {}>(
  lifecycle({
    componentDidMount() {
      window.scrollTo(0, 0);
    }
  }),
);

export default enhance(RequestProductsScreen);
