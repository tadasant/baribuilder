import {Grid} from '@material-ui/core';
import styled from 'styled-components';
import {media} from '../../../components/style/Core';
import {Subcaption} from '../../../components/style/Typography';
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
  
  @media (min-height: 500px) {
    margin-bottom: 84px;
  }
  
  ${media.tablet`
    margin-bottom: 84px;
  `}
`;

export const StickyBottomDiv = styled.div`
  box-shadow: 0px -2px 4px 0px ${Sketch.color.accent.grey};
  background-color: ${Sketch.color.background.white};
  z-index: 5;
  overflow-x: hidden;
  
  position: fixed;
  top: calc(75vh + 7.5vh - 20vh);
  height: 20vh;
  width: 75vw;
  
  @media (min-height: 500px) {
    top: calc(75vh + 7.5vh - 84px);
    height: 84px;
  }
  
  ${media.tablet`
    top: calc(75vh + 7.5vh - 84px);
    height: 84px;
    width: 50vw;
  `}
`;

export const VPaddedGrid = styled(Grid)`
  padding-top: 8px;
  
  ${media.tablet`
    padding-top: 16px;
  `}
`;

export const GiftCardImg = styled.img`
  width: 90%;
  
  ${media.tablet`
    width: 75%;
  `}
`;

export const DismissSubcaption = styled(Subcaption)`
  text-decoration: underline;
  cursor: pointer;
`;
