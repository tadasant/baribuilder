import {Grid, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import gql from 'graphql-tag';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import styled from 'styled-components';
import Sketch from '../../../../app/style/SketchVariables';
import {GetProductPopover} from '../../../../typings/gql/GetProductPopover';
import {EmptyRow} from '../../../style/Layout';
import {Body, Caption, Header2} from '../../../style/Typography';
import {prettifyEnumString} from '../BuilderFilterPanel';

interface IProps {
  catalogProductId: string;
}

const PRODUCT_POPOVER_QUERY = gql`
    query GetProductPopover($catalogProductId: ID) {
        CatalogProduct(id: $catalogProductId) {
            __typename
            id

            name
            brand
            serving {
                size
                units
                ingredients {
                    ingredientType {
                        name
                    }
                    quantity {
                        amount
                        units
                    }
                }
            }
        }
    }
`;

type QueryOutputProps = ChildDataProps<IProps, GetProductPopover>;

const CenteredTextGrid = styled(Grid)`
  text-align: center;
`;

const CenteredTextTableCell = styled(TableCell)`
  && {
    text-align: center;
  }
`;

const BorderedTable = styled(Table)`
  border: 1px solid ${Sketch.color.accent.grey};
`;

const MaxWidthGrid = styled(Grid)`
  max-width: 500px;
`;

const MinHeightTableRow = styled(TableRow)`
  && {
    height: unset;
  }
`;

const ProductPopover: SFC<QueryOutputProps & IProps> = ({data: {CatalogProduct, loading}}) => {
  if (CatalogProduct && CatalogProduct.serving.ingredients && !loading) {
    return (
      <MaxWidthGrid container>
        <CenteredTextGrid item lg={12}>
          <Header2 dark>{CatalogProduct.name}</Header2>
        </CenteredTextGrid>
        <CenteredTextGrid item lg={12}>
          <Caption dark>{prettifyEnumString(CatalogProduct.brand)}</Caption>
        </CenteredTextGrid>
        <EmptyRow/>
        <CenteredTextGrid item lg={12}>
          <Body dark>
          {CatalogProduct.serving.size} {prettifyEnumString(CatalogProduct.serving.units).toLowerCase()} per serving
          </Body>
        </CenteredTextGrid>
        <EmptyRow/>
        <Fragment>
          <Grid item lg={1}/>
          <Grid item lg={10}>
            <BorderedTable padding='dense'>
              <TableHead>
                <TableRow>
                  <CenteredTextTableCell colSpan={3}>
                    <Body dark>Ingredients per serving</Body>
                  </CenteredTextTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {CatalogProduct.serving.ingredients.map(ingredient => (
                  <MinHeightTableRow key={ingredient.ingredientType.name}>
                    <TableCell>{ingredient.ingredientType.name}</TableCell>
                    <TableCell numeric>{ingredient.quantity.amount}</TableCell>
                    <TableCell>{ingredient.quantity.units.toLowerCase()}</TableCell>
                  </MinHeightTableRow>
                ))}
              </TableBody>
            </BorderedTable>
          </Grid>
          <Grid item lg={1}/>
        </Fragment>
        <EmptyRow/>
      </MaxWidthGrid>
    );
  }
  return null;
};

const withData = graphql<IProps, GetProductPopover>(PRODUCT_POPOVER_QUERY, {
  options: ({catalogProductId}) => ({
    variables: {catalogProductId},
  }),
});

export default withData(ProductPopover);
