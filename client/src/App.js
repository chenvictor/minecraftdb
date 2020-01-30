import React, { Component } from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/react-hooks';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Search from './components/Search';
import Display from './components/Display';
import CraftingGrid from './components/CraftingGrid';
// testing VVV
import { Query } from '@apollo/react-components';
import { gql } from 'apollo-boost';

const test_query = gql`{
  item(id: 5) {
    id
    sub_id
    name
    image_url
    crafts_from {
      recipe {
        id
        sub_id
        name
        image_url
      }
      produces
    }
  }
}`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
  }
  updateSearch = (query) => {
    this.setState({
      query
    });
  }
  render() {
    return (
      <ApolloProvider client={this.props.client}>
        <CssBaseline />
        <Container maxWidth='lg'>
          <Search updateDelay={100} onChange={this.updateSearch} />
          <Display query={this.state.query}/>
          <Query
            query={test_query}
          >
            {({ loading, error, data }) => {
              if (loading) {
                return 'Loading...';
              }
              if (error) {
                throw error;
              }
              return (
                <ul>
                  {
                    data.item.crafts_from.map((crafting, index) => {
                      return <CraftingGrid key={index} recipe={crafting.recipe} target={data.item} produces={crafting.produces} />
                    })
                  }
                </ul>
              );
            }}
          </Query>
        </Container>
      </ApolloProvider>
    );
  }
};

export default App;
