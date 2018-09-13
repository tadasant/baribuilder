import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { media } from './Core';

const SpacedGrid = styled(Grid)`
  && {
    margin-top: ${props => props.margin.mobile};
    
    ${media.tablet`
      margin-top: ${props => props.margin.tablet};
    `}
    
    ${media.desktop`
      margin-top: ${props => props.margin.desktop};
    `}
  }
`;

const HiddenSpan = styled.span`
  display: none;
`;

// Creates full row (12 columns) of space, using props `mobile`, `tablet`, `desktop` as margin size
export const EmptyRow = props => (
  <SpacedGrid item xs={12} margin={{mobile: props.mobile, tablet: props.tablet, desktop: props.desktop}}>
    <HiddenSpan>-</HiddenSpan>
  </SpacedGrid>
);
