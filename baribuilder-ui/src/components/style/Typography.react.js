import styled from 'styled-components';
import Sketch from '../../app/style/SketchVariables';
import { media } from './Core';

export const Header = styled.div`
  color: ${props => props.dark ? Sketch.color.accent.black : Sketch.color.accent.white};
  font-family: ${Sketch.typography.fontFamily};
  text-align: ${Sketch.typography.header.textAlign};
  
  font-size: ${Sketch.typography.header.fontSize};
  font-weight: ${Sketch.typography.header.fontWeight};
  
  ${media.tablet`
    font-size: ${Sketch.typography.header.tablet.fontSize};
    font-weight: ${Sketch.typography.header.tablet.fontWeight};
  `}
`;

export const Header2 = styled.div`
  color: ${props => props.dark ? Sketch.color.accent.black : Sketch.color.accent.white};
  font-family: ${Sketch.typography.fontFamily};
  text-align: ${Sketch.typography.header2.textAlign};
  
  font-size: ${Sketch.typography.header2.fontSize};
  font-weight: ${Sketch.typography.header2.fontWeight};
  
  ${media.tablet`
    font-size: ${Sketch.typography.header2.tablet.fontSize};
    font-weight: ${Sketch.typography.header2.tablet.fontWeight};
  `}
`;

export const Body = styled.div`
  color: ${props => props.dark ? Sketch.color.accent.black : Sketch.color.accent.white};
  font-family: ${Sketch.typography.fontFamily};
  font-size: ${Sketch.typography.body.fontSize};
  
  ${media.tablet`
    font-size: ${Sketch.typography.body.tablet.fontSize};
  `}
`;

export const Caption = styled.div`
  color: ${props => props.dark ? Sketch.color.accent.black : Sketch.color.accent.white};
  font-family: ${Sketch.typography.fontFamily};
  font-size: ${Sketch.typography.caption.fontSize};
  font-weight: ${Sketch.typography.caption.fontWeight};
  font-style: ${Sketch.typography.caption.fontStyle};
  text-align: ${Sketch.typography.caption.textAlign};
  vertical-align: ${Sketch.typography.caption.verticalAlign};
`;

export const Subcaption = styled.div`
  color: ${props => props.dark ? Sketch.color.accent.black : Sketch.color.accent.white};
  font-family: ${Sketch.typography.fontFamily};
  font-size: ${Sketch.typography.subcaption.fontSize};
  font-weight: ${Sketch.typography.subcaption.fontWeight};
  font-style: ${Sketch.typography.subcaption.fontStyle};
  text-align: ${Sketch.typography.subcaption.textAlign};
  vertical-align: ${Sketch.typography.subcaption.verticalAlign};
`;
