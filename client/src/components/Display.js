import React from 'react';
import { Query } from '@apollo/react-components';
import { gql } from 'apollo-boost';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Item from './Item';
import ItemView from './ItemView';
import { serialize } from '../utils/item';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const ITEMS = gql`{
  items {
    id
    sub_id
    name
    image_url
  }
}`;

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Display = () => {
  const classes = useStyles();
  const [mainItem, setItem] = React.useState(null);

  return (
    <Query
      query={ITEMS}
    >
      {({ loading, error, data }) => {
        if (error) throw error;
        if (loading) return <p>Loading...</p>;
        return (
          <div>
            <GridList cellHeight='auto' spacing={8} cols={0}>
              { data.items.map(item => <GridListTile key={serialize(item)}><Item item={item} onClick={() => setItem(item)} showTooltip={true} /></GridListTile>) }
            </GridList>
            <Modal
              className={classes.modal}
              open={Boolean(mainItem)}
              onClose={() => setItem(null)}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={Boolean(mainItem)}>
                <div className={classes.paper}>
                  <ItemView item={mainItem} />
                </div>
              </Fade>
            </Modal>
          </div>
        );
      }}
    </Query>
  );
};

export default Display;
