import * as React from 'react';
import {Component} from 'react';
import {compose, lifecycle} from "recompose";
import PurchaseScreenPure from './PurchaseScreenPure';

// TODO will need state for storing number of days, etc.

class PurchaseScreen extends Component {
  render() {
    return (
      <PurchaseScreenPure />
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

export default enhance(PurchaseScreen);
