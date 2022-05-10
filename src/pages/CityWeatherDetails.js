/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StatusBar, TouchableOpacity,
    Text, View,
    StyleSheet} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { WeatherRepository } from '../realm/repository/WeatherRepository';
import { GET_ICON_URL } from '../api/Endpoints'
import { FetchClient } from '../api/FetchClient';
import { WeatherDetailsFragment } from '../fragments/WeatherForecastFragment';
import { GET_CITY_FORECAST_URL } from '../api/Endpoints';

const Tab = createMaterialTopTabNavigator();

export const CityWeatherDetails = ({ route }) => {


    const { locationKey, locationName } = route.params

    const [foreCasts, setForeCasts] = useState([])

    const url = GET_CITY_FORECAST_URL(locationKey)

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const dayOfWeek = new Date().getDay()

    useEffect(() => {

        FetchClient.GET(url, (foreCastData) => {

            const savedForecasts = []

            const dailyForeCasts = foreCastData.DailyForecasts;

            WeatherRepository.cleanData(locationKey, () => {

                dailyForeCasts.forEach((foreCast, index) => {

                    const foreCastToSave = {
                        _id: locationKey + index,
                        date: foreCast.Date,
                        locationKey: locationKey,
                        epochDate: foreCast.EpochDate * 1000,
                        minTemp: foreCast.Temperature.Minimum.Value.toString(),
                        maxTemp: foreCast.Temperature.Maximum.Value.toString(),
                        dayPhrase: foreCast.Day.ShortPhrase,
                        dayIcon: GET_ICON_URL(foreCast.Day.Icon),
                        dayLongPhrase: foreCast.Day.LongPhrase,
                        dayWindSpeed: foreCast.Day.Wind.Speed.Value + " KM/h",
                        dayWindDirection: foreCast.Day.Wind.Direction.English,
                        nightPhrase: foreCast.Night.ShortPhrase,
                        nightIcon: GET_ICON_URL(foreCast.Night.Icon),
                        nightLongPhrase: foreCast.Night.LongPhrase,
                        nightWindSpeed: foreCast.Night.Wind.Speed.Value + " KM/h",
                        nightWindDirection: foreCast.Night.Wind.Direction.English,
                    }

                    WeatherRepository.saveDailyForeCast(foreCastToSave, (savedForeCast) => {
                        savedForecasts.push(savedForeCast)
    
                    })

                })

                WeatherRepository.getDailyForeCast(locationKey, (forecc) => {
                    setForeCasts(forecc)
                })

            })


        }, (error) => {

            WeatherRepository.getDailyForeCast(locationKey, (forecc) => {
                setForeCasts(forecc)
            })

        })

    }, [])


    const backgroundStyle = {
        backgroundColor: "#E0E0E1",
        paddingHorizontal: 5,
        height: '100%'
    };

    return (
        
        <SafeAreaView style={backgroundStyle}>
            <StatusBar backgroundColor='#E0E0E1' barStyle={'dark-content'} />
            <Text style={styles.AroundText}>@  {locationName}</Text>

            {
                foreCasts.length > 0 &&

                <Tab.Navigator
                   tabBar={ props => <TabBar {...props} />}
                >

                    {
                        foreCasts.map((foreCast, index) => { 
                            return <Tab.Screen name={daysOfWeek[index] || "NONE"+index} 
                            component={WeatherDetailsFragment} initialParams={{foreCast: foreCast}} />
                        })
                    }


                </Tab.Navigator>
            }

        </SafeAreaView>
    )

}

function TabBar({ state, descriptors, navigation }) {
    return (
      <View style={{ flexDirection: 'row',backgroundColor:"#FFFFFF", marginBottom: 10,
      height:50,borderRadius:10,justifyContent:"center",alignItems:"center" }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, alignItems:"center" }}
            >
              <Text style={{ color: isFocused ? '#FFFFFF' : '#4C4AAD', paddingVertical: 5,  paddingHorizontal: 4, fontSize: 12,
              fontWeight: 'bold', borderRadius: 5, backgroundColor : isFocused ? '#4C4AAD' : '#FFFFFF'}}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

const styles = StyleSheet.create({
    AroundText: {
        margin: 20,
        color: '#4C4AAD',
        fontSize: 25,
        fontWeight: 'bold'
    },

    SearchTextInput: {
        borderWidth: 1,
        padding: 12,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
        borderColor: '#888888',
        fontSize: 18,
        height: 50,
        marginHorizontal: 20,
        marginBottom: 10
    }

})