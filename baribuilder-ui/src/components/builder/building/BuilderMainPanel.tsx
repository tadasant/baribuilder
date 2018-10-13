import {Grid} from '@material-ui/core';
import gql from 'graphql-tag';
import * as React from 'react';
import {SFC} from 'react';
import Query from 'react-apollo/Query';
import styled from 'styled-components';
// TODO move this to styled components
import '../../../rc-pagination.css';
import {EmptyRow} from '../../style/Layout';
import {SORTING_STRATEGY} from '../BuilderScreen';
import ClientCatalogProductSelection from './productSelection/ClientCatalogProductSelection';

interface IProps {
  selectedCategory: string;
  sortingStrategy: SORTING_STRATEGY;
}

const PaddedGrid = styled(Grid)`
  padding-left: 8px;
  padding-right: 8px;
`;

const CATALOG_PRODUCTS_QUERY = gql`
    query CatalogProducts {
        allCatalogProducts {
            id
            name
            brand
        }
    }
`;

// Pure
const BuilderMainPanel: SFC<IProps> = ({selectedCategory, sortingStrategy}) => {
  return (
    <PaddedGrid container alignContent='flex-start'>
      <EmptyRow mobile='1px'/>
      <Grid item container direction='row'>
        <Grid item lg={12}>
          {/* Query is here before child's query depends on it / need reference data */}
          <Query query={CATALOG_PRODUCTS_QUERY}>
            {
              ({loading, data}) => {
                if (loading || !data.allCatalogProducts) {
                  return null;
                }
                return <ClientCatalogProductSelection selectedCategory={selectedCategory} sortingStrategy={sortingStrategy} allCatalogProducts={data.allCatalogProducts}/>
              }
            }
          </Query>
        </Grid>
      </Grid>
      <EmptyRow mobile='1px'/>
    </PaddedGrid>
  )
};

export default BuilderMainPanel;
