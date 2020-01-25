import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class Search extends Component {
  
  onChange = (event) => {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    this._timeout = setTimeout(
      this.props.onChange.bind(null, event.target.value),
      this.props.updateDelay
    );
  }

  render() {
    return (
      <form>
        <TextField
          id='search'
          label='Search'
          type='string'
          size='medium'
          fullWidth={true}
          onChange={this.onChange}
        />
      </form>
    );
  }
};

export default Search;
