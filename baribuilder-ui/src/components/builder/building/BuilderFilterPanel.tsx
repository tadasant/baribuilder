import {Grid} from '@material-ui/core';
import gql from "graphql-tag";
import {upperFirst} from 'lodash';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import styled from 'styled-components';
import Sketch from '../../../app/style/SketchVariables';
import {GetEnumValuesOfCategoriesAndForms} from '../../../typings/gql/GetEnumValuesOfCategoriesAndForms';
import {EmptyRow} from '../../style/Layout';
import {Body, Subcaption} from '../../style/Typography';
import {ROOT_CATEGORY} from '../BuilderScreen';

interface IProps {
  selectedCategory: string;
}

type QueryOutputProps = ChildDataProps<{}, GetEnumValuesOfCategoriesAndForms>;

const withData = graphql<IProps, GetEnumValuesOfCategoriesAndForms>(gql`
    query GetEnumValuesOfCategoriesAndForms {
        CATEGORY: __type(name: "CATEGORY") {
            enumValues {
                name
            }
        }
        FORMS: __type(name: "FORM") {
            enumValues {
                name
            }
        }
    }
`);

const InnerGrid = styled(Grid)`
  border-right: 1px solid ${Sketch.color.accent.grey};
`;

const GreyLargeBody = styled(Body)`
  text-align: left;
  color: ${Sketch.color.accent.grey};
  font-size: 24px;
`;
// TODO standardize this typography

const LeftAlignBoldCaptionSizedBody = styled(Body)`
  && {
    text-align: left;
    font-weight: bold;
    font-size: ${Sketch.typography.caption.fontSize};
  }
`;

const LeftAlignCaption = styled(Subcaption)`
  text-align: left;
`;

const prettifyEnumString = (s: string): string => {
  return s.toLowerCase().split('_').map(str => upperFirst(str)).join(' ');
};

// Pure
const BuilderFilterPanelPure: SFC<QueryOutputProps & IProps> = ({data: {CATEGORY, FORMS}, selectedCategory}) => {

  return (
    <Grid container alignContent='flex-start'>
      <EmptyRow mobile='1px'/>
      <InnerGrid item container direction='row'>
        <Grid item lg={1}/>
        <Grid item lg={10} container direction='row' alignContent='flex-start'>
          <Grid item lg={12}>
            <GreyLargeBody>Category</GreyLargeBody>
          </Grid>
          <EmptyRow mobile='0px'/>
          <Grid item lg={12}>
            {
              selectedCategory === ROOT_CATEGORY
                ? <LeftAlignBoldCaptionSizedBody dark>{prettifyEnumString(ROOT_CATEGORY)}</LeftAlignBoldCaptionSizedBody>
                : <LeftAlignCaption dark>{prettifyEnumString(ROOT_CATEGORY)}</LeftAlignCaption>
            }
          </Grid>
          <Grid item container lg={12}>
            {CATEGORY && CATEGORY.enumValues ? CATEGORY.enumValues.map(category => (
              <Fragment key={category.name}>
                <Grid item lg={1}/>
                <Grid item lg={11}>
                  {
                    selectedCategory === category.name
                      ? <LeftAlignBoldCaptionSizedBody dark>{prettifyEnumString(category.name)}</LeftAlignBoldCaptionSizedBody>
                      : <LeftAlignCaption dark>{prettifyEnumString(category.name)}</LeftAlignCaption>
                  }
                </Grid>
              </Fragment>
            )) : null}
          </Grid>
        </Grid>
        <Grid item lg={1}/>
      </InnerGrid>
      <EmptyRow mobile='1px'/>
    </Grid>
  )
};

export default withData(BuilderFilterPanelPure);
