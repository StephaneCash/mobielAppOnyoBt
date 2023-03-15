import React from 'react';
import { View } from 'react-native';
import Routes from './routes';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducer } from "./reducers/reducer"

const store = createStore(reducer);

const App = () => {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <Routes />
      </View>
    </Provider>
  )
}

export default App