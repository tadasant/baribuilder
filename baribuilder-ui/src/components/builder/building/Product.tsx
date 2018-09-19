import gql from 'graphql-tag';
import * as React from 'react';
import {SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {branch, compose, pure, renderComponent} from 'recompose';
import {GetProduct, GetProductVariables} from '../../../typings/gql/GetProduct';

const GET_PRODUCT_QUERY = gql`
    query GetProduct($id: ID) {
        Product(id: $id) {
            id
            listings {
                price {
                    amount
                }
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
`;

interface IProps {
  id: string
}

type DataOutputProps = ChildDataProps<IProps, GetProduct, GetProductVariables>;

const data = graphql<IProps, GetProduct, GetProductVariables, DataOutputProps>(GET_PRODUCT_QUERY, {
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
const ProductPure: SFC<IProps & DataOutputProps> = ({data: { Product }, id}) => {
  return <div>{Product === null || Product === undefined ? null : id}</div>;
};

export default enhance(ProductPure);
