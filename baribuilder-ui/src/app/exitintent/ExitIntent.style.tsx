import styled from 'styled-components';
import {media} from '../../components/style/Core';
import Sketch from '../style/SketchVariables';

export const ExitIntentDiv = styled.div`
  position: absolute;
  background-color: ${Sketch.color.background.white};
  box-shadow: 0px 0px 4px 4px ${Sketch.color.accent.grey};
  outline: 0;
  
  top: 12.5vh;
  left: 12.5vw;
  width: 75vw;
  height: 75vh;
  
  ${media.tablet`
    left: 25vw;
    width: 50vw;
  `}
`;
