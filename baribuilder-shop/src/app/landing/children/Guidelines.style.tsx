import {Grid} from '@material-ui/core';
import styled from 'styled-components';
import Sketch from '../../style/SketchVariables';

export const GuidelinesContainerDiv = styled.div`
  border: 1px solid ${Sketch.color.accent.black};
`;

export const GuidelinesHeaderGrid = styled(Grid)`
  && {
    border-bottom: 18px solid ${Sketch.color.accent.black};
    margin: 0 8px 0 8px;
  }
`;

export const TitlesHeaderGrid = styled(Grid)`
  && {
    border-bottom: 2px solid ${Sketch.color.accent.black};
    margin: 0 8px 8px 8px;
  }
`;

export const SecondTitleGrid = styled(Grid)`
  text-align: right;
`;

export const MicronutrientNameGrid = styled(Grid)`
  padding: 0 8px 0 8px;
`;

export const MicronutrientValueGrid = styled(Grid)`
  text-align: right;
  padding: 0 8px 0 8px;
`;

export const RegimenPreviewHeaderGrid = styled(Grid)`
  text-align: center;
`;
