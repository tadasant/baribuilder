import * as React from 'react';
import {Component} from 'react';
import {compose, lifecycle} from 'recompose';

class RequestProductsScreen extends Component {
  render() {
    return (
      <div >
        Typeform
      </div>
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
