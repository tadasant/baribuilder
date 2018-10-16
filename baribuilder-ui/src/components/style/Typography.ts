import {HTMLProps} from 'react';
import styled, {StyledFunction} from 'styled-components';
import Sketch from '../../app/style/SketchVariables';
import {media} from './Core';

interface ITypographyProps {
  dark?: boolean
}

const span: StyledFunction<ITypographyProps & HTMLProps<HTMLInputElement>> = styled.span;

export const Header = span`
  color: ${(props: ITypographyProps) => props.dark ? Sketch.color.accent.black : Sketch.color.accent.white};
  font-family: ${Sketch.typography.fontFamily};
  text-align: ${Sketch.typography.header.textAlign};
  
  font-size: ${Sketch.typography.header.fontSize};
  font-weight: ${Sketch.typography.header.fontWeight};
  
  ${media.tablet`
    font-size: ${Sketch.typography.header.tablet.fontSize};
    font-weight: ${Sketch.typography.header.tablet.fontWeight};
  `}
`;

export const Header2 = span`
  color: ${(props: ITypographyProps) => props.dark ? Sketch.color.accent.black : Sketch.color.accent.white};
  font-family: ${Sketch.typography.fontFamily};
  text-align: ${Sketch.typography.header2.textAlign};
  
  font-size: ${Sketch.typography.header2.fontSize};
  font-weight: ${Sketch.typography.header2.fontWeight};
  
  ${media.tablet`
    font-size: ${Sketch.typography.header2.tablet.fontSize};
    font-weight: ${Sketch.typography.header2.tablet.fontWeight};
  `}
`;

export const BoldBody = span`
  color: ${(props: ITypographyProps) => props.dark ? Sketch.color.accent.black : Sketch.color.accent.white};
  font-family: ${Sketch.typography.fontFamily};
  text-align: ${Sketch.typography.bodybold.textAlign};
  
  font-size: ${Sketch.typography.bodybold.fontSize};
  font-weight: ${Sketch.typography.bodybold.fontWeight};
  
  ${media.tablet`
    font-size: ${Sketch.typography.bodybold.tablet.fontSize};
  `}
`;

export const Body = span`
  color: ${(props: ITypographyProps) => props.dark ? Sketch.color.accent.black : Sketch.color.accent.white};
  font-family: ${Sketch.typography.fontFamily};
  font-size: ${Sketch.typography.body.fontSize};
  
  ${media.tablet`
    font-size: ${Sketch.typography.body.tablet.fontSize};
  `}
`;

export const Caption = span`
  color: ${(props: ITypographyProps) => props.dark ? Sketch.color.accent.black : Sketch.color.accent.white};
  font-family: ${Sketch.typography.fontFamily};
  font-size: ${Sketch.typography.caption.fontSize};
  font-weight: ${Sketch.typography.caption.fontWeight};
  font-style: ${Sketch.typography.caption.fontStyle};
  text-align: ${Sketch.typography.caption.textAlign};
  vertical-align: ${Sketch.typography.caption.verticalAlign};
`;

export const Subcaption = span`
  color: ${(props: ITypographyProps) => props.dark ? Sketch.color.accent.black : Sketch.color.accent.white};
  font-family: ${Sketch.typography.fontFamily};
  font-size: ${Sketch.typography.subcaption.fontSize};
  font-weight: ${Sketch.typography.subcaption.fontWeight};
  font-style: ${Sketch.typography.subcaption.fontStyle};
  text-align: ${Sketch.typography.subcaption.textAlign};
  vertical-align: ${Sketch.typography.subcaption.verticalAlign};
`;

export const GreyHeader2 = styled(Header2)`
  color: ${Sketch.color.accent.grey};
`;

export const GreyBody = styled(Body)`
  color: ${Sketch.color.accent.grey};
`;
