import { StackNavigator } from 'react-navigation';
import { Login, Search } from '../components';

export const AppScreens = StackNavigator({
  Login: {
    screen: Login
  },
  Search: {
    screen: Search
  }
});