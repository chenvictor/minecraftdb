import React from 'react';
import { Query } from '@apollo/react-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { getItemById } from '../queries'; 

const useStyles = makeStyles({
  root: {
    height: props => props.size,
    width: props => props.size,
    '& *': {
      width: '100%',
      height: '100%'
    }
  },
  clickable: {
    cursor: 'pointer'
  }
});

const Item = ({
    item,
    size = '40px',
    showTooltip = true,
    onClick
  }) => {
  const classes = useStyles({ size });
  if (!item) {
    return (<div className={classes.root} />);
  }
  return (
    <Query
      query={getItemById(item)}
    >
      {({ loading, error, data }) => {
        if (error) throw error;
        const inner = loading
          ? (<CircularProgress/>)
          : (<img src={data.item.image_url} alt={data.item.name} />);
        const content = (!loading && showTooltip)
          ? (<Tooltip title={data.item.name} arrow>{inner}</Tooltip>)
          : inner;
        const styles = [classes.root];
        if (!loading && onClick) {
          styles.push(classes.clickable);
        }
        return (<div className={styles.join(' ')} onClick={onClick}>{content}</div>);
      }}
    </Query>
  );
};

export default Item;
