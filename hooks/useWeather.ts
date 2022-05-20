import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setDailyWeatherData, setWeather } from '../redux/slices/weatherSlice'
import axios from 'axios'

export default function useWeather() {
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const dispatch = useDispatch()

  const mergeFuncDaily = (data: any) => {
    let arr = []
    for (let i = 0; i < 6; i++) {
      arr.push({
        temperatureMax: data.daily?.temperature_2m_max[i],
        temperatureMin: data.daily?.temperature_2m_min[i],
        windspeed: data.daily?.windspeed_10m_max[i],
        time: data.daily?.time[i].substring(8),
      })
    }
    dispatch(setDailyWeatherData(arr))
  }

  const getDailyWeatherData = async (coordinates: any) => {
    setIsFetching(true)
    try {
      const data = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,cloudcover,windspeed_10m,winddirection_10m&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,windspeed_10m_max&windspeed_unit=ms&timezone=Europe%2FMoscow`
      )
      mergeFuncDaily(data.data)
      dispatch(setWeather(data.data))
      setIsFetching(false)
    } catch (err: any) {
      console.log(err)
    }
  }

  return {
    getDailyWeatherData,
    isFetching,
  }
}
