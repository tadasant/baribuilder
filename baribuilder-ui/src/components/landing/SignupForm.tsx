import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid/Grid';
import * as React from 'react';
import {Component, Fragment} from 'react';
import {NearFullWidthTextField} from '../style/CustomMaterial';

const postToMailchimp = (email: string) => {
  const path = "https://baribuilder.us18.list-manage.com/subscribe/post?u=cfcfc2dfdd3593e3bb9d472f0&amp;id=c1667f6a02";
  const method = 'post';

  const form = document.createElement("form");
  form.setAttribute("method", method);
  form.setAttribute("action", path);
  form.setAttribute("target", "_blank");

  const hiddenField = document.createElement("input");
  hiddenField.setAttribute("type", "hidden");
  hiddenField.setAttribute("name", 'EMAIL');
  hiddenField.setAttribute("value", email);
  form.appendChild(hiddenField);

  document.body.appendChild(form);
  form.submit();
};

class SignupForm extends Component {
  private inputRef: React.RefObject<any>;

  constructor(props: {}) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputRef = React.createRef();
  }

  handleSubmit() {
    postToMailchimp(this.inputRef.current.value);
  }

  render() {
    return (
      <Fragment>
        <Grid item xs={1} lg={3}/>
        <Grid item xs={6} lg={4}>
          <NearFullWidthTextField
            inputRef={this.inputRef}
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