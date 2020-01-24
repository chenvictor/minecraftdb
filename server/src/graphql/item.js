'use strict';

module.exports = {
  Query: {
    item: (parent, { id, sub_id }, { dataSources }) => {
      return dataSources.items.getItem(id, sub_id);
    },
    items: (_unused, __unused, { dataSources }) => {
      return dataSources.items.getAllItems();
    }
  }
};
