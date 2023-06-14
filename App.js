import React from 'react';
import { View } from 'react-native';
import Routes from './routes';
import { Provider } from 'react-redux';
import ContextAppGlobal from './context/AuthContext';

import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import postSlice, { getAllPosts } from './reducers/Posts.reducer';
import usersSlice, { getAllUsers } from './reducers/User.reducer';
import compteslice, { getCompteByUserId } from './reducers/Compte.reducer';

const store = configureStore({
  reducer: combineReducers({
    posts: postSlice.reducer,
    users: usersSlice.reducer,
    comptes: compteslice.reducer
  })
});

store.dispatch(getAllPosts());
store.dispatch(getAllUsers());

const App = () => {
  return (
    <Provider store={store}>
      <ContextAppGlobal>
        <View style={{ flex: 1 }}>
          <Routes />
        </View>
      </ContextAppGlobal>
    </Provider>
  )
}

export default App