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
  TextInput,
  
} from 'react-native';

import { WeatherRepository } from '../realm/repository/WeatherRepository';
import { TopCityItem } from '../components/TopCityItem';
import { GET_TOP_CITIES, GET_ICON_URL } from '../api/Endpoints'
import { NavigationContainer } from '@react-navigation/native';
import { FetchClient } from '../api/FetchClient';


export const TopCities = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [topCities, setTopCities] = useState([])
  const [topCitiesBkp, setTopCitiesBkp] = useState([])

  const applySearch = (searchText) => {

    if (searchText.length > 1) {

      const filteredCities = topCities.filter((topC) => {
        const str = topC.englishName + topC.country
        return str.includes(searchText)
      })

      setTopCities(filteredCities)

    } else {
      setTopCities(topCitiesBkp)
    }

  }


  useEffect(() => {


    FetchClient.GET(GET_TOP_CITIES, (topCitiesData) => {

      WeatherRepository.getAllTopCities(localTopCities => {

        const savedTopCities = []

        if (localTopCities && localTopCities.length) {

          topCitiesData.forEach(topCity => {

            const localTopCity = localTopCities.find(localTopC => localTopC.key === topCity.Key)

            localTopCity.weatherText = topCity.WeatherText
            localTopCity.metricTemp = topCity.Temperature.Metric.Value
            localTopCity.weatherIcon = GET_ICON_URL(topCity.WeatherIcon)
            localTopCity.obsTime = topCity.LocalObservationDateTime

            WeatherRepository.saveTopCity(localTopCity, (savedTopCity) => {
              savedTopCities.push(savedTopCity)
            })

          })

        } else {

          topCitiesData.forEach(topCity => {

            const topCityToSave = {
              _id: topCity.Key,
              key: topCity.Key,
              englishName: topCity.EnglishName,
              weatherText: topCity.WeatherText,
              country: topCity.Country.EnglishName,
              metricTemp: topCity.Temperature.Metric.Value,
              weatherIcon: GET_ICON_URL(topCity.WeatherIcon),
              dateCreated: +new Date(),
              isFavorite: 0,
              obsTime: topCity.LocalObservationDateTime
            }

            WeatherRepository.saveTopCity(topCityToSave, (savedTopCity) => {
              savedTopCities.push(savedTopCity)
            })

          })

        }


        WeatherRepository.getAllTopCities((allTopC) => {

         // allTopC.sort((a,b) => {return a.isFavorite - b.isFavorite} )

          setTopCities(allTopC)
          setTopCitiesBkp(allTopC)
        })

      })

    }, (error) => {

      WeatherRepository.getAllTopCities((allTopC) => {

       // allTopC.sort((a,b) => {return a.isFavorite - b.isFavorite} )

        setTopCities(allTopC)
        setTopCitiesBkp(allTopC)
      })

    })

  }, [])

  const backgroundStyle = {
    backgroundColor: isDarkMode ? "#E0E0E1" : "#E0E0E1",
    paddingHorizontal: 5,
    height: '100%'
  };


  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar backgroundColor='#E0E0E1' barStyle={'dark-content'} />

      <Text style={styles.AroundText}>@  Around the world</Text>

      <TextInput
        style={styles.SearchTextInput}
        placeholder='Search city'
        placeholderTextColor='#4C4AAD'
        onChangeText={(text) => applySearch(text)}
      />

      <FlatList
        data={topCities}
        renderItem={(item) => <TopCityItem topCity={item} />}
        keyExtractor={(item) => item.key}
      />

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
