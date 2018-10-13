import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField/TextField';
import * as React from 'react';
import {Component} from 'react';
import styled from 'styled-components';
import Sketch from '../../app/style/SketchVariables';
import searchIcon from '../../assets/icon/search.svg';

const NearFullWidthTextField = styled(TextField)`
  width: 95%;
  color: white;
`;

const FullHeightGrid = styled(Grid)`
  height: 100%;
`;

const LogoImg = styled.img`
  height: 24px;
  cursor: pointer;
`;

class SearchBox extends Component {
  render() {
    return (
      <FullHeightGrid item container alignItems='center'>
        <Grid item lg={10}>
          <NearFullWidthTextField
            placeholder='Search'
            inputProps={{type: 'email', style: {color: Sketch.color.accent.white}}}
          />
        </Grid>
        <Grid item lg={2}>
          <LogoImg src={searchIcon} onClick={() => console.log('search')}/>
        </Grid>
      </FullHeightGrid>
    )
  }
}

export default SearchBox;