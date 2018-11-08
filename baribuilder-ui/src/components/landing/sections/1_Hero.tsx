import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import * as React from 'react';
import {Component, Fragment} from 'react';
import {toast} from 'react-toastify';
import {generateTrackNavClick} from '../../../lib/analytics';
import {CenteredTextGrid} from '../../goals/GoalsScreenPure';
import {UndecoratedLink} from '../../style/CustomMaterial';
import {EmptyRow} from '../../style/Layout';
import {Body, Header} from '../../style/Typography';
import {HeroGrid} from './1_Hero.style';


class Hero extends Component<{}> {
  constructor(props: {}) {
    super(props);
    this.handleCTAClick = this.handleCTAClick.bind(this);
  }


  handleCTAClick() {
    if (window.innerWidth < 1119) {
      toast.warn('Warning: BariBuilder is not optimized for small screens. Consider using a desktop/laptop computer.', {
        autoClose: 10000,
      });
    }
    generateTrackNavClick('Top Build CTA')();
  }


  render() {
    return (
      <HeroGrid item container alignContent='flex-start'>
        <EmptyRow/>
        <Fragment>
          <Hidden only='xs' lgUp>
            <Grid item sm={1}/>
          </Hidden>
          <CenteredTextGrid item xs={12} sm={10} lg={12}>
            <Header dark>The easiest way for bariatric patients to find vitamins</Header>
          </CenteredTextGrid>
          <Hidden only='xs' lgUp>
            <Grid item sm={1}/>
          </Hidden>
        </Fragment>
        <Fragment>
          <Hidden only='xs' lgUp>
            <Grid item sm={1}/>
          </Hidden>
          <CenteredTextGrid item xs={12} sm={10} lg={12}>
            <Body dark>Compare supplement products to find what is cost-effective for you.</Body>
          </CenteredTextGrid>
          <Hidden only='xs' lgUp>
            <Grid item sm={1}/>
          </Hidden>
        </Fragment>
        <EmptyRow/>
        <Fragment>
          <Grid item xs={3}/>
          <Grid item xs={6} container direction='row'>
            <Grid item xs={12}>
              <UndecoratedLink to={'/goals'} onClick={this.handleCTAClick}>
                <Button variant='contained' fullWidth color='primary'>
                  Get Started
                </Button>
              </UndecoratedLink>
            </Grid>
          </Grid>
          <Grid item xs={3}/>
        </Fragment>
      </HeroGrid>
    );
  }
}

export default Hero;
