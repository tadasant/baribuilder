import React, {Component, Fragment} from 'react';
import {Header} from '../../style/Typography.react';
import {EmptyRow} from '../../style/Layout.react';
import styled from 'styled-components';
import Sketch from '../../../app/style/SketchVariables';
import Grid from '@material-ui/core/Grid';

const FullWidthImg = styled.img`
  width: 100%;
`;

const LightText = styled.span`
  font-weight: 300
`;

class PriceSection extends Component {
  render() {
    return (
      <Fragment>
        <Grid item xs={12}>
          <Header dark>Transparent <LightText>prices.</LightText></Header>
        </Grid>
        <EmptyRow mobile='30px'/>
        <Fragment>
          <Grid item xs={1} lg={3}/>
          <Grid item xs={10} lg={6}>
            <FullWidthImg
              src='https://ik.imagekit.io/vitaglab/price-comparison_rkQCZVULm.png'
              srcSet='https://ik.imagekit.io/vitaglab/tr:w-300/price-comparison_rkQCZVULm.png 300w,
                      https://ik.imagekit.io/vitaglab/tr:w-1024/price-comparison_rkQCZVULm.png 1024w'
              sizes={`(min-width: ${Sketch.breakpoints.tablet}px) 1024px, 300px`}
              alt='Compare Centrum to Bariatric Advantage Pricing Image'
            />
          </Grid>
          <Grid item xs={1} lg={3}/>
        </Fragment>
        <EmptyRow mobile='30px'/>
        <Grid item xs={12}>
          <Header dark>Low <LightText>prices.*</LightText></Header>
        </Grid>
      </Fragment>
    );
  }
}

export default PriceSection;
