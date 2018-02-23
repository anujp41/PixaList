import { StackNavigator } from 'react-navigation';
import { Login, Search, Images } from '../components';

export const AppScreens = StackNavigator({
  // Login: {
  //   screen: Login
  // },
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Search Page',
    }
  },
  Images: {
    screen: Images
  }
});