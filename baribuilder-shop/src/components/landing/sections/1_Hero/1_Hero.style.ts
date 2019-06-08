import Grid from '@material-ui/core/Grid/Grid';
import styled from 'styled-components';
import {navbarHeight} from '../../../navbar/Navbar';

export const HeroGrid = styled(Grid)`
  height: calc(92.5vh - ${navbarHeight});
  clip-path: polygon(0 0, 100% 0, 100% 66%, 0% 100%);

  // https://css-tricks.com/easing-linear-gradients/
  background-image: linear-gradient(to bottom right,
  	hsl(197, 100%, 81%),
    hsla(197, 100%, 81%, 0.194) 65%,
    hsla(197, 100%, 81%, 0.126) 73%,
    hsla(197, 100%, 81%, 0.075) 80.2%,
    hsla(197, 100%, 81%, 0.042) 86.1%,
    hsla(197, 100%, 81%, 0.021) 91%,
    hsla(197, 100%, 81%, 0.008) 95.2%,
    hsla(197, 100%, 81%, 0.002) 98.2%,
    hsla(197, 100%, 81%, 0) 100%
  );
  
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: 100%;

  @media (min-width: 600px) and (min-height: 960px) {
    background-size: 100%;
  }

  @media (min-width: 900px) and (max-height: 960px) {
  }
`;

export const SubheaderGrid = styled(Grid)`
  text-align: center;
`;