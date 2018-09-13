import React from 'react';
import PropTypes from 'prop-types';
import Sketch from '../../../../app/style/SketchVariables';
import {media} from '../../../style/Core';
import styled from 'styled-components';

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

const BoldText = styled.span`
  color: ${props => props.dark ? Sketch.color.accent.black : Sketch.color.accent.white};
  font-family: ${Sketch.typography.fontFamily};
  
  font-size: 18px;
  font-weight: 800;
  
  ${media.tablet`
    font-size: 28px;
  `}
`;

const StepOval = props => (
  <Circle {...props}>
    <BoldText dark>{props.value}</BoldText>
  </Circle>
);

StepOval.propTypes = {
  value: PropTypes.string,
};

export default StepOval;
