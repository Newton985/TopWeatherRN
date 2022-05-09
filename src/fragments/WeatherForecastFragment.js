 import React, { useEffect, useState } from 'react';
 import {
   FlatList,
   SafeAreaView,
   StatusBar,
   useColorScheme,
   Text,
   StyleSheet,
   TextInput,
   View,
   ScrollView,
   Image
 } from 'react-native';

 export const WeatherDetailsFragment = ({ route }) => {

    const { foreCast }= route.params

    console.log(foreCast)
  
    return(
        <ScrollView>

            <View style={styles.Card}>
                <Text>Day Forecast</Text>
                <View style={styles.HorizontalView}>
                   <Image style= {styles.WeatherIcon}
                      source={{ uri: foreCast.dayIcon }} />
                   <Text style={styles.FavoriteText}>{foreCast.dayPhrase}</Text>  
                </View>
            </View>

        </ScrollView>
    )
 }



 const styles = StyleSheet.create({
    Card: {
        backgroundColor: '#4C4AAD',
        margin: 10,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        padding: 15

    },


    CityName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#D1D6F6',
        width: '85%',
       
    },

    HorizontalView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5
    },

    Temperature: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#F8A01A',
        alignSelf: 'center'
    },

    WeatherText: {
        fontWeight: 'bold',
        color: '#D1D6F6'
    },

    WeatherIcon: {
        height: 30,
        width: 30,
        marginEnd: 20
    },

    DateText: {
        color: 'red'
    },

    FavoriteText: {
        marginEnd: 20,
        color: '#D1D6F6'
    },

    FavIcon: {
        height: 27,
        width: 27,
        marginTop: -7
    }


})