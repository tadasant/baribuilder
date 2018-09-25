import {Grid} from '@material-ui/core';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {compose, pure} from 'recompose';
import {CURRENT_REGIMEN_PRODUCTS_QUERY} from '../../../../state/resolvers/resolver/queries';
import {GetCurrentRegimenProducts,} from '../../../../typings/gql/GetCurrentRegimenProducts';
import {EmptyRow} from '../../../style/Layout';
import RegimenProduct from './RegimenProduct';

// GraphQL HOC props (output)
type DataOutputProps = ChildDataProps<{}, GetCurrentRegimenProducts>;

const data = graphql<{}, GetCurrentRegimenProducts>(CURRENT_REGIMEN_PRODUCTS_QUERY);

const enhance = compose<DataOutputProps, {}>(
  data,
  pure,
);

// Pure
const CurrentRegimenProductsPure: SFC<DataOutputProps> = ({data: {currentRegimen, loading}}) => {
  if (currentRegimen && !loading) {
    return (
      <Grid container direction='row' alignItems='flex-start'>
        {currentRegimen.products.map(product => (
          <Fragment key={product.catalogProductId}>
            <Grid item lg={12}>
              <RegimenProduct {...product}/>
            </Grid>
            <EmptyRow mobile='0px'/>
          </Fragment>
        ))}
      </Grid>
    );
  }
  return null;
};

export default enhance(CurrentRegimenProductsPure);
