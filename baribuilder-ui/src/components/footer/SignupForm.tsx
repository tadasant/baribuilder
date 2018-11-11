import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid/Grid';
import {KeyboardEvent} from 'react';
import * as React from 'react';
import {Component, Fragment} from 'react';
import Sketch from '../../app/style/SketchVariables';
import {NearFullWidthTextField} from '../style/CustomMaterial';
import {CenteredTextGrid, EmptyRow} from '../style/Layout';
import {Body} from '../style/Typography';

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
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.inputRef = React.createRef();
  }

  handleSubmit() {
    postToMailchimp(this.inputRef.current.value);
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.handleSubmit();
    }
  }

  render() {
    return (
      <Fragment>
        <CenteredTextGrid item xs={12}>
          <Body>
          Subscribe to BariBuilder product announcements & updates
          </Body>
        </CenteredTextGrid>
        <EmptyRow/>
        <Grid item xs={12}>
          <NearFullWidthTextField
            inputRef={this.inputRef}
            placeholder='Enter Your Email'
            inputProps={{type: 'email', style: {color: Sketch.color.accent.white}}}
            onKeyPress={this.handleKeyPress}
          />
        </Grid>
        <EmptyRow/>
        <Grid item xs={12}>
          <Button
            color='default'
            fullWidth
            variant='contained'
            onClick={this.handleSubmit}
          >
            Sign Up
          </Button>
        </Grid>
      </Fragment>
    )
  }
}

export default SignupForm;