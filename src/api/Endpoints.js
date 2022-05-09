const API_KEY = "2RL4VQ3eKUgTiHZPKFYaB46A3Kk9R3Hk"

export const BASE_URL = "http://dataservice.accuweather.com/"

export const GET_TOP_CITIES = BASE_URL + "currentconditions/v1/topcities/50/?apikey="+API_KEY

export const GET_CITY_FORECAST_URL = (key) => {
  return  BASE_URL + "forecasts/v1/daily/5day/"+key+"?details=true&metric=true&apikey="+API_KEY
}

export const GET_ICON_URL = (iconNumber) => {
    if(iconNumber < 10){ iconNumber = "0"+iconNumber}
    return "https://developer.accuweather.com/sites/default/files/"+iconNumber+"-s.png"
}