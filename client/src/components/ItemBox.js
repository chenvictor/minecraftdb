import React from 'react';
import { Query } from '@apollo/react-components';
import { gql } from 'apollo-boost';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

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
    height: props => `${40+(props.padding || 2)*2}px`,
    width: props => `${40+(props.padding || 2)*2}px`,
    borderLeft: '2px solid rgb(63,63,63)',
    borderTop: '2px solid rgb(63,63,63)',
    borderBottom: '2px solid white',
    borderRight: '2px solid white',
    backgroundColor: 'rgb(150,150,150)',
    padding: props => `${props.padding || 2}px`,
    overflow: 'hidden'
  },
  inner: {
    width: '100%',
    height: '100%'
  }
});

const ItemBox = (props) => {
  const classes = useStyles(props);
  const count = props.count || 1;
  const item = props.item || {};
  const { id, sub_id } = item;
  if (!id) {
    return <div className={classes.root} />;
  }
  return (
    <Query
      query={generateQuery(id, sub_id)}
    >
      {({ loading, error, data }) => {
        if (error) throw error;
        const content = loading
          ? (<CircularProgress className={classes.inner} size={34} />)
          : (<img className={classes.inner} src={data.item.image_url} alt={data.item.name} />);
        return (<div className={classes.root}>{content}</div>);
      }}
    </Query>
  );
};

export default ItemBox;
