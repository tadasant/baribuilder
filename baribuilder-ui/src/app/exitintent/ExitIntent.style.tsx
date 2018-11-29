import styled from 'styled-components';
import {media} from '../../components/style/Core';
import Sketch from '../style/SketchVariables';

export const ExitIntentContainerDiv = styled.div`
  position: absolute;
  background-color: ${Sketch.color.background.white};
  box-shadow: 0px 0px 4px 4px ${Sketch.color.accent.grey};
  outline: 0;
  overflow-y: scroll;
  
  top: 12.5vh;
  left: 12.5vw;
  width: 75vw;
  height: 75vh;
  
  ${media.tablet`
    left: 25vw;
    width: 50vw;
  `}
`;

export const ExitIntentDiv = styled.div`
  height: 64vh;
`;

export const StickyBottomDiv = styled.div`
  box-shadow: 0px -2px 4px 0px ${Sketch.color.accent.grey};
  background-color: ${Sketch.color.background.white};
  
  position: sticky;
  top: calc(75vh - 11vh);
  height: 11vh;
`;