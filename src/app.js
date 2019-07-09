import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createAppStore } from './store';
import AppRouter from './router';

class App extends Component {

  render() {
    return (
      <Provider store={createAppStore()}>
        <AppRouter />
      </Provider>
    );
  }

}

export default App;
