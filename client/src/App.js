import React, { Component } from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/react-hooks';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Search from './components/Search';
import Display from './components/Display';

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
          <Box py='2rem'>
            <Search updateDelay={100} onChange={this.updateSearch} />
          </Box>
          <Display query={this.state.query}/>
        </Container>
      </ApolloProvider>
    );
  }
};

export default App;
