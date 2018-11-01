import {Button, Grid, TextField} from '@material-ui/core';
import * as copy from 'copy-to-clipboard';
import gql from 'graphql-tag';
import * as qs from 'qs';
import * as React from 'react';
import {SFC} from 'react';
import {ChildDataProps, DataValue, graphql} from 'react-apollo';
import {toast} from 'react-toastify';
import {compose} from 'recompose';
import styled from 'styled-components';
import Sketch from '../../../app/style/SketchVariables';
import {GetStoreToShare} from '../../../typings/gql/GetStoreToShare';
import {BoldBody} from '../../style/Typography';

const STORE_TO_SHARE_QUERY = gql`
    query GetStoreToShare {
        goalIngredients @client {
            ingredientRanges {
                ingredientTypeName
                minimumAmount
                maximumAmount
                units
                frequency
            }
        }
        currentRegimen @client {
            products {
                catalogProductId
                quantity {
                    amount
                    frequency
                    units
                }
                cost {
                    money
                    frequency
                }
            }
        }
    }
`;

type QueryOutputProps = ChildDataProps<{}, GetStoreToShare>;

interface IProps {
  vStickyOffset: string
}

const dataToShareableURL = ({currentRegimen, goalIngredients}: DataValue<GetStoreToShare, {}>) => {
  const queryString = qs.stringify({
    currentRegimen,
    goalIngredients
  });
  return `${window.location.host}/share?${queryString}`;
};

const HorizontalPaddedGrid = styled(Grid)`
  padding-left: 8px;
  padding-right: 8px;
`;

const PaperGrid = styled(Grid)`
  box-shadow: 2px 0px 4px 0px ${Sketch.color.accent.darkgrey};
  height: 64px;
  padding: 16px 0px 16px;
  background-color: white;
  position: sticky;
  top: ${(props: IProps) => props.vStickyOffset};
`;

const SharingURLPanel: SFC<QueryOutputProps & IProps> = props => {
  const {data} = props;

  const performCopy = () => {
    copy(dataToShareableURL(data));
    toast.success('Successfully copied URL to clipboard');
  };

  if (data) {
    return (
      <PaperGrid container justify='flex-end' vStickyOffset={props.vStickyOffset}>
        <HorizontalPaddedGrid item container lg={10}>
          <Grid container spacing={8} justify='flex-end'>
            <Grid item>
              <BoldBody dark>URL to share:</BoldBody>
            </Grid>
            <Grid item lg>
              <TextField fullWidth value={dataToShareableURL(data)}/>
            </Grid>
          </Grid>
        </HorizontalPaddedGrid>
        <HorizontalPaddedGrid item lg={2}>
          <Button color='primary' variant='raised' fullWidth onClick={performCopy}>Copy</Button>
        </HorizontalPaddedGrid>
      </PaperGrid>
    );
  }
  return null;
};

const withData = graphql<{}, GetStoreToShare>(STORE_TO_SHARE_QUERY);

const enhance = compose<QueryOutputProps & IProps, IProps>(
  withData
);

export default enhance(SharingURLPanel);
