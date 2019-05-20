import React, {Component} from 'react';
import Settings from './components/Settings';
import Website from './components/Website';
import { createAppContainer, createStackNavigator } from 'react-navigation';

const AppStackNavigator = createAppContainer(createStackNavigator(
  {
    Settings: {screen: Settings},
    Website: {screen: Website}
  },{
    defaultNavigationOptions: {
      header: null
    },
  }
));

export default class AppNavigator extends React.Component {
  render() {
    return <AppStackNavigator />;
  }
}