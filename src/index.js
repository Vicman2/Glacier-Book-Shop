import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloClient} from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {setContext} from 'apollo-link-context'
import {createHttpLink} from 'apollo-link-http'
import {ApolloProvider} from 'react-apollo'
import {BrowserRouter} from 'react-router-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './Store/reducer'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { getInLocalStorage } from './Util/localStorage';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URI,
  credentials: 'include'
})

const authLink = setContext((_, { headers }) => {
  const token = getInLocalStorage("token")
  return {
    headers: {
      ...headers,
      authorization: token
    }
  }
});

const cache = new InMemoryCache();


const client = new ApolloClient({
  dataIdFromObject: o => o.id,
  cache, 
  link: authLink.concat(httpLink)
})

const store = createStore(reducer);

const app = <React.StrictMode>
              <BrowserRouter>
                <ApolloProvider client={client}>
                  <Provider store={store}>
                      <App />
                  </Provider>
                </ApolloProvider>
              </BrowserRouter>
            </React.StrictMode>

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
