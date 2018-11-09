import * as React from 'react';
import {Component} from 'react';
import Footer from '../../../footer/Footer';
import {EmptyRow} from '../../../style/Layout';
import {LandingDiv} from './LandingFooter.style';

class LandingFooter extends Component {
  render() {
    return (
      <LandingDiv>
        <EmptyRow mobile='80px'/>
        <Footer/>
      </LandingDiv>
    );
  }
}

export default LandingFooter;
