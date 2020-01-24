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
  }),
  debug: false
});

server.listen().then(({ url }) => {
  console.log(`Graphql server ready at ${url}`);
});

/*
 * Serve static image files
 */
const image_port = 4001;
const express = require('express');
const assets = express();

assets.use(express.static(process.env.PWD + '/public'));
assets.listen(image_port, () => {
  console.log(`public directory served statically on port ${image_port}`);
});
