import React from 'react';
import { Provider,connect } from 'react-redux';
import {addNavigationHelpers} from 'react-navigation';
import {createReduxBoundAddListener} from 'react-navigation-redux-helpers';
import configureStore from './store/configure-store';

import Router from './router';

// 创建store
const initialState = Router.router.getStateForAction(Router.router.getActionForPathAndParams('Splash'));
const navReducer = (state = initialState,action) => {
    const newState = Router.router.getStateForAction(action, state);
    return newState || state;
}
const store = configureStore({},navReducer);

//包装Router
const addListener = createReduxBoundAddListener("root");
class App extends React.Component {
  render() {
    return (
      <Router navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
        addListener,
      })} />
    );
  }
}
const mapStateToProps = (state) => ({
  nav: state.nav
});
const AppWithNavigationState = connect(mapStateToProps)(App);


const Root = () => (
  <Provider store={store}>
    <AppWithNavigationState />
  </Provider>
);

export default Root;
