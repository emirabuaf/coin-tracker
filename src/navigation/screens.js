import React from 'react';
import {createAppContainer,createBottomTabNavigator,createStackNavigator} from 'react-navigation';
import { Icon } from 'react-native-elements';

import CoinScreen from '../screens/CoinScreen';
import NewsScreen from '../screens/NewsScreen';

const MainNavigator =createAppContainer(createBottomTabNavigator(
  {
    watchList:{screen:CoinScreen,
    navigationOptions: () => ({
      tabBarIcon:({tintColor}) => (
        <Icon name="star"
          color={tintColor}
          size={24}
          />
      )
    })},
    news:{screen:NewsScreen,
    navigationOptions:() => ({
      tabBarIcon:({tintColor}) => (
        <Icon
          name="book"
          color={tintColor}
          size={24}
          />
      )
    })}
  },
    {
    tabBarOptions: {
      activeTintColor: 'blue',
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: '#08457e',
      },
      labelStyle: {
        fontSize: 13,
      },
    },
  }
  )
)

export default MainNavigator;
