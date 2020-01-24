module.exports = {
  Query: {
    item: (parent, { id, sub_id }, { dataSources }) => {
      return dataSources.items.getItem(id, sub_id);
    }
  }
};
