import { gql } from 'apollo-boost';

const getAllItems = () => gql`{
  items {
    id
    sub_id
    name
    image_url
  }
}`;

const getItemById = ({ id, sub_id }) => gql`{
  item(id: ${id}, sub_id: ${sub_id || 0}) {
    id
    sub_id
    name
    image_url
  }
}`;

const getDetailedItemById = ({ id, sub_id }) => gql`{
  item(id: ${id}, sub_id: ${sub_id || 0}) {
    id
    sub_id
    name
    image_url
    crafts_to {
      id
      sub_id
      name
      image_url
    }
    crafts_from {
      recipe {
        id
        sub_id
        name
        image_url
      }
      produces
    }
  }
}`;

export {
  getAllItems,
  getItemById,
  getDetailedItemById
};
