import styled from 'styled-components';
import Sketch from '../../app/style/SketchVariables';
import { media } from './Core';

export const Header = styled.div`
  color: ${props => props.dark ? Sketch.color.accent.black : Sketch.color.accent.white};
  font-family: ${Sketch.typography.fontFamily};
  text-align: ${Sketch.typography.header['text-align']};
  
  font-size: ${Sketch.typography.header.fontsize};
  font-weight: ${Sketch.typography.header['font-weight']};
  
  ${media.tablet`
    font-size: ${Sketch.typography.header.tablet.fontsize};
    font-weight: ${Sketch.typography.header.tablet['font-weight']};
  `}
`;

export const Header2 = styled.div`
  color: ${props => props.dark ? Sketch.color.accent.black : Sketch.color.accent.white};
  font-family: ${Sketch.typography.fontFamily};
  text-align: ${Sketch.typography.header2['text-align']};
  
  font-size: ${Sketch.typography.header2.fontsize};
  font-weight: ${Sketch.typography.header2['font-weight']};
  
  ${media.tablet`
    font-size: ${Sketch.typography.header2.tablet.fontsize};
    font-weight: ${Sketch.typography.header2.tablet['font-weight']};
  `}
`;

export const Body = styled.div`
  color: ${props => props.dark ? Sketch.color.accent.black : Sketch.color.accent.white};
  font-family: ${Sketch.typography.fontFamily};
  font-size: ${Sketch.typography.body.fontsize};
  
  ${media.tablet`
    font-size: ${Sketch.typography.body.tablet.fontsize};
  `}
`;

export const Caption = styled.div`
  color: ${props => props.dark ? Sketch.color.accent.black : Sketch.color.accent.white};
  font-family: ${Sketch.typography.fontFamily};
  font-size: ${Sketch.typography.caption.fontsize};
  font-weight: ${Sketch.typography.caption['font-weight']};
  font-style: ${Sketch.typography.caption['font-style']};
  text-align: ${Sketch.typography.caption['text-align']};
  vertical-align: ${Sketch.typography.caption['vertical-align']};
`;

export const Subcaption = styled.div`
  color: ${props => props.dark ? Sketch.color.accent.black : Sketch.color.accent.white};
  font-family: ${Sketch.typography.fontFamily};
  font-size: ${Sketch.typography.subcaption.fontsize};
  font-weight: ${Sketch.typography.subcaption['font-weight']};
  font-style: ${Sketch.typography.subcaption['font-style']};
  text-align: ${Sketch.typography.subcaption['text-align']};
  vertical-align: ${Sketch.typography.subcaption['vertical-align']};
`;
