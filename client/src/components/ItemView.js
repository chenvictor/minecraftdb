import React from 'react';
import { Query } from '@apollo/react-components';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import CraftingGrid from './CraftingGrid';
import Item from './Item';
import { getDetailedItemById } from '../queries';
import { serialize } from '../utils/item';

const generateDetails = (item) => (
  <div key='details'>
    <img src={item.image_url} width='60px' alt={item.name} />
    <div>
      <h3>Name: {item.name}</h3>
      <h3>Id: {serialize(item)}</h3>
    </div>
  </div>
);

const generateCraftsFrom = (item) => {
  if (item.crafts_from.length === 0) {
    return null;
  }
  return (
    <div key='crafts_from'>
      <hr/>
      <h3>Crafts from:</h3>
      <ul>
        {
          item.crafts_from.map((crafting, index) => {
            return <CraftingGrid key={index} recipe={crafting.recipe} target={item} produces={crafting.produces} />
          })
        }
      </ul>
    </div>
  );
};

const generateCraftsTo = (item) => {
  if (item.crafts_to.length === 0) {
    return null;
  }
  return (
    <div key='crafting'>
      <hr/>
      <h3>Crafts to:</h3>
      <GridList cellHeight='auto' spacing={8} cols={0}>
        { item.crafts_to.map(item => <GridListTile key={serialize(item)}><Item item={item} showTooltip={true} /></GridListTile>) }
      </GridList>
    </div>
  );
};

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
        const content = [
          generateDetails(item),
          generateCraftsFrom(item),
          generateCraftsTo(item)
        ].filter(Boolean);
        console.log(content);
        return (content);
      }}
    </Query>
  );
};

export default ItemView;
