import {Grid} from '@material-ui/core';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import {lifecycle} from "recompose";
import styled from 'styled-components';
import drGHeadshot from '../../assets/G-circle.png';
import tadasHeadshot from '../../assets/Tadas-circle.png';
import Footer from '../footer/Footer';
import {FooterContainerGrid} from '../footer/Footer.style';
import Navbar from '../navbar/Navbar';
import {media} from '../style/Core';
import {Body, Header, Header2} from '../style/Typography';

const AboutContainerDiv = styled.div`
  margin-top: 5vh;
  margin-left: 8px;
  margin-right: 8px;
  margin-bottom: 5vh;
  
  ${media.tablet`
    margin-left: 20vw;
    margin-right: 20vw;
  `}
`;

const HeadshotGridContainer = styled(Grid)`
  padding: 0 5vw 5vh 5vw;
  text-align: center;
`;

const HeadshotImg = styled.img`
  width: 100%;
  max-width: 260px;
`;

const AboutScreen: SFC = () => {
  return (
    <Fragment>
      <Navbar/>
      <AboutContainerDiv>
        <p>
          <Header dark>Our Mission</Header>
        </p>
        <p>
          <Body dark>
          Our mission with BariBuilder is to spread transparent information about supplement products to you, bariatric
          patients, in order to improve your medical outcomes and lower your costs.
          </Body>
        </p>
        <p>
          <Body dark>
          As bariatric patients, you’re going to be dealing with supplementation every day for the rest of your life. We
          believe that bariatric supplementation post-op is challenging to navigate for any consumer.
          </Body>
        </p>
        <p>
          <Body dark>
          There are at least two major issues with bariatric patient supplementation today:
          </Body>
        </p>
        <br/>
        <p>
          <Header2 dark>1) A "one size fits all" approach is not medically optimal</Header2>
        </p>
        <p>
          <Body dark>
          As a patient, it’s likely that at some point in your weight loss surgery journey you’ve adopted a vitamin
          regimen that was not specifically designed for you and your body. No two people are the same: if you simply
          followed generic surgery-based guidelines or never had bloodwork done, your vitamin regimen was not
          personalized.
          </Body>
        </p>
        <p>
          <Body dark>
          As we’ve written about in more depth, a “one size fits all” regimen like this is almost always a mistake.
          </Body>
        </p>
        <p>
          <Body dark>
          As soon you have bloodwork results, you’re probably going to be high or low in something or other. At that
          point, the “one size fits all” regimen concept breaks. So if you continue what you’re doing, you are likely to
          end up deficient or in excess of something or other.
          </Body>
        </p>
        <br/>
        <p>
          <Header2 dark>2) Most patients don’t realize that there is a low-cost alternative</Header2>
        </p>
        <p>
          <Body dark>
          Many patients think they are stuck paying over $50 - sometimes almost as much as $200 - per month for
          bariatric
          vitamins. This is a large out-of-pocket expense, and it’s no surprise that a financial rough patches often
          leave
          patients forced to choose between vitamins/health and other basic needs.
          </Body>
        </p>
        <p>
          <Body dark>
          The fact is that you can almost always get the bariatric vitamins you need for as low as $15-20 per month.
          Yes,
          this often means taking more pills of smaller dosages, but if that’s the difference between being able to
          afford
          vitamins and not - that’s a big deal.
          </Body>
        </p>
        <p>
          <Body dark>
          The ability to save $30-180 every month for the rest of your life is potentially a life-altering amount of
          money: tens of thousands of dollars.
          </Body>
        </p>
        <p>
          <Body dark>
          And that’s where BariBuilder comes in. We’re not tied to any particular brand, so we’re leveraging an enormous
          catalog of all kinds of brands to help you piece together low-cost, high-quality options to get you exactly
          what
          your body needs.
          </Body>
        </p>
        <br/>
        <p>
          <Header dark>Our Story</Header>
        </p>
        <p>
          <Body dark>
          We began as a bariatric vitamin retailer: Vita.G (vitaglab.com). It started as a project run by Dr. Gintas “G”
          Antanavicius, an internationally renowned bariatric surgeon, and his son, Tadas, an entrepreneur and software
          engineer.
          </Body>
        </p>
        <p>
          <Body dark>
          As we began producing products and dove deeper into understanding the needs of the bariatric patient
          community,
          we realized the critical shortfalls in the existing bariatric vitamin industry as discussed above.
          </Body>
        </p>
        <p>
          <Body dark>
          We had this realization after spending time speaking with patients on Facebook support groups. They made their
          discontent with the existing vitamin market clear to us, and we weren’t helping them much by adding another
          similar vitamin product to the fray.
          </Body>
        </p>
        <p>
          <Body dark>
          So we shifted our focus to BariBuilder. BariBuilder was born from listening to patients’ wants and needs: we
          continue to listen to patients, and will eagerly respond to your feedback at feedback@baribuilder.com.
          </Body>
        </p>
        <p>
          <Body dark>
          Vita.G and BariBuilder continue to be family owned and operated. You can be sure that there are no corporate
          or
          shareholder interests pushing for neverending profit growth. Behind the name is just a small group of people
          who
          want to spend part of their careers creating a helpful, sustainable business.
          </Body>
        </p>
        <br/>
        <p>
          <Header dark>Our Team</Header>
          <br/><br/><br/>
          <Grid container justify='center' alignItems='center'>
            <HeadshotGridContainer item xs={12} md={6}>
              <HeadshotImg src={drGHeadshot} alt='Dr. G Photo'/>
            </HeadshotGridContainer>
            <HeadshotGridContainer item xs={12} md={6}>
              <HeadshotImg src={tadasHeadshot} alt='Tadas Photo'/>
            </HeadshotGridContainer>
          </Grid>
        </p>
      </AboutContainerDiv>
      <FooterContainerGrid container>
        <Footer/>
      </FooterContainerGrid>
    </Fragment>
  )
};

export default lifecycle({
  componentDidMount() {
    window.scrollTo(0, 0);
  }
})(AboutScreen);
