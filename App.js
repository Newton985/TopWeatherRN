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

const App = () => {

  const Stack = createNativeStackNavigator();

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
    </NavigationContainer>
  );
};


export default App;
