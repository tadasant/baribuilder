import * as React from 'react';
import {Component} from 'react';
import Footer from '../../../footer/Footer';
import {FooterContainerGrid} from '../../../footer/Footer.style';
import {EmptyRow} from '../../../style/Layout';

class LandingFooter extends Component {
  render() {
    return (
      <FooterContainerGrid container>
        <EmptyRow mobile='80px'/>
        <Footer/>
      </FooterContainerGrid>
    );
  }
}

export default LandingFooter;
