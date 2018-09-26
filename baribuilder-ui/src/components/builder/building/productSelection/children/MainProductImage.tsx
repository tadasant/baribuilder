import {Grid} from '@material-ui/core';
import gql from 'graphql-tag';
import * as React from 'react';
import {SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {compose, pure} from 'recompose';
import styled from 'styled-components';
import {
  GetCatalogProductImages,
  GetCatalogProductImagesVariables
} from '../../../../../typings/gql/GetCatalogProductImages';

const GET_IMAGES_QUERY = gql`
    query GetCatalogProductImages($id: ID) {
        CatalogProduct(id: $id) {
            id # ensure cache hit
            
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

type DataOutputProps = ChildDataProps<IProps, GetCatalogProductImages, GetCatalogProductImagesVariables>;

const data = graphql<IProps, GetCatalogProductImages, GetCatalogProductImagesVariables, DataOutputProps>(GET_IMAGES_QUERY, {
  options: ({productId}) => ({
    variables: {id: productId},
  }),
});

const enhance = compose<IProps & DataOutputProps, IProps>(
  data,
  pure,
);

const noProductImageUrl = 'https://ik.imagekit.io/vitaglab/no-product-image_H1Xq788tQ.jpg';

const CenteredImage = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

// Pure
const MainProductImagePure: SFC<IProps & DataOutputProps> = ({data: {CatalogProduct}, className}) => {
  const productImageUrl = CatalogProduct ? CatalogProduct.images ? CatalogProduct.images.length > 0 ? CatalogProduct.images[0].url : null : null : null;
  return (
    <Grid>
      <CenteredImage className={className} src={productImageUrl || noProductImageUrl}/>
    </Grid>
  );
};

export default enhance(MainProductImagePure);
