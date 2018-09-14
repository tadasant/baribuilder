import {css} from 'styled-components';
import Sketch from '../../app/style/SketchVariables';

type BreakpointLabels = keyof typeof Sketch.breakpoints;

// TODO clarify the any type
export const media: any = Object.keys(Sketch.breakpoints).reduce((mediaQueries, label: BreakpointLabels) => (
  {
    ...mediaQueries,
    [label] (...args: any[]) {
      return css`
                @media (min-width: ${Sketch.breakpoints[label]}px) {
                    ${css.call(this, ...args)}
                }
            `
    }
  }
), {});
