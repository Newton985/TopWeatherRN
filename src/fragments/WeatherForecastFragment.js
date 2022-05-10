import React, {  } from 'react';
import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    Image
} from 'react-native';

const sun = require('../../assets/sun.png')
const moon = require('../../assets/moon.png')
const rain = require('../../assets/rain.png')
const temp = require('../../assets/temperature.png')
const wind = require('../../assets/wind.png')

export const WeatherDetailsFragment = ({ route }) => {

    const { foreCast } = route.params

  //  console.log(foreCast)

    return (
        <ScrollView>

            <View style={styles.Card}>

                <View style={styles.HorizontalView}>
                    <Image style={styles.WeatherIcon}
                        source={{ uri: foreCast.dayIcon }} />
                    <Text style={styles.FavoriteText}>{foreCast.dayPhrase}</Text>
                </View>

                <View style={styles.Line} ></View>

                <View style={styles.HorizontalView}>
                    <View style={styles.VerticalView}>
                        <Image source={temp} style={styles.WeatherIcon} />
                        <Text style={styles.FavoriteText}>Heat</Text>
                    </View>

                    <View style={styles.VerticalView}>
                        <Text style={styles.Temperature}>{foreCast.minTemp + " \u00b0C"}</Text>
                        <Text style={styles.FavoriteText}>Minimum</Text>
                    </View>

                    <View style={styles.VerticalView}>
                        <Text style={styles.Temperature}>{foreCast.maxTemp + " \u00b0C"}</Text>
                        <Text style={styles.FavoriteText}>Maximum</Text>
                    </View>

                </View>

            </View>




            <Text style={styles.HeaderText}>During the Day</Text>

            <View style={styles.Card}>

                <View style={styles.HorizontalView}>
                    <View style={styles.VerticalView}>
                        <Image source={wind} style={styles.WeatherIcon} />
                        <Text style={styles.FavoriteText}>Wind</Text>
                    </View>

                    <View style={styles.VerticalView}>
                        <Text style={styles.Temperature}>{foreCast.dayWindSpeed}</Text>
                        <Text style={styles.FavoriteText}>Speed</Text>
                    </View>

                    <View style={styles.VerticalView}>
                        <Text style={styles.Temperature}>{foreCast.dayWindDirection}</Text>
                        <Text style={styles.FavoriteText}>Direction</Text>
                    </View>

                </View>

            </View>

            <View style={styles.Card}>

                <View style={styles.HorizontalView}>
                    <View style={styles.VerticalView}>
                        <Image source={rain} style={styles.WeatherIcon} />
                        <Text style={styles.FavoriteText}>Liquid</Text>
                    </View>

                    <View style={styles.VerticalView}>
                        <Text style={styles.Temperature}>{foreCast.dayRain}</Text>
                        <Text style={styles.FavoriteText}>Rain</Text>
                    </View>

                    <View style={styles.VerticalView}>
                        <Text style={styles.Temperature}>{foreCast.dayIce}</Text>
                        <Text style={styles.FavoriteText}>Ice</Text>
                    </View>

                </View>

            </View>


            <Text style={styles.HeaderText}>At Night</Text>

            <View style={styles.Card}>

                <View style={styles.HorizontalView}>
                    <View style={styles.VerticalView}>
                        <Image source={wind} style={styles.WeatherIcon} />
                        <Text style={styles.FavoriteText}>Wind</Text>
                    </View>

                    <View style={styles.VerticalView}>
                        <Text style={styles.Temperature}>{foreCast.nightWindSpeed}</Text>
                        <Text style={styles.FavoriteText}>Speed</Text>
                    </View>

                    <View style={styles.VerticalView}>
                        <Text style={styles.Temperature}>{foreCast.nightWindDirection}</Text>
                        <Text style={styles.FavoriteText}>Direction</Text>
                    </View>

                </View>

            </View>

            <View style={styles.Card}>

                <View style={styles.HorizontalView}>
                    <View style={styles.VerticalView}>
                        <Image source={rain} style={styles.WeatherIcon} />
                        <Text style={styles.FavoriteText}>Liquid</Text>
                    </View>

                    <View style={styles.VerticalView}>
                        <Text style={styles.Temperature}>{foreCast.nightRain}</Text>
                        <Text style={styles.FavoriteText}>Rain</Text>
                    </View>

                    <View style={styles.VerticalView}>
                        <Text style={styles.Temperature}>{foreCast.nightIce}</Text>
                        <Text style={styles.FavoriteText}>Ice</Text>
                    </View>

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

    VerticalView: {
        display: 'flex',
        flexDirection: 'column'
    },

    Temperature: {
        fontSize: 20,
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
        textAlign: 'center',
        color: '#D1D6F6'
    },

    FavIcon: {
        height: 27,
        width: 27,
        marginTop: -7
    },

    Line: {
        width: '100%',
        height: 0.2,
        backgroundColor: '#D1D6F6',
        marginVertical: 5
    },

    HeaderText: {
        fontWeight: 'bold',
        color: '#4C4AAD',
        marginHorizontal: 20,
        marginVertical: 10,
        fontSize: 20
    }


})