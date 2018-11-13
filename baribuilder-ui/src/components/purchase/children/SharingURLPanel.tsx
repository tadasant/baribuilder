import {Button, Grid, TextField} from '@material-ui/core';
import * as copy from 'copy-to-clipboard';
import gql from 'graphql-tag';
import * as qs from 'qs';
import * as React from 'react';
import {SFC} from 'react';
import {ChildDataProps, DataProps, DataValue, graphql, MutateProps} from 'react-apollo';
import {toast} from 'react-toastify';
import {compose, withProps, withState} from 'recompose';
import styled from 'styled-components';
import Sketch from '../../../app/style/SketchVariables';
import {CreateUrlHash, CreateUrlHashVariables} from '../../../typings/gql/CreateUrlHash';
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

// TODO would make sense to move mutation to a container component
const CREATE_URL_HASH_MUTATION = gql`
    mutation CreateUrlHash($pathname: String!) {
        createUrl(pathname: $pathname) {
            id
        }
    }
`;

type QueryOutputProps = ChildDataProps<{}, GetStoreToShare>;

type MutationOutputProps = Partial<DataProps<CreateUrlHash, CreateUrlHashVariables>> & Partial<MutateProps<CreateUrlHash, CreateUrlHashVariables>>;

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

export const URL_ID_KEY = 'url-id';

const idToShareableURL = (id: string) => {
  return `${window.location.host}/share?${URL_ID_KEY}=${id}`;
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
  shareableUrlIsHashed: boolean;
  setShareableUrlIsHashed: (b: boolean) => boolean;
}

type TProps = MutationOutputProps & QueryOutputProps & IProps & IStateProps;

const SharingURLPanel: SFC<TProps> = props => {
  const {data, shareableUrl, mutate, setShareableUrl} = props;
  if (!mutate) {
    console.warn('Mutate is null. Error code 3445472849');
    return null;
  }

  const performCopy = () => {
    copy(shareableUrl);
    toast.success('Successfully copied URL to clipboard');
  };

  const hashUnhashedUrl = () => {
    if (!shareableUrl.includes(URL_ID_KEY)) {
      return mutate({variables: {pathname: dataToShareablePathname(data)}})
        .then(response => {
          if (response && (response.errors || !response.data || !response.data.createUrl)) {
            console.error('Failed creating hashed URL. Error code 019484');
          } else {
            // @ts-ignore wrong type that doesn't recognize data??
            return response.data.createUrl.id;
          }
        })
    }
    return Promise.resolve('');
  };

  const handleFocus = () => {
    hashUnhashedUrl()
      .then((urlId?: string) => {
        if (urlId) {
          setShareableUrl(idToShareableURL(urlId))
        }
      });
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
              <TextField fullWidth value={shareableUrl} onFocus={handleFocus}/>
            </Grid>
          </Grid>
        </HorizontalPaddedGrid>
        <HorizontalPaddedGrid item xs={3}>
          <Button color='primary' variant='contained' fullWidth onClick={performCopy} onMouseOver={handleFocus}>Copy</Button>
        </HorizontalPaddedGrid>
      </PaperGrid>
    );
  }
  return null;
};

const withData = graphql<{}, GetStoreToShare>(STORE_TO_SHARE_QUERY);

const withMutation = graphql<CreateUrlHashVariables, CreateUrlHash>(CREATE_URL_HASH_MUTATION);

const enhance = compose<QueryOutputProps & IProps, IProps>(
  withMutation,
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
