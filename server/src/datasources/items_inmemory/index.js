'use strict';

const R = require('ramda');
const { DataSource } = require('apollo-datasource');
const { ApolloError } = require('apollo-server');
const DataParser = require('./data_parser');

// Static set of data
const raw = require('./data.json');
const { pool, array } = DataParser.parse(raw);

class ItemsDataSource extends DataSource {
  initialize(config) {
    this.context = config.context;
  }
  async getItem(id, sub_id) {
    const result = R.path([id, sub_id], pool);
    if (result) {
      return result;
    }
    throw new ApolloError(`Item with id: ${id}, sub_id: ${sub_id} not found.`, 'ITEM_NOT_FOUND');
  }
  async getAllItems() {
    return array;
  }
}

module.exports = ItemsDataSource;
