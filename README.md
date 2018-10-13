# baribuilder
BariBuilder Monorepo

## Graphcool

`npm install -g graphcool`

`graphcool init <project-name>`

`cd baribuilder-api && graphcool deploy`

Don't forget to redownload the new schema if trying to create types.

`graphcool playground`

## baribuilder-api

GraphQL Endpoint: https://api.graph.cool/simple/v1/cjlzqvawt1ib00107g3nfr04i

## baribuilder-ui

### Managing GraphQL query typing
If you don't have Apollo yet:

`npm install -g apollo`

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

## Shortcomings of Typescript for being a catchall

No good way to track the extensions of remote schema (`state/resolvers.ts`)

No good way to track cache redirect keys (`BuilderApp.tsx`)

