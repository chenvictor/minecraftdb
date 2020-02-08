import React from 'react';
import { Query } from '@apollo/react-components';
import { gql } from 'apollo-boost';
import CraftingGrid from './CraftingGrid';

const generateQuery = (id, sub_id) => gql`{
  item(id: ${id}, sub_id: ${sub_id || 0}) {
    id
    sub_id
    name
    image_url
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

const ItemView = (props) => {
  const { item } = props;
  if (!item) return null;

  return (
    <Query
      query={generateQuery(item.id,item.sub_id)}
    >
      {({ loading, error, data }) => {
        if (error) throw error;
        if (loading) return <p>Loading...</p>;
        const item = data.item;
        return (
          <div>
            <h2>Details:</h2>
            <h4>{`${item.id}:${item.sub_id || 0}`}</h4>
            <hr />
            <h2>Crafting:</h2>
            <ul>
              {
                item.crafts_from.map((crafting, index) => {
                  return <CraftingGrid key={index} recipe={crafting.recipe} target={data.item} produces={crafting.produces} />
                })
              }
            </ul>
          </div>
        );
      }}
    </Query>
  );
};

export default ItemView;
