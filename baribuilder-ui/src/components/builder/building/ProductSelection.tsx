/**
 * Explanation of the props typings... (9/14/18)
 *
 * The `graphql` function creates a HOC.
 *
 * That HOC has DataProps<GetProducts> as its props. The HOC requires that child components have ChildDataProps<{}, GetProducts> as their props.
 *
 * The displayLoadingState `branch` HOC takes in and requires the same props: ChildDataProps<{}, GetProducts> (so it fits with the graphql HOC)
 *
 * The pure component continues the trend, requiring ChildDataProps<{}, GetProducts>. That'll come from the compose chain.
 *
 * The pure component happens to not require any other props from the caller in the application code, so IProps is (implicitly) {}.
 */


import gql from "graphql-tag";
import * as React from 'react';
import {SFC} from 'react';
import {ChildDataProps, DataProps, graphql} from 'react-apollo';
import {branch, compose, pure, renderComponent} from 'recompose';
import {GetProducts} from '../../../gql-typings/GetProducts';
import Product from './Product';

// GraphQL HOC props (input)
type TOuterProps = DataProps<GetProducts>;
// GraphQL HOC props (output)
type ChildProps = ChildDataProps<{}, GetProducts>;

const data = graphql<{}, GetProducts>(gql`
    query GetProducts {
        allProducts {
            id
        }
    }
`);

const displayLoadingState = branch<ChildProps>(
  (props) => props.data.loading,
  renderComponent(() => <div>Loading</div>),
);

const enhance = compose<TOuterProps, {}>(
  data,
  displayLoadingState,
  pure,
);

// Pure
const ProductSelectionPure: SFC<ChildProps> = ({data: {allProducts}}) => {
  if (allProducts !== undefined) {
    return <div>{allProducts.map(o => <Product key={o.id} id={o.id}/>)}</div>;
  }
  // TODO add data.error branch (need a way to force not undefined in that case)
  console.warn('allProducts should never be undefined when loading is false');
  return <div>Error</div>
};

export default enhance(ProductSelectionPure);
