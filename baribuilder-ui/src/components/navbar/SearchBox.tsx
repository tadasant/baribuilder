import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField/TextField';
import gql from 'graphql-tag';
import * as React from 'react';
import {SFC} from 'react';
import {DataProps, graphql, MutateProps} from 'react-apollo';
import {compose, withState} from "recompose";
import styled from 'styled-components';
import Sketch from '../../app/style/SketchVariables';
import searchIcon from '../../assets/icon/search.svg';
import {SetSearchQuery} from '../../typings/gql/SetSearchQuery';

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

type MutationOutputProps =
  Partial<DataProps<SetSearchQuery>>
  & Partial<MutateProps<SetSearchQuery>>;

const withMutation = graphql<{}, SetSearchQuery>(SEARCH_QUERY_MUTATION);

const enhance = compose<IPropsState, {}>(
  // Used to become fully controlled: https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html?no-cache=1#recommendation-fully-uncontrolled-component-with-a-key
  withState<{}, string, 'searchQuery', 'setSearchQuery'>(
    'searchQuery',
    'setSearchQuery',
    '',
  ),
  withMutation
);

interface IPropsState {
  searchQuery: string;
  setSearchQuery: (state: string) => string
}

// TODO invoke on enter
// TODO invocation should bounce you to /browse/all_products (maybe keeps you in same category in the future)

const SearchBox: SFC<IPropsState & MutationOutputProps> = ({searchQuery, setSearchQuery, mutate}) => {
  if (!mutate) {
    console.error('Something went wrong with mutate. Error code 3922358184.');
    return null;
  }
  return (
    <FullHeightGrid item container alignItems='center'>
      <Grid item lg={10}>
        <NearFullWidthTextField
          placeholder='Search'
          inputProps={{style: {color: Sketch.color.accent.white}}}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value || '')}
        />
      </Grid>
      <Grid item lg={2}>
        <LogoImg src={searchIcon} onClick={() => mutate({variables: {searchQuery}})}/>
      </Grid>
    </FullHeightGrid>
  );
};

export default enhance(SearchBox);