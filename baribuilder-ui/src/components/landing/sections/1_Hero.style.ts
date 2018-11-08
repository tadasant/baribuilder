import Grid from '@material-ui/core/Grid/Grid';
import styled from 'styled-components';
import images from '../../../constants/images';
import {navbarHeight} from '../../navbar/Navbar';

export const HeroGrid = styled(Grid)`
  height: calc(90vh - ${navbarHeight});

  background-image: url('${images.hero.mobile}');
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: 100%;

  @media (min-width: 600px) and (min-height: 960px) {
    background-image: url('${images.hero.tablet}');
    background-size: 100%;
  }

  @media (min-width: 900px) and (max-height: 960px) {
    background-image: url('${images.hero.desktop}');
  }
`;

export const SubheaderGrid = styled(Grid)`
  text-align: center;
`;