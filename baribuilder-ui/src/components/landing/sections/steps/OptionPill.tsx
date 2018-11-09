import * as React from 'react';
import {SFC} from 'react';
import styled from 'styled-components';
import Sketch from '../../../../app/style/SketchVariables';
import {Body} from '../../../style/Typography';

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

interface IProps {
  value: string;
}

const OptionPill: SFC<IProps> = props => (
  <Pill {...props}>
    <Body dark>{props.value}</Body>
  </Pill>
);

export default OptionPill;
