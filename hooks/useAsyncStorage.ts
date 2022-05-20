import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCoordinates } from '../redux/slices/weatherSlice'
import useWeather from './useWeather'

export default function useAsyncStorage() {
  const [isFetchingCoords, setIsFetchingCoords] = useState<boolean>(true)
  const { getDailyWeatherData } = useWeather()
  const dispatch = useDispatch()

  const storeData = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('coords', jsonValue)
      dispatch(setCoordinates(value))
      getDailyWeatherData(value)
    } catch (e) {
      console.log(e)
    }
  }
  const getStoredData = async () => {
    setIsFetchingCoords(true)
    try {
      const value = await AsyncStorage.getItem('coords')
      if (value !== null) {
        dispatch(setCoordinates(JSON.parse(value)))
        setIsFetchingCoords(false)
      } else {
        const coordinates = {
          identifier: 'moscow',
          latitude: '55.7504461',
          longitude: '37.6174943',
        }
        dispatch(setCoordinates(coordinates))
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getStoredData()
  }, [])

  return { storeData, isFetchingCoords }
}
