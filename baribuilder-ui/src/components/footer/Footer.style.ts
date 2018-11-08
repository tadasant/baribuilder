import {Grid} from '@material-ui/core';
import styled from 'styled-components';
import Sketch from '../../app/style/SketchVariables';
import {media} from '../style/Core';
import {Caption} from '../style/Typography';

export const DisclaimerCaption = styled(Caption)`
  font-size: 9px;
  text-align: left;
  
  ${media.tablet`
    font-size: 11px;
  `}
`;

export const FooterContainerGrid = styled(Grid)`
  background-color: ${Sketch.color.accent.black};
`;
