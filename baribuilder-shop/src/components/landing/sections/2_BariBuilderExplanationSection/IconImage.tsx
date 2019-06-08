import * as React from 'react';
import {SFC} from 'react';
import Sketch from '../../../../app/style/SketchVariables';
import {fixedWidthImage} from '../../../../lib/imageKitHelpers';
import {IconImg} from './2_BariBuilderExplanationSection.style';

interface IProps {
  imagekitURL: string;
  alt: string;
}

const IconImage: SFC<IProps> = props => (
  <IconImg
    src={props.imagekitURL}
    srcSet={`${fixedWidthImage(props.imagekitURL, '200')} 200w,
                      ${fixedWidthImage(props.imagekitURL, '360')} 360w`}
    sizes={`(min-width: ${Sketch.breakpoints.desktop}px) 360px, 200px`}
    alt={props.alt}
  />
);

export default IconImage;
