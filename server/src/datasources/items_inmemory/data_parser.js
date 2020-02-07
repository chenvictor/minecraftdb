'use strict';

// Formats recipe into 3x3 grid form
const formatRecipe = (recipe, pool) => {
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

const parse = raw => {
  const pool = {};
  const array = [];

  for (const item of raw) {
    const { id } = item;
    pool[id] = pool[id] || {};
    pool[id][item.sub_id || 0] = item;
    item.crafts_to = new Set();
  }
  const s = new Set();
  for (const item of raw) {
    if (item.crafts_from) {
      for (const recipe of item.crafts_from) {
        recipe.recipe = Object.freeze(formatRecipe(recipe.recipe, pool));
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
    array.push(item);
  }
  array.sort((a, b) => a.id - b.id || a.sub_id - b.sub_id);
  const parsed = {
    pool: Object.freeze(pool),
    array: Object.freeze(array)
  };
  return Object.freeze(parsed);
};

module.exports = {
  parse
};
