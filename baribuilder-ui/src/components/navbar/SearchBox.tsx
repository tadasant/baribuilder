import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField/TextField';
import gql from 'graphql-tag';
import * as React from 'react';
import {KeyboardEvent, SFC} from 'react';
import {ChildDataProps, DataProps, graphql, MutateProps} from 'react-apollo';
import {RouteComponentProps, withRouter} from 'react-router';
import {compose, withState} from "recompose";
import styled from 'styled-components';
import Sketch from '../../app/style/SketchVariables';
import searchIcon from '../../assets/icon/search.svg';
import {GetSearchQuery} from '../../typings/gql/GetSearchQuery';
import {SetSearchQuery} from '../../typings/gql/SetSearchQuery';
import {SEARCH_QUERY_QUERY} from '../catalog/queries';

const NearFullWidthTextField = styled(TextField)`
  width: 95%;
`;

const FullHeightGrid = styled(Grid)`
  height: 100%;
`;

const LogoImg = styled.img`
  height: 24px;
  cursor: pointer;
`;

const SEARCH_QUERY_MUTATION = gql`
    mutation SetSearchQuery($searchQuery: String!) {
        SetSearchQuery(
            searchQuery: $searchQuery,
        ) @client {
            value
        }
    }
`;

type QueryOutputProps = ChildDataProps<{}, GetSearchQuery>;

type MutationOutputProps =
  Partial<DataProps<SetSearchQuery>>
  & Partial<MutateProps<SetSearchQuery>>;

const withData = graphql<{}, GetSearchQuery>(SEARCH_QUERY_QUERY);
const withMutation = graphql<{}, SetSearchQuery>(SEARCH_QUERY_MUTATION);

const enhance = compose<IPropsState & QueryOutputProps & MutationOutputProps, {}>(
  // Used to become fully controlled: https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html?no-cache=1#recommendation-fully-uncontrolled-component-with-a-key
  withState<{}, string, 'searchQuery', 'setSearchQuery'>(
    'searchQuery',
    'setSearchQuery',
    '',
  ),
  withData,
  withMutation,
  withRouter
);

interface IPropsState {
  searchQuery: string;
  setSearchQuery: (state: string) => string
}

const SearchBox: SFC<IPropsState & QueryOutputProps & MutationOutputProps & RouteComponentProps> = ({searchQuery, setSearchQuery, mutate, data, location, history}) => {
  if (!mutate) {
    console.error('Something went wrong with mutate. Error code 3922358184.');
    return null;
  }

  const mutateAndRedirect = () => {
    mutate({variables: {searchQuery}});
    if (!location.pathname.includes('/browse')) {
      history.push('/browse/all_products');
    }
  };

  const handleSearchKeyPress = (event: KeyboardEvent) =>
    // @ts-ignore For some reason doesn't recognize presence of .value
    event.key === 'Enter' ? mutateAndRedirect() : null;

  return (
    <FullHeightGrid item container alignItems='center'>
      <Grid item lg={10}>
        <NearFullWidthTextField
          placeholder='Search'
          inputProps={{style: {color: Sketch.color.accent.white}, dataHjWhitelist: true}}
          defaultValue={data ? data.searchQuery ? data.searchQuery.value : '' : ''}
          onKeyPress={handleSearchKeyPress}
          onChange={(event) => setSearchQuery(event.target.value || '')}
        />
      </Grid>
      <Grid item lg={2}>
        <LogoImg src={searchIcon} onClick={() => mutateAndRedirect()}/>
      </Grid>
    </FullHeightGrid>
  );
};

export default enhance(SearchBox);