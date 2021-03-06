import Grid, {GridProps} from '@material-ui/core/Grid';
import * as React from 'react';
import styled from 'styled-components';
import { media } from './Core';


interface IMarginProps {
  mobile?: string;
  tablet?: string;
  desktop?: string;
}

interface ISpacedGridProps extends GridProps {
  margin: IMarginProps;
}

const SpacedGrid = styled(Grid)`
  && {
    margin-top: ${(props: ISpacedGridProps) => props.margin.mobile};
    
    ${media.tablet`
      margin-top: ${(props: ISpacedGridProps) => props.margin.tablet};
    `}
    
    ${media.desktop`
      margin-top: ${(props: ISpacedGridProps) => props.margin.desktop};
    `}
  }
`;

const HiddenSpan = styled.span`
  visibility: hidden;
`;

// Creates full row (12 columns) of space, using props `mobile`, `tablet`, `desktop` as margin size
export const EmptyRow = (props: IMarginProps) => (
  <SpacedGrid item xs={12} margin={{mobile: props.mobile, tablet: props.tablet, desktop: props.desktop}}>
    <HiddenSpan>-</HiddenSpan>
  </SpacedGrid>
);

export const CenteredTextGrid = styled(Grid)`
  text-align: center;
`;
