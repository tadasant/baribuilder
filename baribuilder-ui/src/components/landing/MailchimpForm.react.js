import React, {Component} from 'react';
import {Body, Caption, Header2} from '../style/Typography';
import Button from '@material-ui/core/Button';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {EmptyRow} from '../style/Layout';

class MailchimpForm extends Component {
  constructor(props) {
    super(props);
    this.handleXButtonClick = this.handleXButtonClick.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.emailInput = React.createRef();
  }

  componentDidMount() {
    ReactPixel.pageView();
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  handleXButtonClick() {
    ReactGA.event({
      category: 'CTA',
      action: 'close',
      label: 'Closed CTA Modal'
    });
    this.props.onClose();
  }

  handleSubmitClick() {
    ReactGA.set({userId: this.emailInput.current.value});
    ReactGA.event({
      category: 'CTA',
      action: 'submit',
      label: 'Submit CTA Form'
    });
    ReactPixel.track('Lead');
  }

  handleBackClick() {
    this.props.history.push('/');
  }

  render() {
    return (
      <Grid container>
        <EmptyRow mobile='20px'/>
        <Grid item xs={2} />
        <Grid item xs={2}>
          <Button variant='outlined' color='secondary' onClick={this.handleBackClick}>&lt; Back</Button>
        </Grid>
        <Grid item xs={8} />
        <EmptyRow mobile='20px'/>
        <Grid item xs={1} sm={2} lg={3} />
        <Grid item xs={10} sm={8} lg={6}>
          <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css"/>
          <div id="mc_embed_signup">
            <form
              action="https://baribuilder.us18.list-manage.com/subscribe/post?u=cfcfc2dfdd3593e3bb9d472f0&amp;id=2c2fbaaaf2"
              method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate"
              novalidate>
              <div id="mc_embed_signup_scroll">
                <Header2 dark>Join our waiting list</Header2>
                <br/>
                <Caption dark>Leave us your information and you'll be the among the first to access a beta version of
                  BariBuilder. Your information will not be shared with anyone outside of the BariBuilder
                  team.</Caption>
                <br/>
                <Body dark>
                <div className="mc-field-group">
                  <label for="mce-EMAIL">Email Address <span className="asterisk">*</span>
                  </label>
                  <input type="email" name="EMAIL" className="required email" id="mce-EMAIL" ref={this.emailInput}/>
                </div>
                <div className="mc-field-group">
                  <label for="mce-FNAME">First Name <span className="asterisk">*</span> </label>
                  <input type="text" name="FNAME" className="" id="mce-FNAME"/>
                </div>
                <div className="mc-field-group">
                  <label for="mce-LNAME">Last Name </label>
                  <input type="text" name="LNAME" className="" id="mce-LNAME"/>
                </div>
                <div className="mc-field-group">
                  <label htmlFor="mce-MMERGE11">Location <span className="asterisk">*</span></label>
                  <input type="text" name="MMERGE11" className="" id="mce-MMERGE11" placeholder="e.g. New York, NY"/>
                </div>
                <div className="mc-field-group">
                  <label htmlFor="mce-MMERGE6">Nature of interest </label>
                  <select name="MMERGE6" className="" id="mce-MMERGE6">
                    <option value=""></option>
                    <option value="Bariatric Patient">Bariatric Patient</option>
                    <option value="Medical Professional">Medical Professional</option>
                    <option value="Work in vitamins/supplements industry">Work in vitamins/supplements industry</option>

                  </select>
                </div>
                <div className="mc-field-group">
                  <label for="mce-MMERGE4">(If patient) Type of surgery </label>
                  <select name="MMERGE4" className="" id="mce-MMERGE4">
                    <option value=""></option>
                    <option value="Lap Band">Lap Band</option>
                    <option value="Gastric Sleeve">Gastric Sleeve</option>
                    <option value="Gastric Bypass">Gastric Bypass</option>
                    <option value="Duodenal Switch (BPD-DS)">Duodenal Switch (BPD-DS)</option>
                    <option value="Loop DS / SADI / SIPS">Loop DS / SADI / SIPS</option>
                    <option value="Gastric Balloon">Gastric Balloon</option>
                    <option value="Other">Other</option>

                  </select>
                </div>
                <div className="mc-field-group size1of2">
                  <label htmlFor="mce-MMERGE8-month">Date of surgery </label>
                  <div className="datefield">
                    <span className="subfield monthfield"><input className="datepart " type="text" pattern="[0-9]*"
                                                                 placeholder="MM" size="2" maxLength="2"
                                                                 name="MMERGE8[month]" id="mce-MMERGE8-month"/></span> /
                    <span className="subfield dayfield"><input className="datepart " type="text" pattern="[0-9]*"
                                                               placeholder="DD" size="2" maxLength="2"
                                                               name="MMERGE8[day]" id="mce-MMERGE8-day"/></span> /
                    <span className="subfield yearfield"><input className="datepart " type="text" pattern="[0-9]*"
                                                                placeholder="YYYY" size="4" maxLength="4"
                                                                name="MMERGE8[year]" id="mce-MMERGE8-year"/></span>
                    <span className="small-meta nowrap">( mm / dd / yyyy )</span>
                  </div>
                </div>
                <div className="mc-field-group">
                  <label htmlFor="mce-MMERGE9">Bariatric Center </label>
                  <input type="text" name="MMERGE9" className="" id="mce-MMERGE9"
                         placeholder='Where you had surgery, or where you work.'/>
                </div>

                <div className="mc-field-group">
                  <label for="mce-MMERGE7">Commercial affiliations (related to supplements) </label>
                  <input type="text" name="MMERGE7" className="" id="mce-MMERGE7"
                         placeholder='Please disclose any conflicts of interest.'/>
                </div>
                <div className="mc-field-group">
                  <label htmlFor="mce-MMERGE10">Comments </label>
                  <input type="text" name="MMERGE10" className="" id="mce-MMERGE10"
                         placeholder="Feedback, thoughts, or just tell us why you're interested!"/>
                </div>
                <div id="mce-responses" className="clear">
                  <div className="response" id="mce-error-response" style={{display: 'none'}}/>
                  <div className="response" id="mce-success-response" style={{display: 'none'}}/>
                </div>
                <div style={{position: 'absolute', left: '-5000px', ariaHidden: true}}><input type="text"
                                                                                              name="b_cfcfc2dfdd3593e3bb9d472f0_2c2fbaaaf2"
                                                                                              tabindex="-1"/></div>
                </Body>
                <div className="clear">
                  <Button
                    type='submit'
                    onClick={this.handleSubmitClick}
                    color='secondary'
                    variant='raised'>
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </Grid>
        <Grid item xs={1} sm={2} lg={3} />
      </Grid>
    );
  }
}

MailchimpForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default withRouter(MailchimpForm);