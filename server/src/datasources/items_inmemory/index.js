const { DataSource } = require('apollo-datasource');

class ItemsDataSource extends DataSource {
  initialize(config) {
    this.context = config.context;
  }
  async getByNumericId(id) {
    let name;
    switch (id) {
      case 0:
        name = 'air';
        break;
      case 1:
        name = 'stone';
        break;
      default:
        throw new Error(`Item with id ${id} not found!`);
    }
    return {
      id,
      name
    };
  }
  async getByStringId(id) {
    switch (id) {
      
    }
  }
}

module.exports = ItemsDataSource;
