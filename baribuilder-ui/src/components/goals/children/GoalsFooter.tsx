import {Button, Grid} from '@material-ui/core';
import * as React from 'react';
import {Fragment, SFC} from 'react';

interface IProps {
  onClickSetAndBrowse: () => void;
}

const GoalsFooter: SFC<IProps> = (props) => {
  return (
    <Fragment>
      <Grid item lg={1}/>
      <Grid item lg={10}>
        <Button variant='raised' color='secondary' fullWidth onClick={props.onClickSetAndBrowse}>
          Set Goals & Browse
        </Button>
      </Grid>
      <Grid item lg={1}/>
    </Fragment>
  )
};

export default GoalsFooter;
