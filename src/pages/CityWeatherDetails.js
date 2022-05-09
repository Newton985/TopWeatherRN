/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    useColorScheme,
    Text,
    StyleSheet,
    TextInput
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { WeatherRepository } from '../realm/repository/WeatherRepository';
import { TopCityItem } from '../components/TopCityItem';
import { GET_TOP_CITIES, GET_ICON_URL } from '../api/Endpoints'
import { NavigationContainer } from '@react-navigation/native';
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

            WeatherRepository.cleanData(() => {

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

                setForeCasts(savedForecasts)


            })


        }, (error) => {


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

                <Tab.Navigator>

                    {
                        foreCasts.map((foreCast, index) => { 
                            return <Tab.Screen name={daysOfWeek[index]} 
                            component={WeatherDetailsFragment} initialParams={{foreCast: foreCast}} />
                        })
                    }


                </Tab.Navigator>
            }

        </SafeAreaView>
    )

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