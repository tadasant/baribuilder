import gql from 'graphql-tag';
import * as React from 'react';
import {SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {branch, compose, pure, renderComponent} from 'recompose';
import {GetProductForProductDetail, GetProductForProductDetailVariables} from '../../../../typings/gql/GetProductForProductDetail';

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
            defaultQuantity @client {
                number
                units
                frequency
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
  options: ({ id }) => ({
    variables: { id },
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

// Pure
const ProductPure: SFC<IProps & DataOutputProps> = ({data: { CatalogProduct }, id}) => {
  return <div>{CatalogProduct === null || CatalogProduct === undefined ? null : `${id}; ${CatalogProduct.defaultQuantity.number}; ${CatalogProduct.cost.money}; ${CatalogProduct.projectedRegimenCost ? CatalogProduct.projectedRegimenCost.cost.money : 'Can\'t determine projCost' }`}</div>;
};

export default enhance(ProductPure);
