import React from 'react';
import { Query } from '@apollo/react-components';
import { gql } from 'apollo-boost';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Item from './Item';
import { serialize } from '../utils/item';

const ITEMS = gql`{
  items {
    id
    sub_id
    name
    image_url
  }
}`;

const showItem = ({ id, sub_id }) => {
  console.log(`show item with id: ${id}:${sub_id}`);
};

const Display = () => {
  return (
    <Query
      query={ITEMS}
    >
      {({ loading, error, data }) => {
        if (error) throw error;
        if (loading) return <p>Loading...</p>;
        return (
          <GridList cellHeight='auto' spacing={8} cols={0}>
            { data.items.map(item => <GridListTile key={serialize(item)}><Item item={item} onClick={showItem.bind(null, item)} showTooltip={true} /></GridListTile>) }
          </GridList>
        );
      }}
    </Query>
  );
};

export default Display;
