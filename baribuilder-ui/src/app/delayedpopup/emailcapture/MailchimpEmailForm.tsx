import {Grid} from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import * as React from 'react';
import {Component, Fragment, KeyboardEvent} from 'react';
import {CenteredTextGrid, EmptyRow} from '../../../components/style/Layout';
import {Caption} from '../../../components/style/Typography';
import {trackPopupAction} from '../../../lib/analytics';
import Sketch from '../../style/SketchVariables';
import {FormTextField} from './MailchimpEmailForm.style';

const postToMailchimp = (email: string, name: string) => {
  const path = "https://baribuilder.us18.list-manage.com/subscribe/post?u=cfcfc2dfdd3593e3bb9d472f0&amp;id=c1667f6a02";
  const method = 'post';

  const form = document.createElement("form");
  form.setAttribute("method", method);
  form.setAttribute("action", path);
  form.setAttribute("target", "_blank");

  const hiddenEmailField = document.createElement("input");
  hiddenEmailField.setAttribute("type", "hidden");
  hiddenEmailField.setAttribute("name", 'EMAIL');
  hiddenEmailField.setAttribute("value", email);
  form.appendChild(hiddenEmailField);

  const hiddenNameField = document.createElement("input");
  hiddenNameField.setAttribute("type", "hidden");
  hiddenNameField.setAttribute("name", 'FNAME');
  hiddenNameField.setAttribute("value", name);
  form.appendChild(hiddenNameField);

  document.body.appendChild(form);
  form.submit();
};


const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validateEmail = (email: string) => {
  return re.test(String(email).toLowerCase());
};

interface IProps {
  onSubmit: () => void;
}

interface IState {
  email: string
  name: string
}

class MailchimpEmailForm extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state = {
      email: '',
      name: ''
    };
  }

  handleSubmit() {
    if (validateEmail(this.state.email)) {
      postToMailchimp(this.state.email, this.state.name);
      trackPopupAction('email captured');
      this.props.onSubmit();
    }
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.handleSubmit();
    }
  }

  render() {
    return (
      <Fragment>
        <Grid item xs={6} container justify='center'>
          <FormTextField
            placeholder='Jane'
            label='first name'
            inputProps={{type: 'firstname', style: {color: Sketch.color.accent.black}}}
            value={this.state.name}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => this.setState({name: event.target.value})}
            onKeyPress={this.handleKeyPress}
          />
        </Grid>
        <Grid item xs={6} container justify='center'>
          <FormTextField
            placeholder='janedoe@gmail.com'
            label='email'
            inputProps={{type: 'email', style: {color: Sketch.color.accent.black}}}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => this.setState({email: event.target.value})}
            onKeyPress={this.handleKeyPress}
          />
        </Grid>
        <EmptyRow/>
        <Grid item xs={1} md={4}/>
        <Grid item xs={10} md={4} container>
          <Grid item xs={12}>
            <Button
              color='default'
              fullWidth
              variant='contained'
              onClick={this.handleSubmit}
              disabled={!validateEmail(this.state.email)}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={1} md={4}/>
        <Grid item xs={1} md={2}/>
        <CenteredTextGrid item xs={10} md={8}>
          <Caption dark>
            This popup will dismiss after you have verified your email. You are free to unusubscribe at any time.
          </Caption>
        </CenteredTextGrid>
        <Grid item xs={1} md={2}/>
      </Fragment>
    )
  }
}

export default MailchimpEmailForm;
