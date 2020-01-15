module.exports = {
  Query: {
    item: (parent, { id }, { dataSources }) => {
      return dataSources.items.getById(id);
    }
  }
};
