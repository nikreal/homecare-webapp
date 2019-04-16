import { StackNavigator } from 'react-navigation';
import Settings from './components/Settings';
import Website from './components/Website';

const AppNavigator = StackNavigator(
  {
    Settings: {screen: Settings},
    Website: {screen: Website}
  },
  {
    navigationOptions: {
      header: null
    }
  }
);

export default AppNavigator;