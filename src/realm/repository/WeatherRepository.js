import Realm from "realm"
import { Schema } from '../schema/Schema';

export const WeatherRepository = {

    saveTopCity: (topCity, onComplete) => {
        Realm.open({ schema: Schema })
            .then(realm => {
                realm.write(() => {

                    //check if exists, update
                    const existing = realm.objects("TopCity").filtered("_id = '" + topCity._id + "'")

                    if (existing.length > 0) {
                        const savedTopCity = existing[0];

                        savedTopCity.weatherText = topCity.weatherText
                        savedTopCity.metricTemp= topCity.metricTemp
                        savedTopCity.weatherIcon= topCity.weatherIcon
                        savedTopCity.isFavorite= topCity.isFavorite
                        savedTopCity.obsTime = topCity.obsTime

                        onComplete(savedTopCity)

                    } else {
                        const savedTopCity = realm.create("TopCity", topCity);
                        onComplete(savedTopCity)
                    }


                })
            }).catch(err => {
                console.log(err)
                onComplete(undefined)
            })
    },


    getTopCity: (locationKey, onComplete) => {
        Realm.open({ schema: Schema })
            .then(realm => {
                const topCities = realm.objects("TopCity")
                    .filtered("key = '" + locationKey + "'");
                onComplete(topCities)
            }).catch(err => {
                onComplete(undefined)
            })
    },


    getAllTopCities: (onComplete) => {
        Realm.open({ schema: Schema })
            .then(realm => {
                const topCities = realm.objects("TopCity")
                onComplete(topCities)
            }).catch(err => {
                onComplete(undefined)
            })
    },



    saveDailyForeCast: (foreCast, onComplete) => {
        Realm.open({ schema: Schema })
            .then(realm => {
                realm.write(() => {
                    const savedTopCity = realm.create("DailyForeCast", foreCast);
                    onComplete(savedTopCity)
                })
            }).catch(err => {
                console.log(err)
                onComplete(undefined)
            })
    },


    getDailyForeCast: (locationKey, onComplete) => {
        Realm.open({ schema: Schema })
            .then(realm => {
                const topCities = realm.objects("DailyForeCast")
                    .filtered("key = '" + locationKey + "'");
                onComplete(topCities)
            }).catch(err => {
                onComplete(undefined)
            })

    },

    // delete all Data Older Than Today
    cleanData: (onComplete) => {
        Realm.open({ schema: Schema })
            .then(realm => {
                const date = new Date();

                const todayMillis = date.getHours() * 60 * 60 * 1000
                let currentTime = +new Date() - todayMillis;
                currentTime = currentTime.toString()

                // const topCities = realm.objects("TopCity").filtered("dateCreated < '" + currentTime + "'")
                // realm.write(() => {
                //     realm.delete(topCities)
                // })

                const dailyForecasts = realm.objects("DailyForeCast").filtered("epochDate < '" + currentTime + "'")

                realm.write(() => {
                    realm.delete(dailyForecasts)

                    onComplete()
                })


            }).catch(err => {
                // onComplete()
                console.log(err)
            })
    }

}