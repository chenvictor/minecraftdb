const { ApolloServer } = require('apollo-server');
const R = require('ramda');
const requireText = require('require-text');
const glob = require('glob');

const typeDefs = glob.sync(`${__dirname}/graphql/*.gql`).map(file => requireText(file, require));
const resolvers = glob.sync(`${__dirname}/graphql/*.js`).reduce((acc, file) => R.mergeDeepLeft(acc, require(file)), {});

const ItemsDataSource = require('./datasources/items_inmemory');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    items: new ItemsDataSource()
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
