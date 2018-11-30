import {Grid} from '@material-ui/core';
import styled from 'styled-components';
import {media} from '../../components/style/Core';
import Sketch from '../style/SketchVariables';

export const ExitIntentContainerDiv = styled.div`
  position: absolute;
  background-color: ${Sketch.color.background.white};
  box-shadow: 0px 0px 4px 4px ${Sketch.color.accent.grey};
  overflow-y: auto;
  outline: 0;
  
  top: 7.5vh;
  left: 12.5vw;
  width: 75vw;
  height: 75vh;
  
  ${media.tablet`
    left: 25vw;
    width: 50vw;
  `}
`;

export const ExitIntentDiv = styled.div`
  height: 49vh;
`;

export const StickyBottomDiv = styled.div`
  box-shadow: 0px -2px 4px 0px ${Sketch.color.accent.grey};
  background-color: ${Sketch.color.background.white};
  z-index: 5;
  
  position: sticky;
  top: calc(75vh - 20vh);
  height: 20vh;
  
  @media (min-height: 500px) {
    top: calc(75vh - 84px);
    height: 84px;
  }
  
  ${media.tablet`
    top: calc(75vh - 84px);
    height: 84px;
  `}
`;

export const VPaddedGrid = styled(Grid)`
  padding-top: 8px;
  
  ${media.tablet`
    padding-top: 16px;
  `}
`;
