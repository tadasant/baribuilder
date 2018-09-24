import {Grid} from '@material-ui/core';
import gql from 'graphql-tag';
import * as React from 'react';
import {SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {branch, compose, pure, renderComponent} from 'recompose';
import styled from 'styled-components';
import Sketch from '../../../../app/style/SketchVariables';
import {
  GetProductForProductDetail,
  GetProductForProductDetailVariables
} from '../../../../typings/gql/GetProductForProductDetail';
import {EmptyRow} from '../../../style/Layout';
import CatalogProductAddPanel from './children/CatalogProductAddPanel';
import CatalogProductPrice from './children/CatalogProductPrice';
import MainProductImage from './children/MainProductImage';

const GET_PRODUCT_QUERY = gql`
    query GetProductForProductDetail($id: ID) {
        CatalogProduct(id: $id) {
            id
            listings {
                price {
                    amount
                }
                numServings
            }
            serving {
                size
                units
                ingredients {
                    quantity {
                        amount
                        units
                    }
                    ingredientType {
                        name
                    }
                }
            }
            cost @client {
                money
                frequency
            }
            projectedRegimenCost @client {
                numRemainingProducts
                cost {
                    money
                    frequency
                }
            }
        }
    }
`;

interface IProps {
  id: string
}

type DataOutputProps = ChildDataProps<IProps, GetProductForProductDetail, GetProductForProductDetailVariables>;

const data = graphql<IProps, GetProductForProductDetail, GetProductForProductDetailVariables, DataOutputProps>(GET_PRODUCT_QUERY, {
  options: ({id}) => ({
    variables: {id},
  }),
});

const displayLoadingState = branch<DataOutputProps>(
  (props) => props.data.loading,
  renderComponent(() => <div>Loading</div>),
);

const enhance = compose<IProps & DataOutputProps, IProps>(
  data,
  displayLoadingState,
  pure,
);

const LeftBorderGrid = styled(Grid)`
  border-left: 1px solid ${Sketch.color.accent.grey};
`;

const MainImage = styled(MainProductImage)`
  max-height: 100px;
`;

// Pure
const ProductPure: SFC<IProps & DataOutputProps> = ({data: {CatalogProduct}, id}) => {
  return (
    <Grid container direction='row'>
      <EmptyRow mobile='-20px'/>
      <Grid container direction='row'>
        <Grid item lg={3}>
          <MainImage productId={id}/>
        </Grid>
        <Grid item lg={6} container justify='center'>
          <CatalogProductPrice catalogProductId={id}/>
        </Grid>
        <LeftBorderGrid item lg={3}>
          <CatalogProductAddPanel catalogProductId={id}/>
        </LeftBorderGrid>
      </Grid>
      <EmptyRow mobile='-20px'/>
    </Grid>
  )
};

export default enhance(ProductPure);
