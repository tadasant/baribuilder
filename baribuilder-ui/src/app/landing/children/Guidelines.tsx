import {Grid} from '@material-ui/core';
import * as React from 'react';
import {FunctionComponent} from 'react';
import {EmptyRow} from '../../../components/style/Layout';
import {Body, BoldBody, Header2} from '../../../components/style/Typography';
import {
  GuidelinesContainerDiv,
  GuidelinesHeaderGrid,
  MicronutrientNameGrid,
  MicronutrientValueGrid,
  SecondTitleGrid,
  TitlesHeaderGrid
} from './Guidelines.style';

export interface IMicronutrient {
  name: string
  // value is an approximate or an array of 2 representing a range
  value: string | string[]
  units: string
}

interface IProps {
  micronutrients: IMicronutrient[];
}

const Guidelines: FunctionComponent<IProps> = props => {
  return (
    <GuidelinesContainerDiv>
      <Grid container>
        <GuidelinesHeaderGrid item xs={12}>
          <Header2 dark>Guidelines</Header2>
        </GuidelinesHeaderGrid>
        <TitlesHeaderGrid item xs={12} container>
          <Grid item xs={6}>
            <Body dark>Ingredient</Body>
          </Grid>
          <SecondTitleGrid item xs={6}>
            <Body dark>Goal Dosage</Body>
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
                <Body dark>{Array.isArray(micro.value) ? `${micro.value[0]} - ${micro.value[1]} ${micro.units}` : `~${micro.value} ${micro.units}`}</Body>
              </MicronutrientValueGrid>
            </Grid>
          ))
        }
        <EmptyRow/>
      </Grid>
    </GuidelinesContainerDiv>
  );
};

export default Guidelines;
