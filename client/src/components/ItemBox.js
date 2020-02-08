import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Item from './Item';

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
  const number = count !== 1
    ? (<span className={classes.count}>{count}</span>)
    : null;
  return (
    <div className={classes.root}>
      <Item
        item={item}
        showTooltip={showTooltip}
        onClick={onClick}
      />
      {number}
    </div>
  );
};

export default ItemBox;
