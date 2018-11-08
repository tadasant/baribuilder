import React, {Component} from 'react';
import Footer, {BlackGrid} from '../../Footer';
import {EmptyRow} from '../../style/Layout';

class LandingFooter extends Component {
  render() {
    return (
      <BlackGrid item container direction='row'>
        <EmptyRow mobile='80px'/>
        <Footer/>
      </BlackGrid>
    );
  }
}

export default LandingFooter;
