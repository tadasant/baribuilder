# baribuilder
BariBuilder Monorepo

Production: https://baribuilder.com/
Development: https://dev.baribuilder.com/


## baribuilder-api (Graphcool)

`npm install -g graphcool`

`graphcool init <project-name>`

`cd baribuilder-api && graphcool deploy`

Don't forget to redownload the new schema if trying to create types.

`graphcool playground`

GraphQL Endpoint: https://api.graph.cool/simple/v1/cjlzqvawt1ib00107g3nfr04i

## baribuilder-ui

### Managing GraphQL query typing
If you don't have Apollo yet:

`npm install -g apollo@1.9.2`

Download GraphQL schema:

`apollo schema:download graphql.schema.json --endpoint=https://api.graph.cool/simple/v1/cjlzqvawt1ib00107g3nfr04i`

Generate GraphQL Schema TypeScript typings:

`apollo codegen:generate ./baribuilder-ui/src/typings/gql --schema ./graphql.schema.json --target typescript --outputFlat --addTypename --queries=./baribuilder-ui/src/**/*.ts* --clientSchema ./baribuilder-ui/src/state/client-schema.graphql`

Troubleshooting:
* `SyntaxError: Operation extraction from file baribuilder-ui/node_modules/browser-resolve/node_modules/resolve/test/precedence/bbb.js failed with 
   Unexpected token, expected ";" (1:15)`
    * Make sure you've set the `--queries` flag correctly - it needs to find queries for which to make types
* `TypeError: Cannot read property 'getQueryType' of undefined`
    * You might have the wrong path to your schema 

### Shortcomings of Typescript for being a catchall

No good way to track the extensions of remote schema (`state/resolvers.ts`)

No good way to track cache redirect keys (`BuilderApp.tsx`)

### Bugs / inconveniences to look into

Problem: When making a local & remote combined query, if the remote bit is not in the cache, the result will return the remote bit and just the default value for the local bit.

Solution: @client directive should result in ALWAYS cache hit for that piece of the query.

Update: not entirely sure if this is a real problem or I was doing something wrong by relying on default resolvers too heavily

## baribuilder-aggregator

AWS Lambda function that should run periodically to keep the product catalog fresh

## gql-scripts

Utilities for performing operations on the database

