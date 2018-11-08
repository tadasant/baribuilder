import {Chip, Grid, MenuItem, Select} from '@material-ui/core';
import gql from "graphql-tag";
import {upperFirst} from 'lodash';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {RouteComponentProps, withRouter} from 'react-router';
import {compose, withState} from 'recompose';
import styled from 'styled-components';
import Sketch from '../../../app/style/SketchVariables';
import {GetEnumValuesOfCategoriesAndForms} from '../../../typings/gql/GetEnumValuesOfCategoriesAndForms';
import {UndecoratedLink} from '../../style/CustomMaterial';
import {EmptyRow} from '../../style/Layout';
import {Body} from '../../style/Typography';
import {IFilters, ROOT_CATEGORY, TSetFiltersFunc} from '../CatalogScreen';

interface IProps {
  selectedCategory: string;
  activeFilters: IFilters;
  setFilters: TSetFiltersFunc;
}

type QueryOutputProps = ChildDataProps<IProps, GetEnumValuesOfCategoriesAndForms>;

const withData = graphql<IProps, GetEnumValuesOfCategoriesAndForms>(gql`
    query GetEnumValuesOfCategoriesAndForms {
        CATEGORIES: __type(name: "CATEGORY") {
            enumValues {
                name
            }
        }
        FORMS: __type(name: "FORM") {
            enumValues {
                name
            }
        }
        BRANDS: __type(name: "BRAND") {
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
  }
`;

const UnselectedCategoryFont = styled(Body)`
  text-align: left;
  font-size: ${Sketch.typography.caption.fontSize};
`;

const UnselectedCategoryFontWithPointer = styled(UnselectedCategoryFont)`
  cursor: pointer;
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FullWidthSelect = styled(Select)`
  width: 100%;
`;

export const prettifyEnumString = (s: string): string => {
  return s.toLowerCase().split('_').map(str => upperFirst(str)).join(' ');
};

const enhance = compose<IProps & QueryOutputProps & IPropsState & RouteComponentProps, IProps>(
  withState<IProps, boolean, 'showAllCategories', 'setShowAllCategories'>(
    'showAllCategories',
    'setShowAllCategories',
    false,
  ),
  withData,
  withRouter,
);

interface IPropsState {
  showAllCategories: boolean
  setShowAllCategories: (state: boolean) => boolean
}

const BuilderFilterPanelPure: SFC<QueryOutputProps & IProps & RouteComponentProps & IPropsState> = ({data: {CATEGORIES, FORMS, BRANDS}, selectedCategory, activeFilters, setFilters, showAllCategories, setShowAllCategories}) => {
  const categoriesToShow = CATEGORIES && CATEGORIES.enumValues ? showAllCategories ? CATEGORIES.enumValues : CATEGORIES.enumValues.slice(0, 5) : [];
  return (
    <Grid container alignContent='flex-start'>
      <EmptyRow mobile='1px'/>
      <InnerGrid item container direction='row'>
        <Grid item xs={1}/>
        <Grid item xs={10} container direction='row' alignContent='flex-start'>
          <Grid item xs={12}>
            <GreyLargeBody>Category</GreyLargeBody>
          </Grid>
          <EmptyRow mobile='0px'/>
          <Grid item xs={12}>
            <UndecoratedLink to={`/browse/${ROOT_CATEGORY.toLowerCase()}`}>
              {selectedCategory === ROOT_CATEGORY
                ? <SelectedCategoryFont dark>{prettifyEnumString(ROOT_CATEGORY)}</SelectedCategoryFont>
                : <UnselectedCategoryFont dark>{prettifyEnumString(ROOT_CATEGORY)}</UnselectedCategoryFont>
              }
            </UndecoratedLink>
          </Grid>
          <Grid item container xs={12}>
            {categoriesToShow.map(category => (
              <Fragment key={category.name}>
                <Grid item xs={1}/>
                <Grid item xs={11}>
                  <UndecoratedLink to={`/browse/${category.name.toLowerCase()}`}>
                    {selectedCategory === category.name
                      ? <SelectedCategoryFont
                        dark>{prettifyEnumString(category.name)}</SelectedCategoryFont>
                      : <UnselectedCategoryFont dark>{prettifyEnumString(category.name)}</UnselectedCategoryFont>
                    }
                  </UndecoratedLink>
                </Grid>
              </Fragment>
            ))}
            {
              showAllCategories
                ? null
                : (
                  <Fragment>
                    <Grid item xs={1}/>
                    <Grid item xs={11}>
                      <UnselectedCategoryFontWithPointer dark onClick={() => setShowAllCategories(true)}>...</UnselectedCategoryFontWithPointer>
                    </Grid>
                  </Fragment>
                )
            }
          </Grid>
          <EmptyRow/>
          <Grid item xs={12}>
            <GreyLargeBody>Filters</GreyLargeBody>
          </Grid>
          <EmptyRow/>
          <Grid item xs={12}>
            <UnselectedCategoryFont dark>Pill Forms</UnselectedCategoryFont>
            <FullWidthSelect
              multiple
              value={activeFilters.FORM}
              variant='outlined'
              MenuProps={{
                anchorOrigin: {
                  vertical: "top",
                  horizontal: "right"
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left"
                },
                getContentAnchorEl: null
              }}
              // @ts-ignore mis-typing on possibility for array
              onChange={(event) => setFilters('FORM', event.target.value)}
              renderValue={() => {
                return (
                  <Chips>
                    {activeFilters.FORM.map(name => (
                      <Chip key={name} label={prettifyEnumString(name)}/>
                    ))}
                  </Chips>
                );
              }}
            >
              {FORMS && FORMS.enumValues ? FORMS.enumValues.map(form => (
                <MenuItem key={form.name} value={form.name}>
                  {prettifyEnumString(form.name)}
                </MenuItem>
              )) : null}
            </FullWidthSelect>
          </Grid>
          <EmptyRow/>
          <Grid item xs={12}>
            <UnselectedCategoryFont dark>Brands</UnselectedCategoryFont>
            <FullWidthSelect
              multiple
              value={activeFilters.BRAND}
              variant='outlined'
              MenuProps={{
                anchorOrigin: {
                  vertical: "top",
                  horizontal: "right"
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left"
                },
                getContentAnchorEl: null
              }}
              // @ts-ignore mis-typing on possibility for array
              onChange={(event) => setFilters('BRAND', event.target.value)}
              renderValue={() => {
                return (
                  <Chips>
                    {activeFilters.BRAND.map(name => (
                      <Chip key={name} label={prettifyEnumString(name)}/>
                    ))}
                  </Chips>
                );
              }}
            >
              {BRANDS && BRANDS.enumValues ? BRANDS.enumValues.map(brand => (
                <MenuItem key={brand.name} value={brand.name}>
                  {prettifyEnumString(brand.name)}
                </MenuItem>
              )) : null}
            </FullWidthSelect>
          </Grid>
        </Grid>
        <Grid item xs={1}/>
      </InnerGrid>
      <EmptyRow mobile='1px'/>
    </Grid>
  )
};

export default enhance(BuilderFilterPanelPure);
