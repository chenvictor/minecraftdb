import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache({
    dataIdFromObject: (obj) => {
      if (obj.id)
        return `${obj.id}:${obj.sub_id ? obj.sub_id : ''}`;
      return null;
    }
  })
});

ReactDOM.render(<App client={client}/>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// Testing

//client.query({
//  query: gql`
//    {
//      item(id: 0) {
//        id
//        name
//      }
//    }
//  `
//}).then(res => {
//  console.log(res);
//});
