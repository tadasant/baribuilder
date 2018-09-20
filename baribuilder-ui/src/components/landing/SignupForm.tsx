import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField/TextField';
import * as React from 'react';
import {Component, Fragment} from 'react';
import styled from 'styled-components';

const NearFullWidthTextField = styled(TextField)`
  width: 95%;
`;

class SignupForm extends Component {
  constructor(props: {}) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    console.log('Submitted');
  }

  render() {
    return (
      <Fragment>
        <Grid item xs={1} lg={3}/>
        <Grid item xs={6} lg={4}>
          <NearFullWidthTextField
            placeholder='Email Address'
            inputProps={{type: 'email'}}
          />
        </Grid>
        <Grid item xs={4} lg={2}>
          <Button
            color='secondary'
            fullWidth
            variant='raised'
            onClick={this.handleSubmit}
          >
            Get Updates
          </Button>
        </Grid>
        <Grid item xs={1} lg={3}/>
      </Fragment>
    )
  }
}

export default SignupForm;