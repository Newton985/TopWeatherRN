/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TopCities } from './src/pages/TopCities';
import { CityWeatherDetails } from './src/pages/CityWeatherDetails';
import { useEffect } from 'react';
import { StartBackGroundTasks } from './src/tasks/NotificationTask';
import FlashMessage from 'react-native-flash-message';

const App = () => {

  const Stack = createNativeStackNavigator();

  useEffect(()=> {
     StartBackGroundTasks()
  })

  return (
    <NavigationContainer theme={DefaultTheme}>

      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name='Home'
          component={TopCities}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name='Details'
          component={CityWeatherDetails}
          options={{
            headerShown: false
          }}
        />

      </Stack.Navigator>


     <FlashMessage  />

    </NavigationContainer>
  );
};


export default App;
