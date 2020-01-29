import React from 'react';
import ItemBox from './ItemBox';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  grid: {
    borderSpacing: '0px',
    '& tr': {
      padding: '0px',
      '& td': {
        padding: '0px'
      }
    }
  },
  outer: {
    backgroundColor: 'rgb(198,198,198)',
    padding: '4px',
    width: 'fit-content'
  },
  inline: {
    display: 'inline-block',
    verticalAlign: 'middle'
  }
});

const CraftingGrid = (props) => {
  const classes = useStyles(props);
  const { recipe, target, produces } = props;
  return (
    <div className={classes.outer}>
      <table className={[classes.inline, classes.grid].join(' ')}>
        <tbody>
          {
            recipe.map((row, rowIndex) => {
              return (
                <tr key={rowIndex}>
                  { row.map((cell, cellIndex) => {
                    return (<td key={cellIndex}><ItemBox item={cell} /></td>);
                  }) }
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <i className={[classes.inline, 'material-icons'].join(' ')}> arrow_right_alt </i>
      <div className={classes.inline}> 
        <ItemBox padding={5} item={target} count={produces} />
      </div>
    </div>
  );
};

export default CraftingGrid;
