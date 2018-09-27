import {Button, Grid} from '@material-ui/core';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import styled from 'styled-components';

interface IProps {
  onClickSetAndBrowse: () => void;
}

const RightOffsetButton = styled(Button)`
  && {
    margin-left: 10%;
  }
`;

const GoalsFooter: SFC<IProps> = (props) => {
  return (
    <Fragment>
      <Grid item lg={7}/>
      <Grid item lg={4}>
        <RightOffsetButton variant='raised' color='secondary' fullWidth onClick={props.onClickSetAndBrowse}>
          Set Goals & Browse
        </RightOffsetButton>
      </Grid>
      <Grid item lg={1}/>
    </Fragment>
  )
};

export default GoalsFooter;
