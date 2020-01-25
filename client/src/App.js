import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/react-hooks';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Search from './components/Search';
import Display from './components/Display';

const test = (value) => {
  console.log(`Text is: ${value}`);
};

const App = (props) => {
  return (
    <ApolloProvider client={props.client}>
      <CssBaseline />
      <Container maxWidth='lg'>
        <Search updateDelay={100} onChange={test} />
        <Display />
      </Container>
    </ApolloProvider>
  )
};

export default App;
