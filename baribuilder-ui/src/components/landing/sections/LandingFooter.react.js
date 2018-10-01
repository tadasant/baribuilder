import React, {Component, Fragment} from 'react';
import Footer, {BlackGrid} from '../../Footer';
import {EmptyRow} from '../../style/Layout';

const citationText = '* Expected prices listed on BariBuilder match those found on popular retail websites ' +
  '(e.g. Amazon.com). In the example above, prices are current as of 10:50AM EST, 8/18/18 on Amazon.com. They ' +
  'reflect a desired regimen of  90mg of vitamin C, 3mg of vitamin B2, 20mg of vitamin B3, 4mg of vitamin B6, ' +
  '800mcg of folic acid, 15g of zinc, and 1mg of copper.';

class LandingFooter extends Component {
  render() {
    return (
      <BlackGrid item container direction='row'>>
        <EmptyRow mobile='80px'/>
        <Footer disclaimerText={citationText}/>
      </BlackGrid>
    );
  }
}

export default LandingFooter;
