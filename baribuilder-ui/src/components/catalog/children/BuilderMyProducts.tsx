import {Button, Grid} from '@material-ui/core';
import gql from 'graphql-tag';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import {DataProps, graphql, MutateProps} from 'react-apollo';
import {toast} from 'react-toastify';
import styled from 'styled-components';
import Sketch from '../../../app/style/SketchVariables';
import {ClearCurrentRegimen} from '../../../typings/gql/ClearCurrentRegimen';
import {EmptyRow} from '../../style/Layout';
import {ButtonFooter, ButtonFooterGrid, HPaddedGrid, NoMarginGrid} from './BuilderMyRegimen';
import CurrentRegimenProducts from './myProducts/CurrentRegimenProducts';


const REGIMEN_CLEAR_MUTATION = gql`
    mutation ClearCurrentRegimen {
        ClearCurrentRegimen @client {
            products {
                catalogProductId
            }
        }
    }
`;

type MutationOutputProps = Partial<DataProps<ClearCurrentRegimen>> & Partial<MutateProps<ClearCurrentRegimen>>;

const PaddedGrid = styled(Grid)`
  padding-left: 8px;
  padding-right: 8px;
  height: 100vh;
  overflow-y: scroll;
`;

const RedButton = styled(Button)`
  && {
    background-color: ${Sketch.color.accent.danger};
    color: white;
    
    &:hover {
      background-color: ${Sketch.color.accent.danger};
      opacity: 0.8;
    }
  }
`;

const BuilderMyProducts: SFC<MutationOutputProps> = ({mutate}) => {
  const handleClearClick = () => {
    if (!mutate) {
      console.error('Mutate undefined for some reason. Error code 019472');
      return;
    }
    mutate()
      .then(response => {
        if (response && !response.errors) {
          toast.success('Cleared all products.');
        }
      })
  };

  return (
    <Fragment>
      <PaddedGrid container alignContent='flex-start'>
        <EmptyRow mobile='1px'/>
        <CurrentRegimenProducts/>
        <EmptyRow mobile='1px'/>
      </PaddedGrid>
      <ButtonFooter>
        <ButtonFooterGrid item lg={12} container direction='column' justify='center'>
          <NoMarginGrid item container>
            <HPaddedGrid item lg={12}>
              <RedButton variant='contained' fullWidth onClick={handleClearClick}>
                Clear All
              </RedButton>
            </HPaddedGrid>
          </NoMarginGrid>
        </ButtonFooterGrid>
      </ButtonFooter>
    </Fragment>
  )
};

const withMutation = graphql<{}, ClearCurrentRegimen>(REGIMEN_CLEAR_MUTATION, {
  options: {
    refetchQueries: ['PrefetchClientCatalogProducts'],
  }
});

export default withMutation(BuilderMyProducts);
