import React from 'react';
import PropTypes from 'prop-types';
import Sketch from '../../../../app/style/SketchVariables';
import styled from 'styled-components';
import {Body} from '../../../style/Typography.react';

const Pill = styled.div`
  border-radius: 18px;
  background-color: ${Sketch.color.background.transparent}50;
  width: 100%;
  padding: 5px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0 10px 0;
`;

const OptionPill = props => (
  <Pill {...props}>
    <Body dark>{props.value}</Body>
  </Pill>
);

OptionPill.propTypes = {
  value: PropTypes.string,
};

export default OptionPill;
