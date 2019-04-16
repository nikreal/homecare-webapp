import { StackNavigator } from 'react-navigation';
import Settings from './components/Settings';
import Website from './components/Website';

const AppNavigator = StackNavigator({
  Settings: {screen: Settings},
  Website: {screen: Website}
});

export default AppNavigator;