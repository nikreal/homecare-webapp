/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import SplashScreen from './components/SplashScreen';
import AppNavigator from './AppNavigator';
import {Provider} from 'react-redux';
import store from './reducer';

type Props = {};
class App extends Component<Props> {

  // We set the isLoading state to true, that will indicate that we are loading essential data. Once we have done, we’ll turn the flag to false.
  constructor(props) {
    super(props);  
    this.state = { isLoading: true }
  }

  // For time-consuming task of SplashScreen
  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        3000
      )
    );
  }

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();
  
    if (data !== null) {
      this.setState({ isLoading: false });
    }
  }

  render() {
    // When data is still loading, we are going to render the SplashScreen component instead of the application body.
    if (this.state.isLoading) {
      return <SplashScreen />
    }

    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

export default App;