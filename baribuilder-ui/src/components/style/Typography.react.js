import styled from 'styled-components';
import Sketch from '../../app/style/SketchVariables';
import { media } from './Core';

export const Header = styled.div`
  color: ${props => props.dark ? Sketch.color.accent.black : Sketch.color.accent.white};
  font-family: ${Sketch.typography.fontFamily};
  text-align: ${Sketch.typography.header['text-align']};
  
  font-size: ${Sketch.typography.header['font-size']};
  font-weight: ${Sketch.typography.header['font-weight']};
  
  ${media.tablet`
    font-size: ${Sketch.typography.header.tablet['font-size']};
    font-weight: ${Sketch.typography.header.tablet['font-weight']};
  `}
`;

export const Header2 = styled.div`
  color: ${props => props.dark ? Sketch.color.accent.black : Sketch.color.accent.white};
  font-family: ${Sketch.typography.fontFamily};
  text-align: ${Sketch.typography['header-2']['text-align']};
  
  font-size: ${Sketch.typography['header-2']['font-size']};
  font-weight: ${Sketch.typography['header-2']['font-weight']};
  
  ${media.tablet`
    font-size: ${Sketch.typography['header-2'].tablet['font-size']};
    font-weight: ${Sketch.typography['header-2'].tablet['font-weight']};
  `}
`;

export const Body = styled.div`
  color: ${props => props.dark ? Sketch.color.accent.black : Sketch.color.accent.white};
  font-family: ${Sketch.typography.fontFamily};
  font-size: ${Sketch.typography.body['font-size']};
  
  ${media.tablet`
    font-size: ${Sketch.typography.body.tablet['font-size']};
  `}
`;

export const Caption = styled.div`
  color: ${props => props.dark ? Sketch.color.accent.black : Sketch.color.accent.white};
  font-family: ${Sketch.typography.fontFamily};
  font-size: ${Sketch.typography.caption['font-size']};
  font-weight: ${Sketch.typography.caption['font-weight']};
  font-style: ${Sketch.typography.caption['font-style']};
  text-align: ${Sketch.typography.caption['text-align']};
  vertical-align: ${Sketch.typography.caption['vertical-align']};
`;

export const Subcaption = styled.div`
  color: ${props => props.dark ? Sketch.color.accent.black : Sketch.color.accent.white};
  font-family: ${Sketch.typography.fontFamily};
  font-size: ${Sketch.typography.subcaption['font-size']};
  font-weight: ${Sketch.typography.subcaption['font-weight']};
  font-style: ${Sketch.typography.subcaption['font-style']};
  text-align: ${Sketch.typography.subcaption['text-align']};
  vertical-align: ${Sketch.typography.subcaption['vertical-align']};
`;
