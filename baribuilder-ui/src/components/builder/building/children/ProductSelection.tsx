import {Grid, Paper} from '@material-ui/core';
import gql from "graphql-tag";
import * as React from 'react';
import {Fragment, SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {compose, pure} from 'recompose';
import styled from 'styled-components';
import {GetProductsForProductSelection} from '../../../../typings/gql/GetProductsForProductSelection';
import {EmptyRow} from '../../../style/Layout';
import Product from './Product';

// GraphQL HOC props (output)
type DataOutputProps = ChildDataProps<{}, GetProductsForProductSelection>;

const data = graphql<{}, GetProductsForProductSelection>(gql`
    query GetProductsForProductSelection {
        allProducts {
            id
            
            # Prefetch data for detail cards
            listings {
                price {
                    amount
                }
                numServings
            }
            nutritionFacts {
                serving {
                    count
                }
                ingredients {
                    amount
                    units
                    ingredientType {
                        name
                    }
                }
            }
        }
    }
`);

const enhance = compose<DataOutputProps, {}>(
  data,
  pure,
);

const PaddedDiv = styled.div`
  padding: 8px 8px;
`;

// Pure
const ProductSelectionPure: SFC<DataOutputProps> = ({data: {allProducts, loading}}) => {
  if (allProducts !== undefined && !loading) {
    return (
      <Grid container direction='row' alignItems='flex-start'>
        {allProducts.map(product => (
          <Fragment key={product.id}>
            <Grid item lg={12}>
              <Paper>
                <PaddedDiv>
                  <Product id={product.id}/>
                </PaddedDiv>
              </Paper>
            </Grid>
            <EmptyRow mobile='0px'/>
          </Fragment>
        ))}
      </Grid>
    );
  }
  // TODO add data.error branch (need a way to force not undefined in that case)
  return null;
};

export default enhance(ProductSelectionPure);
