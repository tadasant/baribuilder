import {Grid, Typography} from '@material-ui/core';
import gql from "graphql-tag";
import {upperFirst} from 'lodash';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {compose, pure} from 'recompose';
import styled from 'styled-components';
import {TypographyHeaderGrey} from '../../../app/style/MuiTheming';
import Sketch from '../../../app/style/SketchVariables';
import {GetEnumValuesOfCategoriesAndForms} from '../../../typings/gql/GetEnumValuesOfCategoriesAndForms';
import {EmptyRow} from '../../style/Layout';

// GraphQL HOC props (output)
// TODO pass in selected category & filters
type DataOutputProps = ChildDataProps<{}, GetEnumValuesOfCategoriesAndForms>;

const data = graphql<{}, GetEnumValuesOfCategoriesAndForms>(gql`
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

const enhance = compose<DataOutputProps, {}>(
  data,
  pure,
);

const InnerGrid = styled(Grid)`
  border-right: 1px solid ${Sketch.color.accent.grey};
`;

// Pure
const BuilderLeftPanelPure: SFC<DataOutputProps> = ({data: {CATEGORY, FORMS}}) => {
  return (
    <Grid container alignContent='flex-start'>
      <EmptyRow mobile='1px'/>
      <InnerGrid item container direction='row'>
        <Grid item lg={1}/>
        <Grid item lg={10} container direction='row' alignContent='flex-start'>
          <Grid item lg={12}>
            <TypographyHeaderGrey variant='display1'>Show category</TypographyHeaderGrey>
          </Grid>
          <EmptyRow mobile='0px'/>
          <Grid item lg={12}>
            <Typography variant='body2' style={{fontWeight: 'bold'}}>All Products</Typography>
          </Grid>
          <Grid item container lg={12}>
            {CATEGORY && CATEGORY.enumValues ? CATEGORY.enumValues.map(category => (
              <Fragment key={category.name}>
                <Grid item lg={1}/>
                <Grid item lg={11}>
                  {category.name.toLowerCase().split('_').map(str => upperFirst(str)).join(' ')}
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

export default enhance(BuilderLeftPanelPure);
