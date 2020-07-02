import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { Home } from './screens';


const RootNavigator = createSwitchNavigator(
    {
        Home: Home
    },
    {
        initialRouteName: 'Home'
    }
);

export default createAppContainer(RootNavigator);