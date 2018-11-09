import * as React from 'react';
import {SFC} from 'react';
import styled from 'styled-components';
import Sketch from '../../../../app/style/SketchVariables';
import {media} from '../../../style/Core';
import {BoldText} from '../../../style/Typography';

const Circle = styled.div`
  border-radius: 50%;
  background-color: ${Sketch.color.background.transparent}50;
  width: 32px;
  height: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: -10% 25% 0 15%; // Makes it a little upper left of center
  
  ${media.tablet`
    width: 64px;
    height: 64px;
  `}
`;

interface IProps {
  value: string;
}

const StepOval: SFC<IProps> = props => (
  <Circle {...props}>
    <BoldText dark>{props.value}</BoldText>
  </Circle>
);

export default StepOval;
