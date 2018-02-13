import { StackNavigator } from 'react-navigation';
import { Login } from '../components';

export const AppScreens = StackNavigator({
  Login: {
    screen: Login
  }
});