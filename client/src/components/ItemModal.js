import React from 'react';
import Modal from '@material-ui/core/Modal';
import { Query } from '@apollo/react-components';
import { gql } from 'apollo-boost';

const generateQuery = (id, sub_id) => gql`{
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
      yield
    }
  }
}`;

const ItemModal = (props) => {
  return (
    <Query
      query={generateQuery(props.id, props.sub_id)}
    >
      <Modal
        keepMounted={true}
      >
        <ul>

        </ul>

      </Modal>
    </Query>
  );
};

export default ItemModal;
