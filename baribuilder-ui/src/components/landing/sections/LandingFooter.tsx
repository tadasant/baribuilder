import * as React from 'react';
import {Component, Fragment} from 'react';
import Footer from '../../footer/Footer';
import {EmptyRow} from '../../style/Layout';

class LandingFooter extends Component {
  render() {
    return (
      <Fragment>
        <EmptyRow mobile='80px'/>
        <Footer/>
      </Fragment>
    );
  }
}

export default LandingFooter;
