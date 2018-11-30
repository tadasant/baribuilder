import {Grid} from '@material-ui/core';
import styled from 'styled-components';
import Sketch from '../style/SketchVariables';

export const SharedItemsContainerGrid = styled(Grid)`
  && {
    border-top: 1px solid ${Sketch.color.accent.black};
    margin: 2vh 0 2vh 0;
    padding: 8px;
  }
`;

export const ColoredSpan = styled.span`
  color: ${props => props.color};
`;
