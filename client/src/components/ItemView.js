import React from 'react';
import { Query } from '@apollo/react-components';
import CraftingGrid from './CraftingGrid';
import { getDetailedItemById } from '../queries';
import { serialize } from '../utils/item';

const ItemView = (props) => {
  const { item } = props;
  if (!item) return null;

  return (
    <Query
      query={getDetailedItemById(item)}
    >
      {({ loading, error, data }) => {
        if (error) throw error;
        if (loading) return <p>Loading...</p>;
        const { item } = data;
        return (
          <div>
            <div>
              <img src={item.image_url} width='60px' alt={item.name} />
              <div>
                <h3>Name: {item.name}</h3>
                <h3>Id: {serialize(item)}</h3>
              </div>
            </div>
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
