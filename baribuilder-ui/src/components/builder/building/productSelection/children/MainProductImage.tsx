import gql from 'graphql-tag';
import * as React from 'react';
import {SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {compose, pure} from 'recompose';
import {
  GetImageForCatalogProductDetail,
  GetImageForCatalogProductDetailVariables
} from '../../../../../typings/gql/GetImageForCatalogProductDetail';

const GET_IMAGES_QUERY = gql`
    query GetImageForCatalogProductDetail($id: ID) {
        CatalogProduct(id: $id) {
            id
            images {
                url
            }
        }
    }
`;

interface IProps {
  productId: string;
  className?: string; // styled-components
}

type DataOutputProps = ChildDataProps<IProps, GetImageForCatalogProductDetail, GetImageForCatalogProductDetailVariables>;

const data = graphql<IProps, GetImageForCatalogProductDetail, GetImageForCatalogProductDetailVariables, DataOutputProps>(GET_IMAGES_QUERY, {
  options: ({productId}) => ({
    variables: {id: productId},
  }),
});

const enhance = compose<IProps & DataOutputProps, IProps>(
  data,
  pure,
);

const noProductImageUrl = 'https://ik.imagekit.io/vitaglab/no-product-image_H1Xq788tQ.jpg';

// Pure
const MainProductImagePure: SFC<IProps & DataOutputProps> = ({data: {CatalogProduct}, className}) => {
  const productImageUrl = CatalogProduct ? CatalogProduct.images ? CatalogProduct.images.length > 0 ? CatalogProduct.images[0].url : null : null : null;
  return <img className={className} src={productImageUrl || noProductImageUrl}/>;
};

export default enhance(MainProductImagePure);
