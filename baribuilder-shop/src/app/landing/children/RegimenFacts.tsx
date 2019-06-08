import {Grid} from '@material-ui/core';
import * as React from 'react';
import {FunctionComponent} from 'react';
import {EmptyRow} from '../../../components/style/Layout';
import {Body, BoldBody, Header2} from '../../../components/style/Typography';
import Sketch from '../../style/SketchVariables';
import {ColoredSpan} from '../Landing.style';
import {
  GuidelinesContainerDiv,
  GuidelinesHeaderGrid,
  MicronutrientNameGrid,
  MicronutrientValueGrid,
  SecondTitleGrid,
  TitlesHeaderGrid
} from './Guidelines.style';

export interface IRegimenFactsMicronutrient {
  name: string
  // value is an approximate or an array of 2 representing a range
  value: string
  goal: string
  color?: string
  units: string
}

interface IProps {
  numProductServings: number
  micronutrients: IRegimenFactsMicronutrient[];
}

const RegimenFacts: FunctionComponent<IProps> = props => {
  return (
    <GuidelinesContainerDiv>
      <Grid container>
        <GuidelinesHeaderGrid item xs={12}>
          <Header2 dark>Regimen Facts</Header2>
          <br/>
          <Body dark># of product servings {props.numProductServings}</Body>
        </GuidelinesHeaderGrid>
        <TitlesHeaderGrid item xs={12} container>
          <Grid item xs={6}>
            <Body dark>Amount per day</Body>
          </Grid>
          <SecondTitleGrid item xs={6}>
            <Body dark>of goal</Body>
          </SecondTitleGrid>
          <Grid item xs={2}/>
        </TitlesHeaderGrid>
        {
          props.micronutrients.map(micro => (
            <Grid item xs={12} container key={micro.name}>
              <MicronutrientNameGrid item xs={5}>
                <BoldBody dark>{micro.name}</BoldBody>
              </MicronutrientNameGrid>
              <MicronutrientValueGrid item xs={7}>
                <Body dark><b><ColoredSpan color={micro.color || Sketch.color.accent.black}>{micro.value} of {micro.goal}</ColoredSpan></b> {micro.units}</Body>
              </MicronutrientValueGrid>
            </Grid>
          ))
        }
        <EmptyRow/>
      </Grid>
    </GuidelinesContainerDiv>
  );
};

export default RegimenFacts;
