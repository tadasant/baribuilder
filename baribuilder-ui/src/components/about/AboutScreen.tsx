import {Grid} from '@material-ui/core';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import {lifecycle} from "recompose";
import styled from 'styled-components';
import drGHeadshot from '../../assets/G-circle.png';
import tadasHeadshot from '../../assets/Tadas-circle.png';
import {UndecoratedAnchor} from '../footer/ContactInformationPanel';
import Footer from '../footer/Footer';
import {FooterContainerGrid} from '../footer/Footer.style';
import Navbar from '../navbar/Navbar';
import {media} from '../style/Core';
import {Body, Caption, Header, Header2} from '../style/Typography';

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
  padding: 0 3vw 3vh 3vw;
  text-align: center;
`;

const HeadshotImg = styled.img`
  width: 100%;
  max-width: 260px;
`;

const CenteredP = styled.p`
  text-align: center;
`;

const MemberNameP = styled.p`
  margin-block-end: 0px;
`;

const MemberDetailP = styled.p`
  margin-block-end: 0px;
  margin-block-start: 0px;
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
          Our mission with BariBuilder is to <b>spread transparent information about supplement products to you, bariatric patients, in order to improve your medical outcomes and lower your costs</b>.
          </Body>
        </p>
        <p>
          <Body dark>
          As bariatric patients, you’re going to be dealing with supplementation every day for the rest of your life.  We believe that bariatric supplementation is challenging to navigate for any consumer.
          </Body>
        </p>
        <p>
          <Body dark>
          There are at least three major issues with bariatric patient supplementation today:
          </Body>
        </p>
        <br/>
        <p>
          <Header2 dark>1) Shopping for vitamins is a mathematical mess</Header2>
        </p>
        <p>
          <Body dark>
          If you try to find vitamin products from scratch, you end up wasting hours and hours sifting through product pages, trying to find Supplement Facts images, and then tallying up the different units and ingredient totals.
          </Body>
        </p>
        <p>
          <Body dark>
          And then, you look at the prices. That’s another piece of the puzzle: that sticker price is for how many bottles? How many tablets in a bottle? How many tablets in a serving?
          </Body>
        </p>
        <p>
          <Body dark>
          To find an ideal regimen, you’d have to do this tedious math over and over again for countless numbers of products that you can mix and match in different ways. Not to mention, some products might get discontinued. Or new - better - brands might enter the market next week. Then you’re back to square one.
          </Body>
        </p>
        <br/>
        <p>
          <Header2 dark>2) Most patients don’t realize that there is a low-cost alternative</Header2>
        </p>
        <p>
          <Body dark>
          Many patients think they are stuck paying over $50 - sometimes almost as much as $200 - per month for bariatric vitamins. This is a large out-of-pocket expense, and it’s no surprise that financial rough patches often leave patients forced to choose between vitamins/health and other basic needs.
          </Body>
        </p>
        <p>
          <Body dark>
          The fact is that you can almost always get the bariatric vitamins you need for as low as $15-20 per month. Yes, this often means taking more pills of smaller dosages, but if that’s the difference between being able to afford vitamins and not - that’s a big deal.
          </Body>
        </p>
        <p>
          <Body dark>
          The ability to save $30-180 every month for the rest of your life is potentially a life-altering amount of money: tens of thousands of dollars.
          </Body>
        </p>
        <br />
        <p>
          <Header2 dark>3) A "one size fits all" approach is not medically optimal</Header2>
        </p>
        <p>
          <Body dark>
          As a patient, it’s likely that at some point in your weight loss surgery journey you’ve adopted a vitamin regimen that was not specifically designed for you and your body. No two people are the same: if you simply followed generic surgery-based guidelines or never had bloodwork done, your vitamin regimen was not personalized.
          </Body>
        </p>
        <p>
          <Body dark>
          As <a href='https://blog.baribuilder.com/wls-patients-need-personalized-bariatric-vitamin-regimens/' target='_blank' rel='noopener'>we’ve written about in more depth</a>, a “one size fits all” regimen like this is almost always a mistake.
          </Body>
        </p>
        <p>
          <Body dark>
          As soon as you have bloodwork results, you’re probably going to be high or low in something or other. At that point, the “one size fits all” regimen concept breaks. So if you continue what you’re doing, you are likely to end up deficient or in excess of some particular vitamin level.
          </Body>
        </p>
        <br />
        <br />
        <p>
          <Body dark>
          And <b>all of that is where BariBuilder comes in</b>. We’re leveraging an enormous catalog of all kinds of brands to help you piece together low-cost, high-quality options to get you exactly what your body needs. All while letting our software do the complicated math for you and present it in easy-to-understand formats.
          </Body>
        </p>
        <br/>
        <p>
          <Header dark>Our Story</Header>
        </p>
        <p>
          <Body dark>
          We began as a bariatric vitamin retailer: Vita.G (<a href='https://vitaglab.com/' target='_blank' rel='noopener nofollow'>vitaglab.com</a>). It started as a project run by Dr. Gintas “G”
          Antanavicius, an internationally renowned bariatric surgeon, and his son, Tadas, an entrepreneur and software
          engineer.
          </Body>
        </p>
        <p>
          <Body dark>
          As we began producing products and dove deeper into understanding the needs of the bariatric patient community, we realized the critical shortfalls in the existing bariatric vitamin industry as discussed above.
          </Body>
        </p>
        <p>
          <Body dark>
          So we shifted our focus to BariBuilder. BariBuilder was born from listening to patients’ wants and needs: we continue to listen to patients, and will eagerly respond to your feedback at <a href='mailto:feedback@baribuilder.com'>feedback@baribuilder.com</a>.
          </Body>
        </p>
        <p>
          <Body dark>
          Vita.G and BariBuilder continue to be family owned and operated. Behind the name is a small group of people who want to spend part of their careers creating a helpful, sustainable business.
          </Body>
        </p>
        <br/>
        <p>
          <CenteredP>
            <Header dark>Our Team</Header>
          </CenteredP>
          <br/><br/><br/>
          <Grid container justify='center' alignItems='flex-start'>
            <HeadshotGridContainer item xs={12} md={6}>
              <HeadshotImg src={drGHeadshot} alt='Dr. G Photo'/>
              <br/>
              <MemberNameP>
                <Body dark>
                <UndecoratedAnchor href='https://www.linkedin.com/in/gintaras-antanavicius-md-52b31743/' target='_blank'
                                   rel='nofollow noopener'>
                  Dr. Gintas "G" Antanavicius
                </UndecoratedAnchor>
                </Body>
              </MemberNameP>
              <MemberDetailP>
                <Caption dark>
                  Bariatric Surgeon, MD, FACS, FASMBS
                </Caption>
              </MemberDetailP>
              <MemberDetailP>
                <Caption dark>
                  Associate Professor of Surgery
                </Caption>
              </MemberDetailP>
            </HeadshotGridContainer>
            <HeadshotGridContainer item xs={12} md={6}>
              <HeadshotImg src={tadasHeadshot} alt='Tadas Photo'/>
              <br/>
              <MemberNameP>
                <Body dark>
                <UndecoratedAnchor href='https://www.linkedin.com/in/antanavicius/' target='_blank'
                                   rel='nofollow noopener'>
                  Tadas Antanavicius
                </UndecoratedAnchor>
                </Body>
              </MemberNameP>
              <MemberDetailP>
                <Caption dark>
                  Entrepreneur and Software Engineer
                </Caption>
              </MemberDetailP>
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
