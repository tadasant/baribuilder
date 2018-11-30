import {Grid} from '@material-ui/core';
import * as React from 'react';
import {Fragment, FunctionComponent} from 'react';
import Footer from '../../components/footer/Footer';
import {FooterContainerGrid} from '../../components/footer/Footer.style';
import Navbar from '../../components/navbar/Navbar';
import {EmptyRow} from '../../components/style/Layout';

const LandingShell: FunctionComponent = props => {
  return (
    <Fragment>
      <Navbar/>
      <Grid container>
        <EmptyRow/>
        <Grid item xs={1}/>
        <Grid item xs={10} container>
          {props.children}
        </Grid>
        <Grid item xs={1}/>
      </Grid>
      <EmptyRow/>
      <FooterContainerGrid container>
        <Footer/>
      </FooterContainerGrid>
    </Fragment>
  );
};

export default LandingShell;
