import {Grid} from '@material-ui/core';
import styled from 'styled-components';
import {media} from '../../../style/Core';

export const IconImg = styled.img`
  height: 90px;
  
  ${media.desktop`
    height: 160px;
  `}
`;

export const IconContainerGrid = styled(Grid)`
  text-align: center;
`;
