import {Button, Grid, TextField} from '@material-ui/core';
import * as copy from 'copy-to-clipboard';
import gql from 'graphql-tag';
import * as qs from 'qs';
import * as React from 'react';
import {SFC} from 'react';
import {ChildDataProps, DataValue, graphql} from 'react-apollo';
import {toast} from 'react-toastify';
import {compose, withProps, withState} from 'recompose';
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

const dataToShareablePathname = ({currentRegimen, goalIngredients}: DataValue<GetStoreToShare, {}>) => {
  const queryString = qs.stringify({
    currentRegimen,
    goalIngredients
  });
  return `share?${queryString}`;
};

const dataToShareableURL = (data: DataValue<GetStoreToShare, {}>) => {
  return data ? `${window.location.host}/${dataToShareablePathname(data)}` : window.location.host;
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
  z-index: 2;
`;

interface IStateProps {
  shareableUrl: string;
  setShareableUrl: (s: string) => string;
}

const SharingURLPanel: SFC<QueryOutputProps & IProps & IStateProps> = props => {
  const {data, shareableUrl} = props;

  const performCopy = () => {
    copy(shareableUrl);
    toast.success('Successfully copied URL to clipboard');
  };

  if (data) {
    return (
      <PaperGrid container justify='flex-end' vStickyOffset={props.vStickyOffset}>
        <HorizontalPaddedGrid item container xs={9}>
          <Grid container spacing={8} justify='flex-end'>
            <Grid item>
              <BoldBody dark>To share:</BoldBody>
            </Grid>
            <Grid item xs>
              <TextField fullWidth value={shareableUrl}/>
            </Grid>
          </Grid>
        </HorizontalPaddedGrid>
        <HorizontalPaddedGrid item xs={3}>
          <Button color='primary' variant='contained' fullWidth onClick={performCopy}>Copy</Button>
        </HorizontalPaddedGrid>
      </PaperGrid>
    );
  }
  return null;
};

const withData = graphql<{}, GetStoreToShare>(STORE_TO_SHARE_QUERY);

const enhance = compose<QueryOutputProps & IProps, IProps>(
  withData,
  withProps<{ key: string }, QueryOutputProps>(
    ({data: {currentRegimen, goalIngredients}}) => (
      {
        key: `${currentRegimen ? currentRegimen.toString() : 'no-data'}${goalIngredients ? goalIngredients.toString() : 'no-data'}`
      }
    )
  ),
  withState<{}, string, 'shareableUrl', 'setShareableUrl'>(
    'shareableUrl',
    'setShareableUrl',
    (props: QueryOutputProps) => dataToShareableURL(props.data),
  ),
);

export default enhance(SharingURLPanel);
