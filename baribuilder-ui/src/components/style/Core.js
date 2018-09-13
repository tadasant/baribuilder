import { css } from 'styled-components';
import Sketch from '../../app/style/SketchVariables';

// Iterate through breakpoints and create a media template
export const media = Object.keys(Sketch.breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${Sketch.breakpoints[label]}px) {
      ${css(...args)}
    }
  `;

  return acc
}, {});
