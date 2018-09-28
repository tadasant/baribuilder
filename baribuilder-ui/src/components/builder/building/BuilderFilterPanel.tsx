import {Grid} from '@material-ui/core';
import gql from "graphql-tag";
import {upperFirst} from 'lodash';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {RouteComponentProps, withRouter} from 'react-router';
import {compose} from 'recompose';
import styled from 'styled-components';
import Sketch from '../../../app/style/SketchVariables';
import {GetEnumValuesOfCategoriesAndForms} from '../../../typings/gql/GetEnumValuesOfCategoriesAndForms';
import {EmptyRow} from '../../style/Layout';
import {Body} from '../../style/Typography';
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

const SelectedCategoryFont = styled(Body)`
  && {
    text-align: left;
    font-weight: bold;
    font-size: ${Sketch.typography.caption.fontSize};
    cursor: pointer;
  }
`;

const UnselectedCategoryFont = styled(Body)`
   text-align: left;
   font-size: ${Sketch.typography.caption.fontSize};
   cursor: pointer;
`;

const prettifyEnumString = (s: string): string => {
  return s.toLowerCase().split('_').map(str => upperFirst(str)).join(' ');
};

const enhance = compose(
  withData,
  withRouter,
);

// Pure
const BuilderFilterPanelPure: SFC<QueryOutputProps & IProps & RouteComponentProps> = ({data: {CATEGORY, FORMS}, location}) => {
  const pathnameTokens = location.pathname.split('/');
  const selectedCategory = pathnameTokens[pathnameTokens.length - 1].toUpperCase();
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
            {selectedCategory === ROOT_CATEGORY
              ? <SelectedCategoryFont dark>{prettifyEnumString(ROOT_CATEGORY)}</SelectedCategoryFont>
              : <UnselectedCategoryFont dark>{prettifyEnumString(ROOT_CATEGORY)}</UnselectedCategoryFont>
            }
          </Grid>
          <Grid item container lg={12}>
            {CATEGORY && CATEGORY.enumValues ? CATEGORY.enumValues.map(category => (
              <Fragment key={category.name}>
                <Grid item lg={1}/>
                <Grid item lg={11}>
                  {selectedCategory === category.name
                    ? <SelectedCategoryFont
                      dark>{prettifyEnumString(category.name)}</SelectedCategoryFont>
                    : <UnselectedCategoryFont dark>{prettifyEnumString(category.name)}</UnselectedCategoryFont>
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

export default enhance(BuilderFilterPanelPure);
