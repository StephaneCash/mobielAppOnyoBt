import React from 'react';
import { View } from 'react-native';
import Routes from './routes';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducer } from "./reducers/reducer"
import ContextAppGlobal from './context/AuthContext';

const store = createStore(reducer);

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