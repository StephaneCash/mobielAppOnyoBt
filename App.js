import React from 'react';
import { View } from 'react-native';
import Routes from './routes';
import { Provider } from 'react-redux';
import ContextAppGlobal from './context/AuthContext';

import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import postSlice, { getAllPosts } from './reducers/Posts.reducer';
import usersSlice from './reducers/User.reducer';
import compteslice from './reducers/Compte.reducer';
import userSlice from './reducers/UserOne.reducer';
import TransactionsSlice, { getAllTransactions } from './reducers/Transactions.reducer';

const store = configureStore({
  reducer: combineReducers({
    posts: postSlice.reducer,
    users: usersSlice.reducer,
    comptes: compteslice.reducer,
    user:  userSlice.reducer,
    transactions: TransactionsSlice.reducer
  })
});

store.dispatch(getAllTransactions());

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