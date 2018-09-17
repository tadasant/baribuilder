# baribuilder
BariBuilder Monorepo

## Graphcool

`npm install -g graphcool`

`graphcool init <project-name>`

`graphcool deploy`

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

`apollo codegen:generate ./baribuilder-ui/src/gql-typings --schema ./graphql.schema.json --target typescript --outputFlat --addTypename --queries=./baribuilder-ui/src/components/**/*.tsx`

Troubleshooting:
* `SyntaxError: Operation extraction from file baribuilder-ui/node_modules/browser-resolve/node_modules/resolve/test/precedence/bbb.js failed with 
   Unexpected token, expected ";" (1:15)`
    * Make sure you've set the `--queries` flag correctly - it needs to find queries for which to make types
* `TypeError: Cannot read property 'getQueryType' of undefined`
    * You might have the wrong path to your schema 

