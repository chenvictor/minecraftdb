import React from 'react';
import { Query } from '@apollo/react-components';
import { gql } from 'apollo-boost';

const ITEMS = gql`{
  items {
    id
    sub_id
    name
    image_url
  }
}`;

const showItem = ({ id, sub_id }) => {
  console.log(`showing item with id: ${id}:${sub_id}`);
};

const Display = () => {
  return (
    <Query
      query={ITEMS}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>
        if (error) throw error;
        console.log(data.items);
        return (
          <ul>
            {
              data.items.map(({ id, sub_id, name, image_url }) =>
              (
                <li key={`${id}:${sub_id}`} onClick={showItem.bind(null, { id, sub_id })}>
                  <img src={image_url} alt={name} />
                  <p>{name}</p>
                </li>)
              )
            }
          </ul>
        );
      }}
    </Query>
  );
};

export default Display;
