import BackgroundFetch from 'react-native-background-fetch';
import notifee from '@notifee/react-native';
import { WeatherRepository } from '../realm/repository/WeatherRepository';

export const StartBackGroundTasks = () => {

    const delay = 60 - new Date().getMinutes() // minutes remaining till next hour
          delay = delay * 60 * 1000 // in millisecs

    // Background fetch setup
  BackgroundFetch.configure(
        {
            minimumFetchInterval: 60, // hourly

        },
        async (taskId) => {
            console.log('Received background-fetch event: ', taskId);

            WeatherRepository.getAllTopCities((allTopCities) => {
                if (allTopCities) {

                    const topC = allTopCities[0]

                    notifee.createChannel({
                        id: 'default',
                        name: 'Default Channel',
                    }).then(channelId => {

                        // Display a notification
                        notifee.displayNotification({
                            title: "TopWeather Update",
                            body: 'Temperature for '+ topC.englishName + " is " + topC.metricTemp + "C",
                            android: {
                                channelId,
                            },
                        });

                    })


                }
            })

            // Call finish upon completion of the background task
            BackgroundFetch.finish(taskId);
        },
        (taskId) => {
            console.error('BackgroundFetch failed to start.');
        },
    ).then( status => {

        BackgroundFetch.scheduleTask({
            delay: delay,                // task to start after delay
            periodic: true,
            requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
            startOnBoot: true,
            stopOnTerminate: false,
            taskId: 'getUpdates'
        })
    

    })


}