import React from 'react';
import {createAppContainer,createBottomTabNavigator,createStackNavigator} from 'react-navigation';

import CoinScreen from '../screens/CoinScreen';
import NewsScreen from '../screens/NewsScreen';

const MainNavigator =createAppContainer(createBottomTabNavigator(
  {
    watchList:{screen:CoinScreen},
    news:{screen:NewsScreen}
    }
  )
)

export default MainNavigator;
