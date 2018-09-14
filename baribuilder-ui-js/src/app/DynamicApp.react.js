import React, {Component} from 'react';
// import ApolloClient from 'apollo-boost';
// import {ApolloProvider} from 'react-apollo';
import {Route, Switch} from 'react-router-dom';
import NotFound from './NotFound.react';

// const client = new ApolloClient({
//   uri: "https://api-useast.graphcms.com/v1/cjko3wfon06d601cospqasvh8/master"
// });

class DynamicApp extends Component {
  render() {
    return (
      {/*<ApolloProvider client={client}>*/}
        <Switch>
          {/*<Route exact path="/builder" component={Builder}/>*/}
          <Route component={NotFound}/>
        </Switch>
      // </ApolloProvider>
    );
  }
}

export default DynamicApp;
