import {Grid, Typography} from '@material-ui/core';
import gql from "graphql-tag";
import {upperFirst} from 'lodash';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {compose, pure} from 'recompose';
import {GetEnumValuesOfCategoriesAndForms} from '../../../typings/gql/GetEnumValuesOfCategoriesAndForms';
import {headerHeight} from '../../Header';
import {EmptyRow} from '../../style/Layout';
import {builderHeaderHeight} from './BuilderHeader';

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

// Pure
const BuilderLeftPanelPure: SFC<DataOutputProps> = ({data: {CATEGORY, FORMS}}) => {
  return (
    <Grid container alignContent='flex-start'
          style={{border: '1px solid red', height: `calc(100vh - ${headerHeight} - ${builderHeaderHeight})`}}>
      <EmptyRow mobile='8px'/>
      <Grid item container direction='row' style={{borderRight: '1px solid grey', height: 'calc(100% - 8px)'}}>
        <Grid item lg={1}/>
        <Grid item lg={10} container direction='row' alignContent='flex-start'>
          <Grid item lg={12}>
            <Typography variant='display1'>Show category</Typography>
          </Grid>
          <EmptyRow mobile='16px'/>
          <Grid item lg={12}>
            <Typography variant='body2' style={{fontWeight: 'bold'}}>All Products</Typography>
          </Grid>
          <Grid item container lg={12}>
            {CATEGORY && CATEGORY.enumValues ? CATEGORY.enumValues.map(category => (
              <Fragment>
                <Grid item lg={1}/>
                <Grid item lg={11}>
                  {category.name.toLowerCase().split('_').map(str => upperFirst(str)).join(' ')}
                </Grid>
              </Fragment>
            )) : null}
          </Grid>
        </Grid>
        <Grid item lg={1}/>
      </Grid>
    </Grid>
  )
};

export default enhance(BuilderLeftPanelPure);
