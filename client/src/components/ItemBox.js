import React from 'react';
import { Query } from '@apollo/react-components';
import { gql } from 'apollo-boost';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Item from './Item';

const generateQuery = (id, sub_id) => gql`{
  item(id: ${id}, sub_id: ${sub_id || 0}) {
    id
    sub_id
    name
    image_url
  }
}`;

const useStyles = makeStyles({
  root: {
    position: 'relative',
    borderLeft: '2px solid rgb(63,63,63)',
    borderTop: '2px solid rgb(63,63,63)',
    borderBottom: '2px solid white',
    borderRight: '2px solid white',
    backgroundColor: 'rgb(150,150,150)',
    padding: ({ padding }) => `${padding}px`
  },
  count: {
    position: 'absolute',
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'white',
    right: 6,
    bottom: 4,
    zIndex: 100,
  }
});

const ItemBox = ({
    item,
    padding = 2,
    count = 1,
    showTooltip = true,
    onClick
  }) => {
  const classes = useStyles({ padding });
  return (
    <div className={classes.root}>
      <Item
        item={item}
        showTooltip={showTooltip}
        onClick={onClick}
      />
    </div>
  );
};

export default ItemBox;
