'use strict';

const { DataSource } = require('apollo-datasource');
const { ApolloError } = require('apollo-server');
const R = require('ramda');

const pool = {};
const itemsArray = [];

// Formats recipe into 3x3 grid form
const formatRecipe = recipe => {
  const rows = recipe.length;
  const cols = recipe[0].length;
  const row_offset = rows === 3
    ? 0
    : 1;
  const col_offset = cols === 3
    ? 0
    : 1;
  // 3x3 empty array
  const result = [...new Array(3)].map(_unused => new Array(3).fill(null));
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const [id, sub_id = 0] = recipe[i][j].split(':').map(n => parseInt(n, 10));
      result[i + row_offset][j + col_offset] = pool[id][sub_id];
    }
  }
  return result;
};

const data = (() => {
  const raw = require('./data');
  for (const item of raw) {
    const { id } = item;
    pool[id] = pool[id] || {};
    pool[id][item.sub_id || 0] = item;
    item.crafts_to = new Set();
    // Temporary hack
    item.image_url = `http://localhost:4001/${item.image_url}`;
  }
  const s = new Set();
  for (const item of raw) {
    if (item.crafts_from) {
      for (const recipe of item.crafts_from) {
        recipe.recipe = Object.freeze(formatRecipe(recipe.recipe));
        s.clear();
        for (const row of recipe.recipe) {
          for (const cell of row) {
            if (cell) {
              s.add(cell);
            }
          }
        }
        for (const material of s) {
          material.crafts_to.add(item);
        }
        Object.freeze(recipe);

      }
    } else {
      item.crafts_from = [];
    }
  }
  for (const item of raw) {
    item.crafts_to = [...item.crafts_to];
    Object.freeze(item);
    itemsArray.push(item);
  }
  itemsArray.sort((a, b) => a.id - b.id);
  return Object.freeze(pool);
})();

class ItemsDataSource extends DataSource {
  initialize(config) {
    this.context = config.context;
  }
  async getItem(id, sub_id) {
    const result = R.path([id, sub_id], data);
    if (result) {
      return result;
    }
    throw new ApolloError(`Item with id: ${id}, sub_id: ${sub_id} not found.`, 'ITEM_NOT_FOUND');
  }
  async getAllItems() {
    return itemsArray;
  }
}

module.exports = ItemsDataSource;
