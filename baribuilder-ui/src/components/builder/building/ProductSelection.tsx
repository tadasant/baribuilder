import gql from "graphql-tag";
import * as React from 'react';
import {SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {branch, compose, pure, renderComponent} from 'recompose';
import {GetProducts} from '../../../gql-typings/GetProducts';
import Product from './Product';

// GraphQL HOC props (output)
type DataOutputProps = ChildDataProps<{}, GetProducts>;

const data = graphql<{}, GetProducts>(gql`
    query GetProducts {
        allProducts {
            id
        }
    }
`);

const displayLoadingState = branch<DataOutputProps>(
  (props) => props.data.loading,
  renderComponent(() => <div>Loading</div>),
);

const enhance = compose<DataOutputProps, {}>(
  data,
  displayLoadingState,
  pure,
);

// Pure
const ProductSelectionPure: SFC<DataOutputProps> = ({data: {allProducts}}) => {
  if (allProducts !== undefined) {
    return <div>{allProducts.map(o => <Product key={o.id} id={o.id}/>)}</div>;
  }
  // TODO add data.error branch (need a way to force not undefined in that case)
  console.warn('allProducts should never be undefined when loading is false');
  return <div>Error</div>
};

export default enhance(ProductSelectionPure);
