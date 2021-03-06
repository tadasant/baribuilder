import {Grid} from '@material-ui/core';
import styled from 'styled-components';
import Sketch from '../../app/style/SketchVariables';
import {media} from '../style/Core';

export const CurationRedirectContainerDiv = styled.div`
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

export const CurationRedirectDiv = styled.div`
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

export const ButtonGrid = styled(Grid)`
  padding: 8px;
`;
