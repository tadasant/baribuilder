import Select from '@material-ui/core/Select/Select';
import TextField from '@material-ui/core/TextField/TextField';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import Sketch from '../../app/style/SketchVariables';

export const ShadowedSelect = styled(Select)`
  && {
    box-shadow: 0px 1px 2px 0px ${Sketch.color.accent.grey};
    width: 100%;
    text-align: center;
    color: ${Sketch.color.accent.black};
  }
`;

export const UndecoratedLink = styled(Link)`
  text-decoration: unset;
`;

export const NearFullWidthTextField = styled(TextField)`
  width: 95%;
`;
