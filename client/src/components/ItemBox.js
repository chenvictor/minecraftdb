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
    height: ({ padding }) => `${40+2*padding}px`,
    width: ({ padding }) => `${40+2*padding}px`,
    borderLeft: '2px solid rgb(63,63,63)',
    borderTop: '2px solid rgb(63,63,63)',
    borderBottom: '2px solid white',
    borderRight: '2px solid white',
    backgroundColor: 'rgb(150,150,150)',
    padding: ({ padding }) => `${padding}px`,
    overflow: 'hidden'
  },
  inner: {
    width: '100%',
    height: '100%'
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
  if (!item) {
    return <div className={classes.root} />;
  }
  const { id, sub_id } = item;
  return (
    <Query
      query={generateQuery(id, sub_id)}
    >
      {({ loading, error, data }) => {
        if (error) throw error;
        const displayCount = count !== 1
          ? (<span className={classes.count}>{count}</span>)
          : null;
        const content = loading
          ? (<CircularProgress className={classes.inner} size={34} />)
          : (<img className={classes.inner} src={data.item.image_url} alt={data.item.name} />);
        return (
          <div className={classes.root}>
            {content}
            {displayCount}
          </div>
        );
      }}
    </Query>
  );
};

export default ItemBox;
