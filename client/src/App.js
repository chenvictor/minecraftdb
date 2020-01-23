import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/react-hooks';

const App = (props) => (
  <ApolloProvider client={props.client}>
    <div>
      <h2>My first Apollo app</h2>
    </div>
  </ApolloProvider>
);

export default App;
