import React from 'react';
import { Query } from '@apollo/react-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import ButtonBase from '@material-ui/core/ButtonBase';
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
  focused: {
    backgroundColor: '#9e9e9e',
    transition: 'background-color 200ms linear'
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
        const content = (!loading && onClick)
          ? (<ButtonBase className={classes.root} focusVisibleClassName={classes.focused} onClick={onClick}>{inner}</ButtonBase>)
          : inner;
        return (!loading && showTooltip)
          ? (<Tooltip title={data.item.name} arrow>{content}</Tooltip>)
          : (<div className={classes.root}>{content}</div>);
      }}
    </Query>
  );
};

export default Item;
