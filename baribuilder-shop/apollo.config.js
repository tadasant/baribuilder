module.exports = {
  schemas: {
    primaryBackendSchema: {
      schema: "../graphql.schema.json", // if not defined the an introspection query will be run
      endpoint: "https://api.graph.cool/simple/v1/cjlzqvawt1ib00107g3nfr04i", // if not defined the schema will be downloaded from Apollo Engine
      // engineKey: "my-engine-key" // use this key when connecting to Apollo Engine
    },
    clientSideSchema: {
      extends: "primaryBackendSchema",
      clientSide: true,
    }
  },
  queries: [ // optional if you only have one schema
    {
      schema: "myPrimaryBackend", // reference the previously defined schema
      includes: [ "**/*.tsx" ], // load queries from .tsx files
      excludes: [ "node_modules/**" ] // don't include any matching files from node_modules
    },
    {
      schema: "clientSideSchema", // reference the previously defined schema
      includes: [ "**/*.tsx" ], // load queries from .tsx files
      excludes: [ "node_modules/**" ] // don't include any matching files from node_modules
    }
  ]
}