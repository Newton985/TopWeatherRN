import React, { useState } from "react"
import { StyleSheet, View, Text, Image, Pressable } from "react-native"
import { WeatherRepository } from '../realm/repository/WeatherRepository';
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";

const favoritedIcon = require('../../assets/favorite.png')
const addToFavs = require('../../assets/heart.png')

export const TopCityItem = ({ topCity }) => {

    const topCityItem = topCity.item 
    const [icon, setIcon] = useState(topCityItem.isFavorite ? addToFavs : favoritedIcon)
    const navigation = useNavigation()

    const addToFavorite = () => { 

        const newTopC = {
            _id: topCityItem._id,
            key: topCityItem.key,
            englishName : topCityItem.englishName,
            weatherText : topCityItem.weatherText,
            country: topCityItem.country,
            metricTemp: topCityItem.metricTemp,
            weatherIcon: topCityItem.weatherIcon,
            dateCreated: topCityItem.dateCreated,
            obsTime: topCityItem.obsTime
        }

        if (topCityItem.isFavorite == 0) {
            newTopC.isFavorite = 1
        } else {
            newTopC.isFavorite = 0
        }


        WeatherRepository.saveTopCity(newTopC, (savedTopCity) => {
            if (savedTopCity) {
                setIcon(savedTopCity.isFavorite ? addToFavs : favoritedIcon)
                showMessage({ message: savedTopCity.isFavorite ? "Added to favorites" : "Removed from favorites",
                 type: 'info' })
            } else {
                showMessage({ message: "Failed to favorites", type: 'danger' })
            }
        })
    }

    const openCityWeatherDetails = () => {
        navigation.navigate("Details", { locationKey : topCityItem.key, locationName: topCityItem.englishName + ", " + topCityItem.country })
    }


    return (
        <Pressable style={styles.Card}
          onPress={(event) => openCityWeatherDetails()}
        >

            <View style={styles.HorizontalView}>
                <Text style={styles.CityName}>{topCityItem.englishName + ", " + topCityItem.country}</Text>

                <Pressable onPress={(event) => addToFavorite()}>
                    <Image
                        style={styles.FavIcon}
                        source={icon}
                    />
                </Pressable>
            </View>
            <View style={styles.HorizontalView}>
                <Text style={styles.Temperature}>{topCityItem.metricTemp + " \u00b0C"}</Text>

                <Image style={styles.WeatherIcon}
                    source={{ uri: topCityItem.weatherIcon }}
                />


            </View>
            <View style={styles.HorizontalView}>

                <Text style={styles.FavoriteText}>{topCityItem.obsTime}</Text>

                <Text style={styles.WeatherText}>{topCityItem.weatherText}</Text>


            </View>
        </Pressable>
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
        height: 50,
        width: 50,
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