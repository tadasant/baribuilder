import React, {Component, Fragment} from 'react';
import {CenteredTextGrid} from '../../goals/GoalsScreenPure';
import {Body, Header} from '../../style/Typography';
import {EmptyRow} from '../../style/Layout';
import styled from 'styled-components';
import Sketch from '../../../app/style/SketchVariables';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import {media} from '../../style/Core';
import images from '../../../constants/images';

const FullWidthImg = styled.img`
  width: 100%;
`;

const BlueText = styled.span`
  color: ${Sketch.color.secondary.blue2};
`;

const CenterTextUntilDesktop = styled.p`
  text-align: center;
  
  ${media.desktop`
    text-align: left;
  `}
`;

class UniqueSection extends Component {
  render() {
    return (
      <Fragment>
        <CenteredTextGrid item xs={12}>
          <Header dark><BlueText>You</BlueText> are unique</Header>
        </CenteredTextGrid>
        <EmptyRow mobile='20px'/>
        <Fragment>
          <Hidden only='xs'>
            <Grid item sm={1} lg={2}/>
          </Hidden>
          <Grid item xs={12} sm={10} lg={5}>
            <FullWidthImg
              src={images.personInCrowd.original}
              srcSet={`${images.personInCrowd.mobile} 360w,
                      ${images.personInCrowd.tablet} 600w`}
              sizes={`(min-width: ${Sketch.breakpoints.tablet}px) 600px, 360px`}
              alt='Unique Person Within Crowd Image'
            />
          </Grid>
          <Hidden only={['xs', 'lg', 'xl']}>
            <Grid item sm={1}/>
            <Grid item sm={1}/>
          </Hidden>
          <Grid item xs={12} sm={10} lg={3} container>
            <Grid item xs={12}>
              <Body dark>
                <CenterTextUntilDesktop>
                  Your body will react differently to surgery. Your peers will have different health issues.
                  <br/><br/>
                  Your vitamin regimen should be built for
                </CenterTextUntilDesktop>
              </Body>
            </Grid>
            <CenteredTextGrid item xs={12}>
              <Header><BlueText>YOU.</BlueText></Header>
            </CenteredTextGrid>
            <Hidden mdDown>
              {/* Padding hack to adjust for the container's forced too-large height on above item */}
              <EmptyRow desktop='90px'/>
            </Hidden>
          </Grid>
          <Hidden only={['xs', 'lg', 'xl']}>
            <Grid item sm={1}/>
          </Hidden>
          <Hidden only={['xs', 'md', 'lg', 'xl']}>
            <Grid item sm={1}/>
          </Hidden>
          <Hidden mdDown>
            <Grid item lg={2}/>
          </Hidden>
        </Fragment>
      </Fragment>
    );
  }
}

export default UniqueSection;
