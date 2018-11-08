import {Hidden} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import * as React from 'react';
import {Component, Fragment} from 'react';
import {imagekitURLs} from '../../../../constants/images';
import {CenteredTextGrid, EmptyRow} from '../../../style/Layout';
import {Body, Header} from '../../../style/Typography';
import {IconContainerGrid} from './2_BariBuilderExplanationSection.style';
import IconImage from './IconImage';

const scaleText = <Body dark>Helps you <b>comparison shop</b> for vitamin products</Body>;
const userText = <Body dark>Specifically meant for <b>weight loss surgery</b> patients</Body>;
const globeText = <Body dark>On your phone, tablet, or desktop via <b>web application</b></Body>;

class BariBuilderExplanationSection extends Component {
  render() {
    return (
      <Fragment>
        <CenteredTextGrid item xs={12}>
          <Header dark>BariBuilder...</Header>
        </CenteredTextGrid>
        <EmptyRow desktop='25px'/>
        <Hidden mdUp>
          <Fragment>
            <Grid item xs={2}/>
            <IconContainerGrid item xs={8} container>
              <Grid item xs={3}/>
              <Grid item xs={6}>
                <IconImage imagekitURL={imagekitURLs.scale} alt='Comparison scale'/>
              </Grid>
              <Grid item xs={3}/>
              <Grid item xs={12}>
                {scaleText}
              </Grid>
            </IconContainerGrid>
            <Grid item xs={2}/>
          </Fragment>
          <EmptyRow/>
          <Fragment>
            <Grid item xs={2}/>
            <IconContainerGrid item xs={8} container>
              <Grid item xs={3}/>
              <Grid item xs={6}>
                <IconImage imagekitURL={imagekitURLs.users} alt='Users'/>
              </Grid>
              <Grid item xs={3}/>
              <Grid item xs={12}>
                {userText}
              </Grid>
            </IconContainerGrid>
            <Grid item xs={2}/>
          </Fragment>
          <EmptyRow/>
          <Fragment>
            <Grid item xs={2}/>
            <IconContainerGrid item xs={8} container>
              <Grid item xs={3}/>
              <Grid item xs={6}>
                <IconImage imagekitURL={imagekitURLs.globe} alt='Internet globe'/>
              </Grid>
              <Grid item xs={3}/>
              <Grid item xs={12}>
                {globeText}
              </Grid>
            </IconContainerGrid>
            <Grid item xs={2}/>
          </Fragment>
        </Hidden>
        <Hidden smDown>
          <Fragment>
            <IconContainerGrid item md={4} container>
              <Grid item md={3}/>
              <Grid item md={6}>
                <IconImage imagekitURL={imagekitURLs.scale} alt='Comparison scale'/>
              </Grid>
              <Grid item md={3}/>
              <EmptyRow/>
              <Grid item md={12}>
                {scaleText}
              </Grid>
            </IconContainerGrid>
          </Fragment>
          <Fragment>
            <IconContainerGrid item md={4} container>
              <Grid item md={3}/>
              <Grid item md={6}>
                <IconImage imagekitURL={imagekitURLs.users} alt='Users'/>
              </Grid>
              <Grid item md={3}/>
              <EmptyRow/>
              <Grid item md={12}>
                {userText}
              </Grid>
            </IconContainerGrid>
          </Fragment>
          <Fragment>
            <IconContainerGrid item md={4} container>
              <Grid item md={3}/>
              <Grid item md={6}>
                <IconImage imagekitURL={imagekitURLs.globe} alt='Internet globe'/>
              </Grid>
              <Grid item md={3}/>
              <EmptyRow/>
              <Grid item md={12}>
                {globeText}
              </Grid>
            </IconContainerGrid>
          </Fragment>
        </Hidden>
      </Fragment>
    );
  }
}

export default BariBuilderExplanationSection;
