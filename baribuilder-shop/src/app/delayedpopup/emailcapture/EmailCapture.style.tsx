import styled from 'styled-components';
import {media} from '../../../components/style/Core';
import Sketch from '../../style/SketchVariables';

export const DelayedPopupContainerDiv = styled.div`
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

export const DelayedPopupDiv = styled.div`
  margin-bottom: 20vh;
  padding: 8px;
  
  @media (min-height: 500px) {
    margin-bottom: 84px;
  }
  
  ${media.tablet`
    margin-bottom: 84px;
    padding: 16px;
  `}
`;
